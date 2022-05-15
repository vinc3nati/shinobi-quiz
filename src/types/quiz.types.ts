export type QuizModelType = {
    quizName: string
    quizId: string
    image: string
    quizCategory: string
    questions: QuestionType[]
    points: number
}

export type QuestionType = {
    question: string
    point?: number
    options: OptionType[]
}

export type OptionType = {
    value: string
    isRight: boolean
}
