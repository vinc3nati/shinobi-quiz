import  {
    createContext,
    useContext,
    useState,
    useEffect,
    useLayoutEffect,
  } from "react";
import { LayoutPropType, ThemeContextType } from "../types";
  
const THEME_KEY: string = "SHINOBI_QUIZ_KEY";
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
  
  const preferredColorScheme:string = "(prefers-color-scheme: dark)";
  
  const ThemeProvider = ({ children }: LayoutPropType) => {
    const [theme, setTheme] = useState<string>(
      () =>
        localStorage.getItem(THEME_KEY) ||
        (matchMedia(preferredColorScheme).matches ? "dark" : "light")
    );
  
    const toggleTheme = () =>
      setTheme((theme) => (theme === "light" ? "dark" : "light"))
  
    useLayoutEffect(() => {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === "light") {
        document.documentElement.classList.remove("dark-theme");
        document.documentElement.classList.add("light-theme");
      } else {
        document.documentElement.classList.remove("light-theme");
        document.documentElement.classList.add("dark-theme");
      }
    }, [theme]);
  
    useEffect(() => {
      const mediaQuery = matchMedia(preferredColorScheme);
      const handleColorSchemeChange = () =>
        setTheme(mediaQuery.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handleColorSchemeChange);
      return () =>
        mediaQuery.removeEventListener("change", handleColorSchemeChange);
    }, []);
  
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("Theme Context was not created");
  
    return context;
  };
  
  export { useTheme, ThemeProvider };
  