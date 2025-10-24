"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "@/lib/firebase";

import { signOut } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  currentUser: User | null;
  userDataObj: object | null;
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserDataObj: React.Dispatch<React.SetStateAction<object | null>>;

  logout?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDataObj, setUserDataObj] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const logout = async () => {
    try {
      setLoading(true);
      setUserDataObj(null);
      setCurrentUser(null);
      await signOut(auth);

      console.log("clicked");
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          setUserDataObj(null);
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let firebaseData = {};

        if (docSnap.exists()) {
          firebaseData = docSnap.data();
        }
        setUserDataObj(firebaseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      return unsubscribe;
    });
  }, []);

  const value: AuthContextType = {
    currentUser,
    userDataObj,
    loading,
    setLoading,
    setCurrentUser,
    setUserDataObj,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
