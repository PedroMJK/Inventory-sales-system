import { getDashboardStatsService } from "../services/dashboardService.js";

export const getDashboardStats  = async (req, res) => {
    try {
        const stats = await getDashboardStatsService();
        return res.json(stats);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load dashboard statistics"
        })
    }
}