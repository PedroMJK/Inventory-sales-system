import { useEffect, useState } from "react"
import { getCustomers } from "../services/customerService"
import type { Customer } from "../types/Customer"


import CustomerForm from "../components/customers/CustomerForm"
import CustomerList from "../components/customers/CustomerList"


export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function loadCustomers() {
            try {
                setLoading(true);
                const customers = await getCustomers();
                setCustomers(customers);
            } catch (error) {
                console.error("Error loading customers", error);
            } finally {
                setLoading(false);
            }
        }

        loadCustomers();
    }, [reload]);

     return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">
                Customers
            </h2>

            <CustomerForm onCreated={() => setReload((prev) => !prev)} />
                {loading ? (
                    <p className="text-gray-500">Loading customers...</p>
                ) : (
                    <CustomerList customers={customers} />
                )}
        </div>
    )
}