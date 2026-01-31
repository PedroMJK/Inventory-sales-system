import { useEffect, useState } from "react";
import api from "../api/axios";
import type { DashboardData } from "../types/Dashboard";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      const response = await api.get("/dashboard");
      setData(response.data);
    }

    loadDashboard();
  }, []);

  if (!data) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="p-6 bg-white rounded shadow">
        <p className="text-gray-500">Sales</p>
        <p className="text-2xl font-bold">{data.totalSales}</p>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <p className="text-gray-500">Revenue</p>
        <p className="text-2xl font-bold">
          R$ {data.totalRevenue?.toFixed(2) ?? "0.00"}
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
  );
}
