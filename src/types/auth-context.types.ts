type HandleLoginType = (email: string, password: string) => void;
type HandleSignupType = (
  name: string,
  email: string,
  password: string
) => void;

type HandleLogoutType = () => void;

export type UserCredentialsType = {
    token: string
    userId: string
}

export type AuthContextType = {
  userCredentials: UserCredentialsType;
  setUserCredentials: React.Dispatch<React.SetStateAction<UserCredentialsType>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  handleLogin: HandleLoginType;
  handleSignup: HandleSignupType;
  handleLogout: HandleLogoutType;
};

export type LayoutPropType = {
  children: React.ReactNode;
};

export type UserType = {
  email: string;
  name: string;
  score: ScoreType[];
  uid: string;
};

export type ScoreType = {
  quizId: string;
  score: number;
};