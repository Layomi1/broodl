import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase";

type AuthInput = {
  email: string;
  password: string;
};

export type MutationProps<TData = unknown> = {
  onSuccess(_val: TData): void;
  onError?: (_val: string, _err?: unknown) => void;
};

export const useLogin = (props: MutationProps<UserCredential>) => {
  const { onSuccess, onError } = props;
  const { mutate, isSuccess, isError, isPending } = useMutation<
    UserCredential,
    unknown,
    AuthInput
  >({
    mutationFn: async ({ email, password }) => {
      const UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return UserCredential;
    },

    onSuccess,
    onError(err) {
      if (onError) {
        onError("Error fetching user", err);
      }
    },
  });
  return {
    mutate,
    isSuccess,
    isError,
    isPending,
  };
};

export const useSignup = (props: MutationProps<UserCredential>) => {
  const { onSuccess, onError } = props;
  const { mutate, isSuccess, isError, isPending } = useMutation<
    UserCredential,
    unknown,
    AuthInput
  >({
    mutationFn: async ({ email, password }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    },
    onSuccess,
    onError(err) {
      if (onError) {
        onError("Error registering user", err);
      }
    },
  });
  return {
    mutate,
    isSuccess,
    isError,
    isPending,
  };
};
