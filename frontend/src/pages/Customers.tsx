import { useEffect, useState } from "react"
import { getCustomers } from "../services/customerService"
import type { Customer } from "../types/Customer"


import CustomerForm from "../components/customers/CustomerForm"
import CustomerList from "../components/customers/CustomerList"


export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function loadCustomers() {
            const customers = await getCustomers();
            setCustomers(customers);
        }

        loadCustomers();
    }, [reload]);

     return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">
                Customers
            </h2>

            <CustomerForm onCreated={() => setReload(!reload)} />
            <CustomerList customers={customers} />
        </div>
    )
}