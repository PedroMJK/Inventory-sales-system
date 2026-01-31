import { useForm } from "react-hook-form";
import { createCustomer } from "../../services/customerService";

interface CustomerFormProps {
    onCreated: () => void;
}

interface CustomerFormData {
    name: string;
    email: string;
    phone?: string;
}

export default function CustomerForm ({ onCreated }: CustomerFormProps) {
    const { register, handleSubmit, reset } = useForm<CustomerFormData>();

    async function onSubmit(data: CustomerFormData) {
        await createCustomer(data);
        reset();
        onCreated();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
                Add customer
            </button>

        </form>
    )
}