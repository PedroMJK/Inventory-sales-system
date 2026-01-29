import { useForm } from "react-hook-form";
import api from "../../api/axios";
import type { Product } from "../../types/Product";

interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

interface ProductFormProps {
    onCreated: (product: Product) => void;
}

export default function ProductForm({ onCreated }: ProductFormProps) {
    const { register, handleSubmit, reset } = useForm<ProductFormData>();

    const onSubmit = async (data: ProductFormData) => {
        const response = await api.post<Product>("/products", data);
        onCreated(response.data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-4 rounded shadow mb-6 space-y-4"
        >
            <h2 className="text-lg font-semibold">New Product</h2>

            <input
                {...register("name")}
                placeholder="Name"
                className="w-full border p-2 rounded"
            />

            <input
                {...register("price")}
                type="number"
                placeholder="Price"
                className="w-full border p-2 rounded"
            />

            <input
                {...register("stock")}
                placeholder="Stock"
                className="w-full border p-2 rounded"
            />

            <textarea  
                {...register("description")}
                placeholder="Description"
                className="w-full border p-2 rounded"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Salve
            </button>
        </form>
    )
}