import { useEffect, useState } from "react"
import api from "../api/axios";
import type { DashboardData } from "../types/Dashboard";

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get("/dashboard");
                setData(response.data)
            } catch (error) {
                setError("Failed to load dashboard data")
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return <p className="text-gray-500">Loading dashboard...</p>
    }

    if (error) {
         return <p className="text-red-500">{error}</p>;
    }

    if (!data) return null;
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">
                Dashboard
            </h2>

            <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Total Products</p>
                    <h3 className="text-3xl font-semibold">{data.totalProducts}</h3>
                </div>
                
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Total Sales</p>
                    <h3 className="text-3xl font-semibold">{data.totalSales}</h3>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Low Stock</p>
                    <h3 className="text-3xl font-semibold">{data.lowStock}</h3>
                </div>

            </div>
    
        </div>
    )
}