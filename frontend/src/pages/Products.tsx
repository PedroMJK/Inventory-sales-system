import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Product } from "../types/Product";
import ProductForm from "../components/products/ProductForm";
import ProductList from "../components/products/ProductList";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

    const loadProducts = async () =>  {
        const response = await api.get("/products");
        setProducts(response.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Products</h2>

            <ProductForm 
                initialData={selectedProduct}
                onSaved={() => {
                    setSelectedProduct(undefined);
                    loadProducts();
                }}
             />
            <ProductList
                products={products}
                onEdit={setSelectedProduct}
                onDeleted={loadProducts}
            />
        </div>
    )
}
//   