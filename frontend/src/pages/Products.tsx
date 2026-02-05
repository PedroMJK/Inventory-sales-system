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

        const mappedProducts = response.data.map((p: any) => ({
            id: p._id,
            name: p.name,
            price: p.price,
            stock: p.stock,
            category: p.category,
            description: p.description,  
        }))

        setProducts(mappedProducts);
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
                onCancel={() => setSelectedProduct(undefined)}
             />
            <ProductList
                products={products}
                onEdit={setSelectedProduct}
                onDeleted={loadProducts}
            />
        </div>
    )
} 