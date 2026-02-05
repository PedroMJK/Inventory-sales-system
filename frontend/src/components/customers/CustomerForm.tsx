import { useForm } from "react-hook-form";
import type { Customer } from "../../types/Customer";
import { useEffect } from "react";

interface CustomerFormProps {
    onSubmit: (data: Omit<Customer, "id" | "createdAt">) => void;
    customer?: Customer | null;
    onCancel?: () => void;
}

interface CustomerFormData {
    name: string;
    email: string;
    phone?: string;
}

export default function CustomerForm ({ 
    onSubmit,
    customer,
    onCancel, 
}: CustomerFormProps) {
    const { register, handleSubmit, reset } = useForm<CustomerFormData>();

   useEffect(() => {
    if (customer) {
        reset({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
        });
    } else {
        reset({ name: "", email: "", phone: "" });
    }
   }, [customer, reset]);

   async function handleFormSubmit(data: CustomerFormData) {
    await onSubmit(data);
    if (!customer) reset();
   }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <input 
                {...register("name")}
                placeholder="Customer name"
                className="w-full border p-2 rounded"
                required
            />

            <input 
                {...register("email")}
                placeholder="Email"
                type="email"
                className="w-full border p-2 rounded"
                required
            />

            <input 
                {...register("phone")}
                placeholder="Phone"
                className="w-full border p-2 rounded"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    {customer ? "Update customer" : "Add customer"}
                </button>

                {customer && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-red-600 text-white border px-4 py-2 rounded cursor-pointer hover:bg-red-700"
                    >
                        Cancel
                    </button>
                )}
            </div>


        </form>
    )
}