'use client';

import { Role } from "@/app/types";
import Link from "next/link";
import Button from "./Button";
import { setCookie } from "cookies-next";
import { AUTHORIZATION_COOKIE_KEY } from "@/app/api.service";

type HeaderProps = {
  role: Role;
};

export const Header = ({ role }: HeaderProps) => {

  const handleLogout = () => {
    setCookie(AUTHORIZATION_COOKIE_KEY, "");
    window.location.href = "/login"
  }

  return (
    <div className="h-12 border-b bg-slate-100 w-full flex justify-center items-center gap-12">
      <Link
        className="text-sm text-green-700 hover:underline"
        title="Appointments"
        href="/"
      >
        Appointments
      </Link>
      {role == Role.PATIENT ? (
        <Link
          className="text-sm text-green-700 hover:underline"
          title="Search doctor"
          href="/search"
        >
          Search doctor
        </Link>
      ) : null}
      <Button className=" absolute right-4 max-w-[100px]" label="Logout" onClick={handleLogout} /> 
    </div>
  );
};
