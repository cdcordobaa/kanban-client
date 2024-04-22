import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import api from "../../config/api";

interface AuthContextType {
  user: any;
  accessToken: string;
  setUser: (user: any) => void;
  setAccessToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: "",
  setUser: () => {},
  setAccessToken: () => {},
});

const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem("accessToken");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  return { user, setUser, accessToken, setAccessToken };
};

export const ProvideAuth: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a ProvideAuth");
  }
  return context;
};
