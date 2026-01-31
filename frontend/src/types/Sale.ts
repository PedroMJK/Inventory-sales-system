export interface SaleItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Sale {
    id: string;
    customerId: string;
    items: SaleItem[];
    total: number;
    createdAt: string;
};