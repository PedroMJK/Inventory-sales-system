import { useEffect, useState } from "react"
import { getDashboardStats } from "../api/dashboard"
import type { DashboardStats } from "../types/Dashboard"

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardStats()
        .then(setStats)
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="text-gray-500">Loading dashboard...</p>
    }

    if (!stats) {
        return <p className="text-red-500">Failed to load dashboard</p>
    }
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">
                Dashboard
            </h2>

            <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Total Products</p>
                    <h3 className="text-3xl font-semibold">{stats.totalProducts}</h3>
                </div>
                
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Total Sales</p>
                    <h3 className="text-3xl font-semibold">{stats.totalSales}</h3>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-500">Low Stock</p>
                    <h3 className="text-3xl font-semibold">{stats.lowStock}</h3>
                </div>

            </div>
    
        </div>
    )
}