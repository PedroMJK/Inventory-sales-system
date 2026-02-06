import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export default function Register() {
    const { register, handleSubmit } = useForm<RegisterForm>();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterForm) => {
        await api.post("/auth/register", data);
        navigate("/login");
    };

    return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create Account
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700
                        mb-1">
                            Name
                        </label>
                        <input 
                            {...register("name")}
                            type="text" 
                            placeholder="Your name" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />
                    </div>

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
                        Create Account
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>

    </>
    )
}