import React from "react";
import SignIn from "../components/SignIn.tsx";
import SignUp from "./SignUp.tsx";

export default function SignInLayout() {
  return (
    <>
      <SignIn />
      <SignUp />
    </>
  );
}