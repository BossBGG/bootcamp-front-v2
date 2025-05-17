import { useContext } from "react";
import { AuthStore } from "../stores/auth.store";
import api from "../services/api";

export const useAuth = () => {
  const context = useContext(AuthStore);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export interface LoginPayload {
  studentId: string;
  password: string;
}

export const loginApi = async ({ studentId, password }: LoginPayload) => {
  console.log('Login API called with:', { studentId, password });
  const response = await api.post('/api/auth/login', { studentId, password });
  return response.data;
};