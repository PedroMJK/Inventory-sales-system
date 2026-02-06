import { useEffect, useState } from "react";
import api from "../api/axios";

import type { DashboardData } from "../types/Dashboard";
import type { RevenueByMonth } from "../types/RevenueByMonth";

import { getRevenueByMonth } from "../services/dashboardService";
import RevenueChart from "../components/dashboard/RevenueChart";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [revenue, setRevenue] = useState<RevenueByMonth[]>([])

  useEffect(() => {
    api.get("/dashboard").then(res => setData(res.data));
    getRevenueByMonth().then(setRevenue);
  }, []);

  if (!data) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="p-6 bg-white rounded shadow">
        <p className="text-gray-500">Sales</p>
        <p className="text-2xl font-bold">{data.totalSales}</p>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <p className="text-gray-500">Revenue</p>
        <p className="sm:text-2xl text-base font-bold truncate">
          $ {data.totalRevenue?.toFixed(2) ?? "0.00"}
        </p>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <p className="text-gray-500">Products</p>
        <p className="text-2xl font-bold">{data.totalProducts}</p>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <p className="text-gray-500">Customers</p>
        <p className="text-2xl font-bold">{data.totalCustomers}</p>
      </div>

    </div>

    <div className="grid grid-cols-1 mt-6">
        <RevenueChart data={revenue} />

    </div>
    </>
  );
}
