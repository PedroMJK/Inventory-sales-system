import type { Customer } from "../../types/Customer";

interface CustomerListProps {
  customers: Customer[];
}

export default function CustomerList({ customers }: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No customers found.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {customers.map((customer) => (
        <li
          key={customer.id}
          className="border p-4 rounded-lg bg-white shadow-sm"
        >
          <div className="font-semibold text-gray-800">
            {customer.name}
          </div>

          <div className="text-sm text-gray-600">
            {customer.email}
          </div>

          {customer.phone && (
            <div className="text-sm text-gray-500">
              {customer.phone}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}