import { useEffect, useState } from "react"
import api from "../api/axios"
import type { Sale } from "../types/Sale"

import SaleForm from "../components/sales/SaleForm"
import SaleList from "../components/sales/SaleList"

export default function Sales() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function loadSales() {
            const response = await api.get("/sales");
            setSales(response.data);
        }

        loadSales();
    }, [reload]);


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
                Sales
            </h2>

            <SaleForm onCreated={() => setReload(!reload)} />
            <SaleList sales={sales} />
        </div>
    )
}