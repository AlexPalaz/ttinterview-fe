import axios, { AxiosError, AxiosResponse } from "axios";
import { Appointment, BaseResponse, Doctor, Role } from "./types";

export const AUTHORIZATION_COOKIE_KEY = "authorization";
export const AUTH_BASE_URL = "http://localhost:33333";
export const DOCTORS_BASE_URL = "http://localhost:22222";
export const APPOINTMENTS_BASE_URL = "http://localhost:44444";
export const SIGNIN_URL = AUTH_BASE_URL + "/api/auth/signin";
export const SIGNUP_URL = AUTH_BASE_URL + "/api/auth/signup";
export const GET_ALL_DOCTORS_URL = DOCTORS_BASE_URL + "/api/doctors/all";
export const CREATE_APPOINTMENT_URL =
  APPOINTMENTS_BASE_URL + "/api/appointments/create";
export const GET_APPOINTMENTS_URL =
  APPOINTMENTS_BASE_URL + "/api/appointments/all";

const authAxiosInstance = axios.create({
  headers: {
    ContentType: "application/json",
  },
});

const catchHandler = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    return {
      status: e.status || 500,
      message:
        (e.response as AxiosResponse)?.data?.message?.[0]?.msg ||
        (e.response as AxiosResponse).data?.message ||
        null,
    };
  } else {
    return {
      status: 500,
      message: (e as Error)?.message || null,
    };
  }
};

const signIn = async (
  email: string,
  password: string
): Promise<BaseResponse<string | null>> => {
  try {
    return await authAxiosInstance({
      method: "POST",
      url: SIGNIN_URL,
      data: {
        email,
        password,
      },
    }).then((res) => res.data);
  } catch (e) {
    return catchHandler(e);
  }
};

const signUp = async (
  email: string,
  password: string,
  fullName: string,
  role: Role
): Promise<BaseResponse<string | null>> => {
  try {
    return await authAxiosInstance({
      method: "POST",
      url: SIGNUP_URL,
      data: {
        fullName,
        role,
        email,
        password,
      },
    }).then((res) => res.data);
  } catch (e) {
    return catchHandler(e);
  }
};

const getAllDoctors = async (
  token: string
): Promise<BaseResponse<Doctor[]>> => {
  try {
    return await authAxiosInstance({
      method: "GET",
      url: GET_ALL_DOCTORS_URL,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.data);
  } catch (e) {
    return catchHandler(e);
  }
};

const getAllAppointments = async (
  token: string
): Promise<BaseResponse<Appointment[]>> => {
  try {
    return await authAxiosInstance({
      method: "GET",
      url: GET_APPOINTMENTS_URL,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.data);
  } catch (e) {
    return catchHandler(e);
  }
};

const createAppointment = async (
  token: string,
  doctorUserId: string,
  date: string
): Promise<BaseResponse<Appointment | string | null>> => {
  try {
    return await authAxiosInstance({
      method: "POST",
      url: CREATE_APPOINTMENT_URL,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        doctorUserId,
        date,
      },
    }).then((res) => res.data);
  } catch (e) {
    return catchHandler(e);
  }
};

export const AuthService = {
  signIn,
  signUp,
};

export const DoctorService = {
  getAllDoctors,
};

export const AppointmentService = {
  getAllAppointments,
  createAppointment,
};
