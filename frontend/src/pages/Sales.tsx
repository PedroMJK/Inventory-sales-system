import { useEffect, useState } from "react"
import type { Sale } from "../types/Sale"

import { getSales } from "../services/salesService"

import SaleForm from "../components/sales/SaleForm"
import SaleList from "../components/sales/SaleList"

export default function Sales() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function loadSales() {
            const data = await getSales()
            setSales(data)
        }

        loadSales();
    }, [reload]);


    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-semibold">
                Sales
            </h2>

            <SaleForm onCreated={() => setReload(!reload)} />
            <SaleList sales={sales} />
        </div>
    )
}