import React from "react"
import { ActionType } from "./reducer.types"

export type Dispatch = (action: ActionType) => void

export type DataStateType = {
    answers: QuestionDataType[]
}

export type QuestionDataType = {
    questionIndex: number
    selectedOption: number
} 


export type DataProviderProp = {
    children: React.ReactNode
}

export type DataContextType = {
    state: DataStateType
    dispatch: Dispatch
}