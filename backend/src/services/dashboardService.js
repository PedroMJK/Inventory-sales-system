import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import Customer from "../models/Customer.js";

export const getDashboardStatsService = async () => {
  const totalProducts = await Product.countDocuments();

  const totalSales = await Sale.countDocuments();

  const totalCustomers = await Customer.countDocuments();

  const sales = await Sale.find();

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const lowStock = await Product.countDocuments({
    stock: { $lte: 5 }
  });

  return {
    totalProducts,
    totalSales,
    totalCustomers,
    totalRevenue,
    lowStock,
  };
};
