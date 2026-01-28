import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit } = useForm<LoginForm>();
    const { login } = useAuth();

    const onSubmit = async (data: LoginForm) => {
        const response = await api.post("/auth/login", data);
        login(response.data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} placeholder="Email" />
            <input {...register("password")} type="password" placeholder="Senha" />
            <button type="submit">Entrar</button>
        </form>
    )
}