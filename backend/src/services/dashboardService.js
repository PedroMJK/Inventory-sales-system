import Product from "../models/Product.js";
import Sale from "../models/Sale.js";

export const getDashboardStatsService = async () => {
    const totalProducts = await Product.countDocuments();

    const totalSales = await Sale.countDocuments();

    const lowStock = await Product.countDocuments({
        stock: { $lte: 5}
    });

    return {
        totalProducts,
        totalSales,
        lowStock
    };
};
