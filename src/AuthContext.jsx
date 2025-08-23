import { createContext, useContext, useEffect, useState } from "react";
import { auth, logout, anonAuth } from "./utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

    if (!auth.currentUser) {
      (async () => {
        try {
        const u = await anonAuth();
        setUser(u);
        setLoading(false);
        console.log(u);
      } catch (err) {
        console.log(err.message);
      }
      })();
    }
    return unsub;
  },[]);

  return (
    <AuthCtx.Provider value={{ user, loading, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
