import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit } = useForm<LoginForm>();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        const response = await api.post("/auth/login", data);
        login(response.data);

        navigate("/");
    };

    return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    System Access
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700
                        mb-1">
                            Email
                        </label>
                        <input 
                            {...register("email")}
                            type="email" 
                            placeholder="Email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                    <input 
                        {...register("password")} 
                        type="password" 
                        placeholder="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                    focus:border-blue-500"
                    />
                    </div>

                    <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md
                                       hover:bg-blue-700 hover:cursor-pointer transition font-semibold"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>

    </>
    )
}