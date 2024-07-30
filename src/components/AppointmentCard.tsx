"use client";

import { Appointment, Role } from "@/app/types";
import { format } from "date-fns";

type AppointmentCardProps = {
  appointment: Appointment;
  role: Role;
};
export default function AppointmentCard({
  appointment,
  role,
}: AppointmentCardProps) {
  return (
    <div className="w-[350px] min-h-12 bg-white rounded border shadow border-gray-300 mb-4 p-4">
      <p className="text-md mb-4">
        <span className="font-semibold text-zinc-700">
          {role == Role.PATIENT ? "Doctor: " : "Patient: "}
        </span>
        <span>
          {role == Role.PATIENT
            ? appointment.doctorName
            : appointment.patientName}
        </span>
      </p>
      <h3 className="text-sm">
        <span className="font-semibold text-zinc-700">Day: </span>
        {format(new Date(appointment.date), "EEEE MM/dd/yyyy")}
      </h3>
      <h3 className="text-sm">
        <span className="font-semibold text-zinc-700">Hour: </span>
        {format(new Date(appointment.date), "HH:mm")}
      </h3>
    </div>
  );
}
