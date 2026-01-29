import { useEffect, useState } from "react";
import api from "../../api/axios";
import type { Product } from "../../types/Product";

interface ProductListProps {
  reload: boolean;
}


export default function ProductList({ reload }: ProductListProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts()  {
            try {
                const response = await api.get<Product[]>("/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error loading products", error);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [reload]);

    if (loading) {
        return <p>Loading products...</p>
    }


    return (
    <div className="bg-white rounded shadow">
      <table className="w-full text-left">
        <thead className="border-b">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Estoque</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">R$ {product.price}</td>
              <td className="p-3">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}