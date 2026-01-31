import type { Sale } from "../../types/Sale"

interface SaleListProps {
    sales: Sale[];
}

export default function SaleList({ sales }: SaleListProps) {
  return (
    <ul className="space-y-3">
        {sales.map((sale) => (
            <li key={sale.id} className="border p-4 rounded">
                <div className="font-semibold">
                    Total: ${sale.total.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                    Items: {sale.items.length}
                </div>
            </li>
        ))}
    </ul>
  )
}

