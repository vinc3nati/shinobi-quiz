import { useEffect } from "react";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useData } from "../../contexts";
import { useDocumentTitle } from "../../hooks";
import { QuizModel } from "../../Model/quiz.model";
import { handleAddScore } from "../../services/result.service";
import { TitleType } from "../../types";
import { QUIZ_ANSWERS } from "../../utils/constants";

export const Result = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const { quizId } = useParams();
  const {
    state: { answers },
  } = useData();

  const quizData = QuizModel.find((item) => item.quizId === quizId);

  const results = answers.map((item) => ({
    ...item,
    ...quizData?.questions[item.questionIndex - 1],
  }));
  const individualPoint = quizData?.points as number;
  const netQuestions = quizData?.questions.length as number;

  const totalPoints = results.reduce((acc, curr) => {
    const options = curr.options || [];
    return options[curr.selectedOption]?.isRight ? acc + individualPoint : acc;
  }, 0);

  useEffect(() => {
    sessionStorage.removeItem(QUIZ_ANSWERS);
    if (quizId) {
      handleAddScore(totalPoints, quizId);
    }
  }, []);

  return (
    <section id="result">
      <div className="result-container">
        <header className="result-heading">
          <h4>
            {totalPoints < 10
              ? "Better luck next time! 🤗"
              : "Winner Winner Shinobi Dinner 🎉"}
          </h4>
          <h6>
            You scored {totalPoints} / {individualPoint * netQuestions}
          </h6>
        </header>
        <main className="result-solution-container">
          {results.map((item) => {
            const options = item.options || [];
            const isRight = options[item.selectedOption]?.isRight;

            return (
              <div className="result-solution" key={item.questionIndex}>
                <div className="result-solution-heading">
                  <p>Question {item.questionIndex}</p>
                  {isRight ? (
                    <AiFillCheckCircle className="text-success" />
                  ) : isRight === false ? (
                    <AiFillCloseCircle className="text-error" />
                  ) : (
                    <span className="text-error">Not Selected</span>
                  )}
                </div>
                <p className="question-qt">{item.question}</p>
                <div className="result-solution-ansers">
                  {item.options?.map((opt, idx) =>
                    isRight ? (
                      <div
                        className={`result-answer ${
                          opt.isRight ? "bg-success" : "bg-result"
                        }`}
                      >
                        {opt.value}
                      </div>
                    ) : (
                      <div
                        className={`result-answer ${
                          item.selectedOption === idx
                            ? "bg-error"
                            : opt.isRight
                            ? "bg-success"
                            : "bg-result"
                        }`}
                      >
                        {opt.value}
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </main>
        <Link to="/" className="btn primary" replace>
          go to home
        </Link>
      </div>
    </section>
  );
};
