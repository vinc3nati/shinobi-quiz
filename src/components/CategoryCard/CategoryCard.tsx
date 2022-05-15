import { Link, useLocation } from "react-router-dom";
import { QuizModelType } from "../../types/quiz.types";

export const CategoryCard = ({ data }: { data: QuizModelType }) => {
  console.log("Card :", data);
  const { image, quizId, quizName } = data;
  const { pathname } = useLocation();
  return (
    <div className="category-card">
      <div className="category-card-img-container">
        <img src={image} className="img img-responsive" alt="quiz poster" />
      </div>
      <div className="category-card-content">
        <h5>{quizName.toUpperCase()}</h5>
        <Link
          to={`/${quizId}/rules`}
          state={{ from: pathname }}
          className="btn outline-primary"
        >
          play
        </Link>
      </div>
    </div>
  );
};
