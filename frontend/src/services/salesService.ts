import api from "../api/axios";
import type { Sale } from "../types/Sale";

export async function getSales(): Promise<Sale[]> {
    const response = await api.get("/sales");
    return response.data;   
}

interface CreateSaleDTO {
    customerId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
}

export async function createSale(data: CreateSaleDTO) {
    const response = await api.post("/sales", data);
    return response.data;
}