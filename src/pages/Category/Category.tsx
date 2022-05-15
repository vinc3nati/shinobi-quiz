import React, { useEffect, useState } from "react";
import { CategoryCard } from "../../components";
import { useData } from "../../contexts";
import { useDocumentTitle } from "../../hooks";
import { QuizModel } from "../../Model/quiz.model";
import { TitleType } from "../../types";

export const Category = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const [activeCategory, setActiveCategory] = useState<string>("easy");
  const { dispatch } = useData();

  const changeCategory = (category: string) => setActiveCategory(category);

  const quizCategoryData = QuizModel.filter(
    (item) => item.quizCategory === activeCategory
  );

  const categories = QuizModel.reduce(
    (acc, curr) =>
      acc.includes(curr.quizCategory) ? acc : [...acc, curr.quizCategory],
    [] as string[]
  );

  //   useEffect(() => {
  //     dispatch({ type: "RESET" });
  //   }, []);

  return (
    <section id="category">
      <header className="section-heading">Categories</header>
      <div className="category-btn-container">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => changeCategory(item)}
            className={`btn category-btn ${
              activeCategory === item ? "active" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="category-card-container">
        {QuizModel.filter((item) => item.quizCategory === activeCategory)?.map(
          (item) => (
            <CategoryCard key={item.quizId} data={item} />
          )
        )}
      </div>
    </section>
  );
};
