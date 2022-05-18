import { ScoreType } from "../types";

export const getTotalScore = (arr: ScoreType[]) =>
arr.reduce((acc, curr) => curr.score + acc, 0);