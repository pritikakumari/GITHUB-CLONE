import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

const AuthContext = createContext(null);

// Custom hook to access authentication data
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider to share authentication data with components
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      setCurrentUser(userId);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;