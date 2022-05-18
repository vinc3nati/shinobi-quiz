import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { useData } from "../../contexts";
import { useDocumentTitle } from "../../hooks";
import { QuizModel } from "../../Model/quiz.model";
import { Dispatch, TitleType } from "../../types";
import { QuestionType } from "../../types/quiz.types";
import { QUIZ_ANSWERS, QUIZ_TIMER } from "../../utils/constants";

export const Questions = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const { questionIdx, quizId } = useParams();
  const {
    state: { answers },
    dispatch,
  } = useData();
  const [answerBtn, setAnswerBtn] = useState<number>(-1);
  const [questionTimer, setQuestionTimer] = useState<number>(
    Number(JSON.parse(sessionStorage.getItem(QUIZ_TIMER) || "60"))
  );
  const navigate = useNavigate();
  const quizData = QuizModel.find((item) => item.quizId === quizId);
  const questions = quizData?.questions;
  let activeQuestion: QuestionType = { question: "", options: [] };
  if (questions) {
    activeQuestion = questions[Number(questionIdx) - 1] ?? {};
  }

  const dispatchHelper = (
    answerBtn: number,
    dispatch: Dispatch,
    questionIdx: number,
    questions: QuestionType[] | undefined
  ) => {
    dispatch({
      type: "ADD_QUESTION",
      payload: { questionIndex: questionIdx, selectedOption: answerBtn },
    });
    sessionStorage.setItem(
      QUIZ_ANSWERS,
      JSON.stringify([
        ...JSON.parse(sessionStorage.getItem(QUIZ_ANSWERS) || "[]"),
        { questionIndex: questionIdx, selectedOption: answerBtn },
      ])
    );
    // last question reached
    if (questionIdx === questions?.length) {
      navigate(`/${quizId}/result`, { replace: true });
    }
    // next question
    else {
      navigate(`/${quizId}/${Number(questionIdx) + 1}`, { replace: true });
    }

    setAnswerBtn(-1);
    setQuestionTimer(60);
    sessionStorage.removeItem(QUIZ_TIMER);
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (questionTimer > 1) {
        setQuestionTimer((prev) => prev - 1);
        sessionStorage.setItem(QUIZ_TIMER, JSON.stringify(questionTimer - 1));
      } else {
        dispatchHelper(answerBtn, dispatch, Number(questionIdx), questions);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [questionTimer]);

  useEffect(() => {
    if (answers.length === 0 && Number(questionIdx) !== 1) {
      const recoveredAnswers = JSON.parse(
        sessionStorage.getItem(QUIZ_ANSWERS) || "[]"
      );
      if (recoveredAnswers.length === 0) {
        navigate(`/${quizId}/rules`, { replace: true });
        return;
      }
      dispatch({
        type: "RECOVER_ANSWER",
        payload: { sessionData: recoveredAnswers },
      });
    }
  }, []);

  return (
    <section id="question">
      <div className="question-container">
        <header className="question-heading">{quizData?.quizName}</header>
        <div className="question-sub-heading">
          <p>
            Question: {questionIdx} / {questions?.length}
          </p>
          <p
            className={`timer ${
              questionTimer < 10 ? "text-error" : "text-success"
            }`}
          >
            <BiTimeFive />
            <span>{questionTimer} sec</span>
          </p>
        </div>
        <p className="question-qt">{activeQuestion.question}</p>
        <div className="question-answers">
          {activeQuestion.options.map((item, index) => (
            <button
              className={`question-answer-btn ${
                answerBtn === index ? "active" : ""
              }`}
              key={item.value}
              onClick={() => setAnswerBtn(index)}
            >
              {item.value}
            </button>
          ))}
        </div>
        <div className="question-footer">
          <div
            className="quit-link"
            onClick={() => {
              setQuestionTimer(60);
              sessionStorage.removeItem(QUIZ_TIMER);
              navigate("/category", { replace: true });
            }}
          >
            Quit
          </div>
          <div
            onClick={() =>
              dispatchHelper(
                answerBtn,
                dispatch,
                Number(questionIdx),
                questions
              )
            }
            className={`next-link ${
              Number(questionIdx) === questions?.length ? "result" : ""
            }`}
          >
            {Number(questionIdx) === questions?.length ? "Submit" : "Next"}
          </div>
        </div>
      </div>
    </section>
  );
};
