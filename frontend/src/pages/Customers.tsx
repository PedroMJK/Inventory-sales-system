import { useEffect, useState } from "react"
import api from "../api/axios"
import type { Customer } from "../types/Customer"


import CustomerForm from "../components/customers/CustomerForm"
import CustomerList from "../components/customers/CustomerList"


export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function loadCustomers() {
            const response = await api.get("/customers");
            setCustomers(response.data);
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