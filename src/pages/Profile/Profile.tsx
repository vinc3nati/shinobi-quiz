import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { TitleType } from "../../types";

export const Profile = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const { user, handleLogout } = useAuth();
  return (
    <section id="profile">
      <div className="profile-container">
        <div className="user-img-container">
          <div className="avatar avatar-text lg">{user.name[0]}</div>
        </div>
        <div className="profile-content">
          <div className="profile-section">
            <span className="profile-title">Name :</span>
            <span className="profile-value">{user.name}</span>
          </div>
          <div className="profile-section">
            <span className="profile-title">Email :</span>
            <span className="profile-value">{user.email}</span>
          </div>

          <button className="btn outline-error" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};
