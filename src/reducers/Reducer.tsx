import { ActionType, DataStateType } from "../types";

export const Reducer = (
  state: DataStateType,
  action: ActionType
): DataStateType => {
  switch (action.type) {
    case "ADD_QUESTION":
      return {
        ...state,
        answers: state.answers.some(
          (item) => item.questionIndex === action.payload.questionIndex
        )
          ? state.answers.map((item) =>
              item.questionIndex === action.payload.questionIndex
                ? action.payload
                : item
            )
          : [...state.answers, { ...action.payload }],
      };

    case "RECOVER_ANSWER":
      return { ...state, answers: [...action.payload.sessionData] };

    case "RESET":
      return { ...state, answers: [] };

    default:
      return state;
  }
};
