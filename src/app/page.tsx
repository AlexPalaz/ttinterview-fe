"use client";

import { useEffect, useState } from "react";
import { Appointment, Role, Status, User } from "./types";
import { AppointmentService, AUTHORIZATION_COOKIE_KEY } from "./api.service";
import { getCookie } from "cookies-next";
import Tabs from "@/components/Tabs";
import { HttpStatusCode } from "axios";
import { decode } from "jsonwebtoken";
import AppointmentCard from "@/components/AppointmentCard";

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>(null!);
  const [role, setRole] = useState<Role>(null!);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [tab, setTab] = useState<string>(Status.UPCOMING);

  const handleTab = (activeTab: string) => {
    setTab(activeTab);
  };

  useEffect(() => {
    const token = getCookie(AUTHORIZATION_COOKIE_KEY);
    if (token) {
      const userInfo: User | null = token ? (decode(token) as User) : null;
      setRole(userInfo?.role || null!);

      AppointmentService.getAllAppointments(token).then((res) => {
        if (Array.isArray(res.message)) {
          setAppointments(res.message);
        }

        if (res.status === HttpStatusCode.NotFound) {
          setNotFound(true);
        }
      });
    }
  }, []);

  return !appointments?.length ? (
    <div className="w-full h-[calc(100vh-120px)] font-semibold flex items-center justify-center">
      {notFound ? "Welcome! Currently, there are no appointments here." : null}
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-[370px]">
        <Tabs
          tabs={[Status.UPCOMING, Status.COMPLETED, Status.CANCELED]}
          activeTab={tab}
          onClick={handleTab}
        />
      </div>
      <div className="mt-6">
        {role &&
          appointments
            .filter((a) => a.status == tab)
            .map((appointment, i) => {
              return (
                <AppointmentCard
                  key={"appointment_" + i}
                  role={role}
                  appointment={appointment}
                />
              );
            })}
      </div>
    </div>
  );
}
