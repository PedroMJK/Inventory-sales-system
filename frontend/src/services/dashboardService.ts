import api from "../api/axios";
import type { RevenueByMonth } from "../types/RevenueByMonth";

export async function getRevenueByMonth(): Promise<RevenueByMonth[]> {
    const response = await api.get("/dashboard/revenue-by-month");
    return response.data;
}