import { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import type { Product } from "../../types/Product";

interface ProductFormData {
  name: string;
  price: number | null;
  stock: number | null;
  category: string;
  description?: string;
}

interface ProductFormProps {
    initialData?: Product;
    onSaved: () => void;
    onCancel: () => void;
}

export default function ProductForm({ 
    initialData,
    onSaved,
    onCancel,
 }: ProductFormProps) {
    const { register, handleSubmit, reset } = useForm<ProductFormData>({
        defaultValues: {
        name: "",
        price: null,
        stock: null,
        category: "",
        description: "",
  },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                price: initialData.price,
                stock: initialData.stock,
                category: initialData.category,
                description: initialData.description,
            });
        } else {
            reset({
                name: "",
                price: null,
                stock: null,
                category: "",
                description: "",
            });
        }
    }, [initialData, reset]);

    const onSubmit = async (data: ProductFormData) => {
        const payload = {
            ...data,
            price: data.price ?? 0,
            stock: data.stock ?? 0,
        }

        if (initialData) {
            await api.put(`/products/${initialData.id}`, payload);
        } else {
            await api.post("/products", payload);
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
                {...register("price", { valueAsNumber: true})}
                type="number"
                placeholder="Price"
                className="w-full border p-2 rounded"
            />

            <input
                {...register("stock",{ valueAsNumber: true })}
                placeholder="Stock"
                className="w-full border p-2 rounded"
            />

            <textarea  
                {...register("description")}
                placeholder="Description"
                className="w-full border p-2 rounded"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    {initialData ? "Update" : "Create"}
                </button>

                {initialData && (
                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            onCancel();
                        }}
                        className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 cursor-pointer"
                    >
                        Cancel
                    </button>
                )}

            </div>

        </form>
    )
}