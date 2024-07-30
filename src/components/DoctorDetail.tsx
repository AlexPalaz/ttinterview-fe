import { Doctor } from "@/app/types";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Button from "./Button";
import DoctorBooking from "./DoctorBooking";

type DoctorDetailProps = {
  doctor: Doctor;
  onClose: () => void;
};

export default function DoctorDetail({ doctor, onClose }: DoctorDetailProps) {
  const [isBooking, setIsBooking] = useState<boolean>(false);

  return doctor ? (
    <div className=" bg-black/10 flex justify-center items-center fixed top-0 start-0 z-[60] size-full overflow-hidden">
      <div className="w-[75vw] min-h-[95vh] rounded-lg bg-white relative p-4">
        <div
          onClick={onClose}
          className="absolute right-4 top-2 cursor-pointer font-light"
        >
          &#10006;
        </div>
        <div>
          <div>
            <h1 className="text-lg">{doctor.name}</h1>
            <h2 className="text-md font-light mb-4">
              Specialty: {doctor.specialty}
            </h2>
          </div>
          <div>
            <p className="text-xs font-light">Email: {doctor.email}</p>
            <p className="text-xs font-light">
              Experience: {doctor.experience}
            </p>
            <p className="text-xs font-light">
              Qualifications: {doctor.qualifications.join(", ")}
            </p>
          </div>
        </div>

        {!isBooking ? (
          <div>
            <h3 className="font-light text-sm my-4">Reviews</h3>
            <ul className="text-[10px] font-light h-[50vh] overflow-scroll">
              {doctor.reviews.map((review, i) => {
                return (
                  <li className="mb-4" key={"rewview_" + i}>
                    <p>{review.rating} Stars</p>
                    <p>
                      {review.patient} - {review.date}
                    </p>
                    <p>{review.comment}</p>
                  </li>
                );
              })}
            </ul>
            <div className="w-full justify-center flex">
              <Button
                label="Book a meeting"
                className="max-w-[200px] absolute bottom-4"
                onClick={() => setIsBooking(true)}
              />
            </div>
          </div>
        ) : null}
        {isBooking ? <DoctorBooking doctor={doctor} /> : null}
      </div>
    </div>
  ) : null;
}
