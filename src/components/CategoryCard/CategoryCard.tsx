import { Link, useLocation } from "react-router-dom";
import { QuizModelType } from "../../types/quiz.types";

export const CategoryCard = ({ data }: { data: QuizModelType }) => {
  const { image, quizId, quizName } = data;
  const { pathname } = useLocation();
  return (
    <div className="category-card">
      <div className="category-card-img-container">
        <img src={image} className="img img-responsive" alt="quiz poster" />
      </div>
      <div className="category-card-content">
        <h5>{quizName}</h5>
        <Link
          to={`/${quizId}/rules`}
          state={{ from: pathname }}
          className="btn outline-primary"
        >
          play now
        </Link>
      </div>
    </div>
  );
};
