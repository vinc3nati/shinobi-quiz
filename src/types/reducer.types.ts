import { QuestionDataType } from "./index"

export type ActionType = {
    type: 'ADD_QUESTION'
    payload: QuestionDataType
} | {
    type: 'RECOVER_ANSWER'
    payload: {sessionData: QuestionDataType[]}
} | {type: 'RESET'}