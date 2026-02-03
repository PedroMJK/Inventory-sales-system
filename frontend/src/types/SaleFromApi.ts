export interface SaleItemFromApi {
    product: {
        _id: string;
        name: string;
    };
    quantity: number;
    price: number;
}

export interface SaleFromApi {
    _id: string;
    client: {
        _id: string;
        name: string;
    };
    items: SaleItemFromApi[];
    total: number;
    createdAt: string;
}