import type { Customer } from "../../types/Customer";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export default function CustomerList({ 
    customers,
    onEdit,
    onDelete,
}: CustomerListProps) {
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
          className="border p-4 rounded-lg bg-white shadow-sm flex justify-between"
        >
            <div>
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
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(customer)}
                    className="text-blue-600 text-sm cursor-pointer hover:underline"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(customer.id)}
                    className="text-red-600 text-sm cursor-pointer hover:underline"
                >
                    Delete
                </button>
            </div>
        </li>
      ))}
    </ul>
  );
}