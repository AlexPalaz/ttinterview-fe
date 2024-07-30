"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { HttpStatusCode } from "axios";
import Link from "next/link";
import { AUTHORIZATION_COOKIE_KEY, AuthService } from "../api.service";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import { Role } from "../types";

export default function Login() {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>(null!);
  const [role, setRole] = useState<Role>(Role.PATIENT);
  const [password, setPassword] = useState<string>(null!);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlefullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role);
  };

  const handleSignUp = async () => {
    if (!email || !password || !role || !fullName) {
      return;
    }

    const signUpReq = await AuthService.signUp(email, password, fullName, role);
    if (signUpReq.status === HttpStatusCode.Created && signUpReq.message) {
      setCookie(AUTHORIZATION_COOKIE_KEY, signUpReq.message);
      window.location.href = "/";
    } else {
      setError(signUpReq.message || "");
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
          Welcome! Enter with your credentials to sign up
        </h1>
        <div className="flex flex-col gap-4 items-center m-auto max-w-[200px]">
          <Input
            name="fullName"
            onChange={handlefullName}
            type="text"
            placeholder="Full name"
          />
          <Input
            name="email"
            onChange={handleEmail}
            type="email"
            placeholder="Email"
          />
          <Dropdown name="role" onChange={handleRole}>
            <option value={Role.PATIENT}>{Role.PATIENT}</option>
            <option value={Role.DOCTOR}>{Role.DOCTOR}</option>
          </Dropdown>
          <Input
            name="password"
            onChange={handlePassword}
            type="password"
            placeholder="Password"
          />
          <Button label="Sign-up" className="my-6" onClick={handleSignUp} />
        </div>
        <Link href={"/signin"} className="text-xs underline">
          Already registered? Sign in!
        </Link>
        <div className="text-xs text-red-500">{error}</div>
      </div>
    </div>
  );
}
