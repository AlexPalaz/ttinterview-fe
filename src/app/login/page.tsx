"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { HttpStatusCode } from "axios";
import Link from "next/link";
import { AUTHORIZATION_COOKIE_KEY, AuthService } from "../api.service";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>(null!);
  const [password, setPassword] = useState<string>(null!);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      return;
    }

    const signInReq = await AuthService.signIn(email, password);
    if (signInReq.status === HttpStatusCode.Ok && signInReq.message) {
      setCookie(AUTHORIZATION_COOKIE_KEY, signInReq.message);
      window.location.href = "/";
    } else {
      setError(signInReq.message || "");
    }
  };

  useEffect(() => {
    const token = getCookie(AUTHORIZATION_COOKIE_KEY);
    if (token) {
      router.replace("/");
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full max-w-[500px] rounded-md border border-gray-300 text-center p-4">
        <h1 className="font-semibold mb-8 text-sm">
          Welcome! Enter with your credentials to login as a doctor or patient
        </h1>
        <div className="flex flex-col gap-4 items-center m-auto max-w-[200px]">
          <Input
            name="email"
            onChange={handleEmail}
            type="email"
            placeholder="Email"
          />
          <Input
            name="password"
            onChange={handlePassword}
            type="password"
            placeholder="Password"
          />
          <Button label="Sign-in" className="my-6" onClick={handleSignIn} />
        </div>
        <Link href={"/signup"} className="text-xs underline">
          New member? Click here to sign up
        </Link>
        <div className="text-xs text-red-500">{error}</div>
      </div>
    </div>
  );
}
