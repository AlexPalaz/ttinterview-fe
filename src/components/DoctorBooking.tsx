import Calendar from "react-calendar";
import Button from "./Button";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import {
  AppointmentService,
  AUTHORIZATION_COOKIE_KEY,
} from "@/app/api.service";
import { HttpStatusCode } from "axios";
import { Doctor } from "@/app/types";

type DoctorBookingProps = {
  doctor: Doctor;
};

export default function DoctorBooking({ doctor }: DoctorBookingProps) {
  const [error, setError] = useState<string>(null!);
  const [date, setDate] = useState<Date>(null!);
  const [day, setDay] = useState<string>(null!);
  const [availability, setAvailability] = useState<number[]>(null!);
  const [hour, setHour] = useState<number>(null!);

  const handleDay = (date: Date) => {
    setHour(null!);
    setDate(date);
    setDay(date.toLocaleDateString("en-US", { weekday: "long" }));
  };

  const handleHour = (hour: number) => {
    setHour(hour);
  };

  const handleSchedule = async () => {
    const fullDate = date.setHours(hour);
    const isoDate = new Date(fullDate).toISOString();
    const token = getCookie(AUTHORIZATION_COOKIE_KEY);
    if (token) {
      const createAppointmentReq = await AppointmentService.createAppointment(
        token,
        doctor.userId,
        isoDate
      );
      if (
        createAppointmentReq.status === HttpStatusCode.Created &&
        createAppointmentReq.message
      ) {
        window.location.href = "/";
      } else {
        setError((createAppointmentReq.message as string) || "");
      }
    }
  };

  useEffect(() => {
    if (day) {
      const hours = doctor?.availability
        .filter((av) => av.day == day)
        .map((av) => av.hours)
        .flat();
      setAvailability(hours);
    }
  }, [day]);

  return (
    <div className="my-4">
      <div className="w-full mt-4 flex justify-center">
        <Calendar
          minDate={new Date()}
          onClickDay={handleDay}
          className="max-w-[350px] rounded-md shadow"
        />
      </div>
      {day && availability ? (
        <>
          <h3 className="font-light text-sm my-4 flex justify-center">
            Check availability
          </h3>
          <div className="flex items-center flex-col gap-4 mt-4 cursor-pointer flex-wrap">
            <div className="flex gap-4 flex-wrap">
              {availability?.map((av, i) => (
                <div
                  key={i}
                  className={`${
                    hour == av ? "bg-gray-700 text-white" : "bg-gray-100"
                  } rounded px-2 py-1 text-sm`}
                  onClick={() => handleHour(av)}
                >
                  {av + ":00"}
                </div>
              ))}
            </div>
            {hour ? (
              <Button
                label="Schedule now"
                className="max-w-[150px] mt-4"
                onClick={handleSchedule}
              />
            ) : null}
            {error ? <div className="text-red-500 text-xs">{error}</div> : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
