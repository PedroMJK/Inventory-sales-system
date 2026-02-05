import { getDashboardStatsService } from "../services/dashboardService.js";
import Sale from "../models/Sale.js";

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

// monthly revenue (current year)
export const getRevenueByMonth = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const revenue = await Sale.aggregate ([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt"},
                    revenue: { $sum: "$total" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"   
        ];

        const formatted = months.map((month, index) => {
            const found =  revenue.find(r => r._id === index + 1);
            return {
                month,
                revenue: found ? found.revenue : 0
            };
        });

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}