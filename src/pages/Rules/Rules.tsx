import { BsStarFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useDocumentTitle } from "../../hooks";
import { QuizModel } from "../../Model/quiz.model";
import { TitleType } from "../../types";

export const Rules = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const { quizId } = useParams();
  const quizData = QuizModel.find((item) => item.quizId === quizId);
  const navigate = useNavigate();

  return (
    <section id="rules">
      <div className="section-heading">Quiz Rules</div>
      <div className="rules-container">
        <ul className="rule-list">
          <li className="rule-item">
            <BsStarFill className="rule-icon" />
            <span>There are total {quizData?.questions.length} questions</span>
          </li>
          <li className="rule-item">
            <BsStarFill className="rule-icon" />
            <span>Each question carries {quizData?.points} points</span>
          </li>
          <li className="rule-item">
            <BsStarFill className="rule-icon" />
            <span>You have 60 seconds to answer each question</span>
          </li>
          <li className="rule-item">
            <BsStarFill className="rule-icon" />
            <span>Each quiz has only one correct answer</span>
          </li>
        </ul>

        <div className="cta-container">
          <button className="btn outline" onClick={() => navigate("/category")}>
            back
          </button>
          <button
            className="btn primary"
            onClick={() => navigate(`/${quizId}/1`)}
          >
            Start
          </button>
        </div>
      </div>
    </section>
  );
};
