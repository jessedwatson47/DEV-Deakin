import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, reload } from "firebase/auth";
import { auth, authReady, logout, anonAuth, fetchUser } from "../utils/firebase.js";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Auth Data
  const [authLoading, setAuthLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Firestore Data

  
  useEffect(() => {
    let unsub;

    (async () => {
      await authReady;

      unsub = onAuthStateChanged(auth, async (u) => {
        if (!u) {
          try {
            const anon = await anonAuth();
            setUser(anon);
          } catch (e) {
            console.error("Anon sign-in failed:", e);
          }
        } else {
          setUser(u);
        }
        setAuthLoading(false);
      });
    })();
    return () => unsub && unsub();
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user?.uid) {
      setUserData(null);
      setUserLoading(false);
      return;
    }

    let alive = true;
    setUserLoading(true);

     (async () => {
      try {
        const data = await fetchUser(user);
        if (alive) setUserData(data);
      } catch (err) {
        console.error("Failed to fetch user");
        if (alive) setUserData(null);
      } finally {
        if (alive) setUserLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [authLoading, user?.uid]);

  const refreshUser = async () => {
    if (!auth.currentUser) return null;
    await reload(auth.currentUser);
    setUser({...auth.currentUser})
    return auth.currentUser;
  }
  return (
    <AuthContext.Provider value={{ user, authLoading, userLoading, logout, userData, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
