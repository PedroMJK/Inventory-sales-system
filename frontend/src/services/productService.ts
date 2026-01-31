import type { Product } from './../types/Product';
import api from "../api/axios";

interface ProductFromApi {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    description?: string;
}

export async function getProducts(): Promise<Product[]> {
    const res = await api.get("/products");

    return res.data.map((p: ProductFromApi) => ({
        id: p._id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        category: p.category,
        description: p.description,
    }));
}