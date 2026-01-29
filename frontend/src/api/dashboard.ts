import api from "./axios";
import type { DashboardStats } from "../types/Dashboard";

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get("/dashboard");
    return response.data;
}