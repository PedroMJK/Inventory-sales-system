import Sale from "../models/Sale.js";

export const salesSumary = async (req, res) => {
    try {
        const totalSales = await Sale.countDocuments();
        const revenue = await Sale.aggregate([
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);

        res.json({
            totalSales,
            revenue: revenue[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}