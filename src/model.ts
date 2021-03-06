import * as E from './enums';
import * as T from './types';

const emptyLastMove = { row: -1, col: -1 };

export default class Model {
    private STATE: T.GameStateGrid;
    private META: T.IGameStateMeta = {
        lastMove: emptyLastMove,
        score: {
            [E.Turn.Player1]: 0,
            [E.Turn.Player2]: 0,
        },
        size: 3,
        status: E.Status.InProgress,
        turn: E.Turn.Player1,
    };

    constructor(config: T.IModelConfig) {
        this.META.size = config.size;
        this.STATE = this.getEmptyBoard();
    }

    public get state(): T.GameStateGrid {
        const clone: T.GameStateGrid = [];

        for (let i = 0; i < this.META.size; ++i) {
            clone.push([...this.STATE[i]]);
        }

        return clone;
    }

    public get meta(): T.IGameStateMeta {
        return {
            ...this.META,
            score: { ...this.META.score },
        };
    }

    public resetLastMove(): void {
        this.META.lastMove = { ...emptyLastMove };
    }

    public get status(): E.Status {
        return this.META.status;
    }

    public setStatus(status: E.Status): void {
        this.META.status = status;
    }

    public get turn(): E.Turn {
        return this.META.turn;
    }

    public toggleTurn(turn: E.Turn): void {
        const newTurn = turn === E.Turn.Player1
            ? E.Turn.Player2
            : E.Turn.Player1;
        this.META.turn = newTurn;
    }

    public get size(): number {
        return this.META.size;
    }

    public getSquare({ row, col }: T.IPoint): E.Square {
        return this.STATE[row][col];
    }

    public setSquare(point: T.IPoint, square: E.Square): void {
        this.STATE[point.row][point.col] = square;
        this.META.lastMove = point;
    }

    public getScoreForPlayer(turn: E.Turn): number {
        return this.META.score[turn];
    }

    public resetScoreForPlayer(turn: E.Turn): void {
        this.setScoreForPlayer(turn, 0);
    }

    public incrementScoreForPlayer(turn: E.Turn): void {
        const currentScore: number = this.getScoreForPlayer(turn);
        this.setScoreForPlayer(turn, currentScore + 1);
    }

    public resetBoard(): void {
        this.STATE = this.getEmptyBoard();
    }

    private setScoreForPlayer(turn: E.Turn, newScore: number): void {
        this.META.score[turn] = newScore;
    }

    private getEmptyBoard(): T.GameStateGrid {
        const grid: T.GameStateGrid = [];

        for (let i = 0; i < this.META.size; ++i) {
            const row: T.GameStateRow = [];

            for (let j = 0; j < this.META.size; ++j) {
                row.push(E.Square.Empty);
            }

            grid.push(row);
        }

        return grid;
    }
}
