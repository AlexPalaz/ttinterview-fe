"use client";

import { Doctor } from "@/app/types";
import Input from "./Input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import DoctorDetail from "./DoctorDetail";
import DoctorList from "./DoctorList";

type SearchClientViewProps = {
  doctors: Doctor[];
};

export default function SearchClientView({ doctors }: SearchClientViewProps) {
  const [searchTerms, setSearchTerms] = useState<string>(null!);
  const [doctor, setDoctor] = useState<Doctor>(null!);
  const debouncedSearchTerms = useDebounce(searchTerms, 300);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(e.target.value);
  };

  const handleSelectedDoctor = useCallback(
    (value: Doctor) => {
      setDoctor(value);
      const body = document.querySelector<HTMLElement>("body");
      if (body) {
        body.style.overflow = "hidden";
      }
    },
    [doctor]
  );

  const deselectDoctor = () => {
    setDoctor(null!);
  };

  useEffect(() => {
    const body = document.querySelector<HTMLElement>("body");
    if (doctor) {
      if (body) {
        body.style.overflow = "hidden";
      }
    } else {
      if (body) {
        body.style.overflow = "auto";
      }
    }
  }, [doctor]);

  return (
    <>
      <div>
        <Input
          type="text"
          name="search"
          onChange={handleChange}
          className="w-[370px]"
          placeholder={"Search by specialty or name"}
        />
      </div>
      <DoctorList
        filter={debouncedSearchTerms}
        doctors={doctors}
        onClick={handleSelectedDoctor}
      />
      <DoctorDetail key={Math.random()} doctor={doctor} onClose={deselectDoctor} />
    </>
  );
}
