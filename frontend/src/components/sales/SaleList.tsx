import type { Sale } from "../../types/Sale";

interface SaleListProps {
  sales: Sale[];
}

export default function SaleList({ sales }: SaleListProps) {
  return (
    <ul className="space-y-4">
      {sales.map((sale) => (
        <li
          key={sale.id}
          className="bg-white border rounded-lg p-4 shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-semibold text-gray-800">
                {sale.customerName}
              </h3>
              <span className="text-xs text-gray-500">
                {new Date(sale.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="text-lg font-bold text-green-600">
              ${sale.total.toFixed(2)}
            </div>
          </div>

          {/* Items */}
          <ul className="text-sm text-gray-700 space-y-1">
            {sale.items.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between"
              >
                <span>
                  {item.productName} × {item.quantity}
                </span>
                <span className="text-gray-500">
                  ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
