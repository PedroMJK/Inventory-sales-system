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
    <>
      {/*  MOBILE – CARD LIST */}
      <div className="space-y-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded shadow p-4 space-y-2"
          >
            <div className="flex justify-between text-sm">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{product.name}</p>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Category</span>
              <span>{product.category}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price</span>
              <span>$ {product.price.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stock</span>
              <span>{product.stock}</span>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => onEdit(product)}
                className="text-blue-600 hover:underline text-sm cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:underline text-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== */}
      {/* 💻 DESKTOP – TABLE */}
      {/* ===================== */}
      <div className="hidden md:block overflow-x-auto">
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
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.name}</td>
                <td className="p-2 text-center">{product.category}</td>
                <td className="p-2 text-center">
                  $ {product.price.toFixed(2)}
                </td>
                <td className="p-2 text-center">{product.stock}</td>
                <td className="p-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}