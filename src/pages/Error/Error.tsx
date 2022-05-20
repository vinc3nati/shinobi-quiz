import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks'
import { TitleType } from '../../types'
import errorImage from "../../assets/404_6.png";

export const Error = ({title}: TitleType) => {
    useDocumentTitle(title)
    const navigate = useNavigate();
    return (
      <main id="error-page">
        <div className="error-container">
          <div className="error-img-container">
            <img className="error-img" src={errorImage} alt="error-logo" />
          </div>
          <div className="error-content">
            <div className="error-heading">
              <p>Error</p>
              <p>404</p>
            </div>
            <div className="error-text">Page not found</div>
            <div className="error-button-grp">
              <button
                className="btn outline-primary"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <button
                className="btn primary"
                onClick={() => navigate("/category")}
              >
                quiz
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  
}
