import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../components";
import { auth, db } from "../firebase";
import {
  AuthContextType,
  LayoutPropType,
  UserCredentialsType,
  UserType,
} from "../types";
import { useLoader } from "./index";

const key: string = "SHINOBI_QUIZ";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: LayoutPropType) => {
  const [userCredentials, setUserCredentials] = useState<UserCredentialsType>(
    JSON.parse(localStorage.getItem(key) || "{}") || {
      token: "",
      userId: "",
    }
  );
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    score: [],
    uid: "",
  });
  const navigate = useNavigate();
  const { setShowLoader } = useLoader();

  useEffect(() => {
    if (userCredentials.token && userCredentials.userId) {
      (() => {
        setShowLoader(true);
        const q = query(
          collection(db, "users"),
          where("uid", "==", userCredentials.userId)
        );
        onSnapshot(q, (data) => {
          setUser(data.docs[0].data() as UserType);
        });
        setShowLoader(false);
      })();
    }
  }, [userCredentials.token]);

  const handleLogin = async (email: string, password: string) => {
    setShowLoader(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user: any = response.user;
      ToastMessage("Logged in successfully", "success");
      setUserCredentials({
        token: user?.accessToken,
        userId: user?.uid,
      });
      localStorage.setItem(
        key,
        JSON.stringify({ token: user?.accessToken, userId: user?.uid })
      );
    } catch (err: any) {
      console.error(err.message);
      ToastMessage(err.message, "error");
    } finally {
      setShowLoader(false);
    }
  };

  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ) => {
    setShowLoader(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: any = response.user;
      setUserCredentials({
        token: user?.accessToken,
        userId: user?.uid,
      });
      localStorage.setItem(
        key,
        JSON.stringify({ token: user?.accessToken, userId: user?.uid })
      );
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        score: [],
        email,
      });
      ToastMessage("Sign up successfully", "success");
    } catch (err: any) {
      console.error(err.message);
      ToastMessage(err.message, "error");
    } finally {
      setShowLoader(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem(key);
    setUserCredentials({
      token: "",
      userId: "",
    });
    setUser({ name: "", email: "", score: [], uid: "" });
    navigate("/", { replace: true });
    ToastMessage("Logged out successfully", "success");
  };

  return (
    <AuthContext.Provider
      value={{
        userCredentials,
        setUserCredentials,
        user,
        setUser,
        handleLogin,
        handleSignup,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth Context was not created");

  return context;
};

export { AuthProvider, useAuth };
