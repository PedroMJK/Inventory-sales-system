import api from "./axios";
import type { DashboardData  } from "../types/Dashboard";

export const getDashboardStats = async (): Promise<DashboardData > => {
    const response = await api.get("/dashboard");
    return response.data;
}