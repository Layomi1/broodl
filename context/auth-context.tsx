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
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UserCredential } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  currentUser: User | null;
  userDataObj: object;
  loading: boolean;
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  // setUserDataObj: React.Dispatch<React.SetStateAction<object>>;

  signup: UseMutationResult<
    UserCredential,
    Error,
    { email: string; password: string }
  >;

  login: UseMutationResult<
    UserCredential,
    Error,
    { email: string; password: string }
  >;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDataObj, setUserDataObj] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(true);

  const signup = useMutation<
    UserCredential,
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) =>
      await createUserWithEmailAndPassword(auth, email, password),
  });

  const login = useMutation<
    UserCredential,
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) =>
      signInWithEmailAndPassword(auth, email, password),
  });

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserDataObj({});
    setLoading(false);
  };

  useEffect(() => {
    const onsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setCurrentUser(user);
        if (!user) return;
        console.log("fetching user data");
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let firebaseData = {};

        if (docSnap.exists()) {
          console.log("found user data");
          firebaseData = docSnap.data();
          console.log("firebaseData: ", firebaseData);
        }
        setUserDataObj(firebaseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      return onsubscribe;
    });
  }, []);

  const value: AuthContextType = {
    currentUser,
    userDataObj,
    loading,
    // setLoading,
    // setCurrentUser,
    // setUserDataObj,
    signup,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
