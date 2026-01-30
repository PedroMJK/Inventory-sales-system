import { useEffect } from "react";
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
    initialData?: Product;
    onSaved: () => void;
}

export default function ProductForm({ 
    initialData,
    onSaved,
 }: ProductFormProps) {
    const { register, handleSubmit, reset } = useForm<ProductFormData>();

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                price: initialData.price,
                stock: initialData.stock,
                category: initialData.category,
                description: initialData.description,
            });
        }
    }, [initialData, reset]);

    const onSubmit = async (data: ProductFormData) => {
        if (initialData) {
            await api.put(`/products/${initialData._id}`, data);
        } else {
            await api.post("/products", data);
        }

        reset();
        onSaved();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-4 rounded shadow mb-6 space-y-4"
        >
            <h3 className="text-lg font-semibold">{initialData ? "Edit Product" : "New Product"}</h3>

            <input
                {...register("name")}
                placeholder="Name"
                className="w-full border p-2 rounded"
            />

            <input
                {...register("category")}
                placeholder="Category"
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
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
                {initialData ? "Update" : "Create"}
            </button>
        </form>
    )
}