import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";
import { AUTHORIZATION_COOKIE_KEY, DoctorService } from "../api.service";
import { Doctor, Role, User } from "../types";
import SearchClientView from "@/components/SearchClientView";

export default async function Search() {
  const token = cookies().get(AUTHORIZATION_COOKIE_KEY);
  const userInfo = token?.value ? (decode(token.value) as User) : null;

  if (userInfo?.role == Role.DOCTOR) {
    return;
  }

  const tryGetAllDoctors = await DoctorService.getAllDoctors(
    token?.value as string
  );
  const doctors = tryGetAllDoctors.message;

  return (
    <div className="w-full h-[calc(100vh-120px)] font-semibold flex justify-center">
      <div className="flex flex-col">
        {Array.isArray(doctors) && doctors?.length ? (
          <SearchClientView doctors={doctors} />
        ) : null}
      </div>
    </div>
  );
}
