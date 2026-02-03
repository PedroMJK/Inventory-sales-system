import api from "../api/axios";

import type { Sale } from "../types/Sale";
import type { SaleFromApi } from "../types/SaleFromApi";

export async function getSales(): Promise<Sale[]> {
    const response = await api.get<SaleFromApi[]>("/sales");

    return response.data.map((sale) => ({
        id: sale._id,
        customerName: sale.client.name,
        total: sale.total,
        createdAt: sale.createdAt,
        items: sale.items.map((item) => ({
            productId: item.product._id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.price,
        })),
    }))
}

interface CreateSaleDTO {
    customerId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
}

export async function createSale(data: CreateSaleDTO) {
    return api.post("/sales", {
        client: data.customerId,
        items: data.items.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
        }))
    })
}