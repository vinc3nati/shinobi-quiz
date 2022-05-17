import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks";
import { TitleType } from "../../types";

export const Home = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home-content">
        <header className="home-heading">Shinobi Quiz</header>
        <p>Challenge your shinobi knowledge</p>
        <p>Take a challenge now!</p>
        <button className="btn tertiary" onClick={() => navigate("/category")}>
          start
        </button>
      </div>
    </div>
  );
};
