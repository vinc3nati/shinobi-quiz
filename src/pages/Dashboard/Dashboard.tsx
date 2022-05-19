import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useLoader } from "../../contexts";
import { db } from "../../firebase";
import { useDocumentTitle } from "../../hooks";
import { TitleType, UserType } from "../../types";
import image from "../../assets/hero_2.png";
import { QuizModel } from "../../Model/quiz.model";

export const Dashboard = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const {
    userCredentials: { token, userId },
  } = useAuth();
  const initVal = {
    name: "",
    email: "",
    score: [],
    uid: "",
  };
  const { setShowLoader } = useLoader();
  const [user, setUser] = useState<UserType>(initVal);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && userId) {
      setShowLoader(true);
      (async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", userId));
          onSnapshot(q, (data) => {
            setUser(data.docs[0].data() as UserType);
          });
        } catch (err) {
          console.log(err);
        } finally {
          setShowLoader(false);
        }
      })();
    }
  }, []);

  const totalUserPoints = user.score.reduce((acc, curr) => acc + curr.score, 0);

  return (
    <section id="dashboard">
      <div className="section-heading">Dashboard</div>
      <div className="dashboard-container">
        <header className="dashboard-heading">
          <p>Your Progress</p>
          <p>Total Points: {totalUserPoints}</p>
        </header>
        <div className="dashboard-content">
          {user.score.length === 0 && (
            <div className="dashboard-empty">
              <h3>Looks like you haven't challenged yourself! </h3>
              <div className="dashboard-img-container">
                <img
                  className="img img-responsive"
                  src={image}
                  alt="empty score"
                />
              </div>
              <button
                className="btn primary"
                onClick={() => navigate("/category")}
              >
                challenge now
              </button>
            </div>
          )}
          {user.score.length !== 0 && (
            <div className="dashboard-list-container">
              {user.score.map((item) => (
                <div key={item.quizId} className="dashboard-list">
                  <div className="dashboard-list-heading">
                    <p>
                      {
                        QuizModel.find((it) => it.quizId === item.quizId)
                          ?.quizName as string | undefined
                      }
                    </p>
                    <p>{item.score}</p>
                  </div>
                  <button
                    className="btn"
                    onClick={() => navigate(`/${item.quizId}/rules`)}
                  >
                    retry
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
