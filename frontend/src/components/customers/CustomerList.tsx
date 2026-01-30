import type { Customer } from "../../types/Customer";

interface CustomerListProps {
    customers: Customer[];
}

export default function CustomerList({ customers}: CustomerListProps) {
    return (
        <ul>
            {customers.map((customer) => (
                <li
                    key={customer._id}
                    className="border p-3 rounded flex flex-col"
                >
                    <strong>{customer.name}</strong>
                    <span>{customer.email}</span>
                    {customer.phone && <span>{customer.phone}</span>}
                </li>
            ))}
        </ul>
    )
}