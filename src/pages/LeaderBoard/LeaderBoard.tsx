import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ToastMessage } from "../../components";
import { useLoader } from "../../contexts";
import { db } from "../../firebase";
import { useDocumentTitle } from "../../hooks";
import { leaderboardUserType, TitleType } from "../../types";
import { getTotalScore } from "../../utils";

export const LeaderBoard = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const [userData, setUserData] = useState([
    {
      email: "",
      name: "",
      score: [],
      id: "",
    },
  ]);
  const { setShowLoader } = useLoader();

  useEffect(() => {
    (async () => {
      setShowLoader(true);
      try {
        const docRef = collection(db, "users");
        const data = await getDocs(docRef);
        const dataList = await data.docs.map((doc) => ({
          email: doc.data().email,
          name: doc.data().name,
          score: doc.data().score,
          id: doc.id,
        }));
        setUserData(dataList);
      } catch (err: any) {
        console.error(err?.message);
        ToastMessage(err?.message, "error");
      } finally {
        setShowLoader(false);
      }
    })();
  }, [setShowLoader]);

  const allUsers = userData.reduce(
    (acc: leaderboardUserType[], curr) =>
      getTotalScore(curr.score)
        ? [
            ...acc,
            {
              _id: Math.random() * 1.23,
              name: curr.name,
              score: getTotalScore(curr.score),
            },
          ]
        : acc,
    []
  );
  allUsers.sort(
    (a: leaderboardUserType, b: leaderboardUserType) => b.score - a.score
  );

  return (
    <section id="leaderboard">
      <header className="section-heading">Leader Board</header>
      <table className="leaderboard-table">
        <thead>
          <tr className="leaderboard-row">
            <th scope="col" className="leaderboard-header-cell">
              Rank
            </th>
            <th scope="col" className="leaderboard-header-cell">
              Name
            </th>
            <th scope="col" className="leaderboard-header-cell">
              Total Score
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item: any, idx: number) => (
            <tr key={item._id} className="leaderboard-row">
              <td className="leaderboard-table-cell">{idx + 1}</td>
              <td className="leaderboard-table-cell">{item.name}</td>
              <td className="leaderboard-table-cell">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
