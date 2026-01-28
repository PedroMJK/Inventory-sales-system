export interface SaleItem {
    product: string;
    quantity: number;
}

export interface Sale {
    client: string;
    items: SaleItem[];
};