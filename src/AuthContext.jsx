import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "./utils/firebase.js";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Auth state
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      }
    });
    // Unlisten
    return unsub;
  }, []);


  return (
    <AuthCtx.Provider value={{ user, loading, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
