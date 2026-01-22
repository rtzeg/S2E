import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";
const MOCK_PROFILE_KEY = "mock-profile";
const MOCK_TOKEN = "mock-access-token";
const MOCK_REFRESH = "mock-refresh-token";

type MockProfile = {
  name: string;
  email: string;
  track: string;
  level: string;
  goal: string;
  identity_level: string;
  cert_level: string;
  badges: string[];
};

const buildMockProfile = (name: string, email: string): MockProfile => ({
  name,
  email,
  track: "web",
  level: "zero",
  goal: "first_job",
  identity_level: "verified",
  cert_level: "none",
  badges: ["Verified"],
});

const loadMockProfile = (): MockProfile | null => {
  const raw = localStorage.getItem(MOCK_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MockProfile;
  } catch {
    return null;
  }
};

const saveMockProfile = (profile: MockProfile) => {
  localStorage.setItem(MOCK_PROFILE_KEY, JSON.stringify(profile));
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const authPaths = ["/api/auth/login", "/api/auth/register"];
  const isAuthRequest =
    typeof config.url === "string" && authPaths.includes(config.url);
  const token = localStorage.getItem("token");
  if (token && !isAuthRequest) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type AuthResponse = {
  access: string;
  refresh: string;
  profile?: MockProfile;
};

export const login = async (email: string, password: string) => {
  if (USE_MOCK_AUTH) {
    localStorage.setItem("token", MOCK_TOKEN);
    localStorage.setItem("refresh", MOCK_REFRESH);
    const existing = loadMockProfile();
    saveMockProfile(existing ?? buildMockProfile(email.split("@")[0], email));
    return { access: MOCK_TOKEN, refresh: MOCK_REFRESH };
  }
  const { data } = await api.post<AuthResponse>("/api/auth/login", { email, password });
  localStorage.setItem("token", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
};

export const register = async (name: string, email: string, password: string) => {
  if (USE_MOCK_AUTH) {
    localStorage.setItem("token", MOCK_TOKEN);
    localStorage.setItem("refresh", MOCK_REFRESH);
    saveMockProfile(buildMockProfile(name, email));
    return { access: MOCK_TOKEN, refresh: MOCK_REFRESH };
  }
  const { data } = await api.post<AuthResponse>("/api/auth/register", { name, email, password });
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
  if (USE_MOCK_AUTH) {
    const profile = loadMockProfile();
    if (profile) {
      return profile;
    }
  }
  const { data } = await api.get("/api/profile");
  return data;
};

export const verifyProfile = async (identity_level: "verified" | "eid_mock") => {
  if (USE_MOCK_AUTH) {
    const profile = loadMockProfile() ?? buildMockProfile("Гость", "guest@example.com");
    const badges = new Set(profile.badges);
    if (identity_level === "verified") {
      badges.add("Verified");
    }
    if (identity_level === "eid_mock") {
      badges.add("Verified");
    }
    const updated = { ...profile, identity_level, badges: Array.from(badges) };
    saveMockProfile(updated);
    return updated;
  }
  const { data } = await api.post("/api/profile/verify-mock", { identity_level });
  return data;
};

export const updateProfile = async (payload: {
  track?: string;
  level?: string;
  goal?: string;
}) => {
  if (USE_MOCK_AUTH) {
    const profile = loadMockProfile() ?? buildMockProfile("Гость", "guest@example.com");
    const updated = { ...profile, ...payload };
    saveMockProfile(updated);
    return updated;
  }
  const { data } = await api.patch("/api/profile", payload);
  return data;
};
