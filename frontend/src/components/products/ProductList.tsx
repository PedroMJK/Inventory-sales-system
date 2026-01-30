import api from "../../api/axios";
import type { Product } from "../../types/Product";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDeleted: () => void;
}

export default function ProductList({ 
  products,
  onEdit,
  onDeleted,
}: ProductListProps) {
    const handleDelete = async (id: string) => {
      if (!confirm("Are you sure you want to delete this product?")) return;

      await api.delete(`/products/${id}`);
      onDeleted();
    }

    return (
       <table className="w-full border border-gray-200 bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

         <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="p-2">{product.name}</td>
              <td className="p-2 text-center">{product.category}</td>
              <td className="p-2 text-center">
                R$ {product.price.toFixed(2)}
              </td>
              <td className="p-2 text-center">{product.stock}</td>
              <td className="p-2 text-center space-x-2">

                <button 
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}