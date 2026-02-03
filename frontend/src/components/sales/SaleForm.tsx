import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getProducts } from "../../services/productService";
import { createSale } from "../../services/salesService";

import type { Customer } from "../../types/Customer";
import type { Product } from "../../types/Product";

interface SaleFormProps {
    onCreated: () => void;
}

export default function SaleForm({ onCreated }: SaleFormProps) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function loadData() {
            const customersRes = await api.get("/customers");
            const products = await getProducts();

            setCustomers(customersRes.data);
            setProducts(products);
        }

        loadData();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createSale({
            customerId,
            items: [
                {
                    productId,
                    quantity,
                },
            ],
        });

        setCustomerId("");
        setProductId("");
        setQuantity(1);
        onCreated();
    }

    return (
        <form 
            onSubmit={handleSubmit} className="space-y-4">
                <select 
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Selecet customer</option>
                    {customers.map((c) => (
                        <option  key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select 
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select product</option>
                    {products.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <input 
                    type="number" 
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                    Create sale
                </button>
        </form>
    )
}