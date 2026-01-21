import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type LoginResponse = {
  access: string;
  refresh: string;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post<LoginResponse>("/api/auth/login", { email, password });
  localStorage.setItem("token", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
};

export const register = async (name: string, email: string, password: string) => {
  const { data } = await api.post<LoginResponse>("/api/auth/register", { name, email, password });
  localStorage.setItem("token", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
};

export const fetchRoadmap = async () => {
  const { data } = await api.get("/api/roadmap");
  return data;
};

export const fetchRoadmapStep = async (stepId: string) => {
  const { data } = await api.get(`/api/roadmap/${stepId}`);
  return data;
};

export const submitHomework = async (payload: {
  step_id: number;
  input_type: "text" | "code";
  content: string;
}) => {
  const { data } = await api.post("/api/homework/submit", payload);
  return data;
};

export const fetchHomeworkResult = async (submissionId: string) => {
  const { data } = await api.get(`/api/homework/result/${submissionId}`);
  return data;
};

export const askCoach = async (payload: { scenario: string; message: string }) => {
  const { data } = await api.post("/api/coach/ask", payload);
  return data;
};

export const fetchJobs = async () => {
  const { data } = await api.get("/api/jobs");
  return data;
};

export const takeJob = async (jobId: number) => {
  const { data } = await api.post(`/api/jobs/${jobId}/take`);
  return data;
};

export const fetchJobPack = async (jobId: number) => {
  const { data } = await api.get(`/api/jobs/${jobId}/pack`);
  return data;
};

export const fetchProfile = async () => {
  const { data } = await api.get("/api/profile");
  return data;
};

export const verifyProfile = async (identity_level: "verified" | "eid_mock") => {
  const { data } = await api.post("/api/profile/verify-mock", { identity_level });
  return data;
};
