import { useEffect, useState } from "react"
import api from "../api/axios"
import type { Product } from "../types/Product"


export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error loading products")
            } finally {
                setLoading(false);
            }
        }

        loadProducts();

    }, []);

    if (loading) {
        return <p>Loading products...</p>
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Products
            </h1>

            <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Name</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2 text-center">{product.category}</td>
                            <td className="border p-2 text-center">
                              R$ {product.price.toFixed(2)}
                            </td>
                            <td className="border p-2 text-center">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}