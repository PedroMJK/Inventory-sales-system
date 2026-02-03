export interface SaleItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Sale {
    id: string;
    customerName: string;
    items: SaleItem[];
    total: number;
    createdAt: string;
};