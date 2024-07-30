import { Doctor } from "@/app/types";
import { useMemo } from "react";
import DoctorCard from "./DoctorCard";
import React from "react";

type DoctorListProps = {
  filter: string;
  doctors: Doctor[];
  onClick: (doctor: Doctor) => void;
};

function DoctorList({ filter, doctors, onClick }: DoctorListProps) {
  const filteredDoctors = useMemo(() => {
    return filter
      ? doctors.filter(
          (doctor) =>
            doctor.name.includes(filter) || doctor.specialty.includes(filter)
        )
      : doctors;
  }, [doctors, filter]);

  return filteredDoctors.map((doctor, i) => (
    <div key={doctor.userId}>
      <DoctorCard doctor={doctor} onClick={onClick} />
    </div>
  ));
}

export default React.memo(DoctorList);
