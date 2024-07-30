"use client";

import { Doctor } from "@/app/types";
import React from "react";

type DoctorCardProps = {
  doctor: Doctor;
  onClick: (doctor: Doctor) => void;
};

function DoctorCard({ doctor, onClick }: DoctorCardProps) {
  return (
    <div
      onClick={() => onClick(doctor)}
      className="w-[370px] border rounded-md cursor-pointer hover:bg-green-200 border-gray-300 my-4 flex justify-between shadow transition-colors"
    >
      <div className="flex flex-col py-4 px-4">
        <span className="text-xs">{doctor.name}</span>
        <span className="text-xs font-light text-gray-500">
          Specialty: {doctor.specialty}
        </span>
      </div>
      <div className="w-[130px]">
        <span className="text-xs font-light">
          Experience: {doctor.experience}
        </span>
      </div>
    </div>
  );
}

export default React.memo(DoctorCard);
