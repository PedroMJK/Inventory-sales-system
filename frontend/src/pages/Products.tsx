import { useState } from "react";
import ProductForm from "../components/products/ProductForm";
import ProductList from "../components/products/ProductList";

export default function Products() {
    const [reload, setReload] = useState(false);

    function handleProductCreated() {
        setReload(prev => !prev)
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Products</h2>

            <ProductForm onCreated={handleProductCreated} />
            <ProductList reload={reload} />
        </div>
    )
}
//  git commit -m "refactor(products): extract product list and form into dedicated components" 