import { useEffect } from "react";
import { capitalize } from "../utils";

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `Shinobi Quiz | ${capitalize(title)}`;
  }, [title]);
};
