export type BaseResponse<T> = {
  status: number;
  message: T;
};

export enum Status {
  UPCOMING = "UPCOMING",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}

export type Review = {
  date: string;
  patient: string;
  rating: number;
  comment: string;
};

export type Availability = {
  hours: number[];
  day: string;
};

export type Doctor = {
  qualifications: string[];
  specialty: string;
  reviews: Review[];
  name: string;
  avatar: string;
  availability: Availability[];
  experience: string;
  userId: string;
  email: string;
};

export enum Role {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
}

export type User = {
  email: string;
  userId: string;
  role: Role;
};

export type Appointment = {
  appointmentId: string;
  doctorUserId: string;
  patientUserId: string;
  date: string;
  status: Status;
  createdAt: string;
  doctorName: string;
  patientName: string;
};
