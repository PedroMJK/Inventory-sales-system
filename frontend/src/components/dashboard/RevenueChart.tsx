import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { RevenueByMonth } from "../../types/RevenueByMonth"

interface Props {
    data: RevenueByMonth[];
}

export default function RevenueChart({ data }: Props) {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">
                Revenue by Month ( Current Year)
            </h3>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line dataKey="revenue" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}