import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../services/productService";
import { createSale } from "../../services/salesService";
import { getCustomers } from "../../services/customerService";

import type { Customer } from "../../types/Customer";
import type { Product } from "../../types/Product";

interface SaleItemForm {
  productId: string;
  quantity: number;
}

interface SaleFormProps {
  onCreated: () => void;
}

export default function SaleForm({ onCreated }: SaleFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState<SaleItemForm[]>([
    { productId: "", quantity: 1 },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [customersRes, productsRes] = await Promise.all([
        getCustomers(),
        getProducts(),
      ]);

      setCustomers(customersRes);
      setProducts(productsRes);
    }

    loadData();
  }, []);

  function updateItem(
    index: number,
    field: keyof SaleItemForm,
    value: any
  ) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { productId: "", quantity: 1 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const itemsWithPrice = useMemo(() => {
    return items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const price = product?.price ?? 0;
      const subtotal = price * item.quantity;

      return { ...item, price, subtotal };
    });
  }, [items, products]);

  const total = useMemo(() => {
    return itemsWithPrice.reduce((sum, item) => sum + item.subtotal, 0);
  }, [itemsWithPrice]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!customerId || items.some((i) => !i.productId || i.quantity <= 0)) {
      return;
    }

    try {
      setLoading(true);

      await createSale({
        customerId,
        items,
      });

      resetForm();
      onCreated();
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setCustomerId("");
    setItems([{ productId: "", quantity: 1 }]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-5 rounded-lg border">
      {/* Customer */}
      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="w-full border p-2 rounded cursor-pointer"
        required
      >
        <option value="">Select customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Items */}
      {itemsWithPrice.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-center">
          <select
            value={item.productId}
            onChange={(e) =>
              updateItem(index, "productId", e.target.value)
            }
            className="col-span-5 border p-2 rounded cursor-pointer"
            required
          >
            <option value="">Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) =>
              updateItem(index, "quantity", Number(e.target.value))
            }
            className="col-span-2 border p-2 rounded text-center"
          />

          <div className="col-span-2 text-sm text-gray-600 text-right">
            ${item.price.toFixed(2)}
          </div>

          <div className="col-span-2 font-medium text-right">
            ${item.subtotal.toFixed(2)}
          </div>

          {items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="col-span-1 text-red-600 font-bold cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      ))}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t">
        <button
          type="button"
          onClick={addItem}
          className="text-blue-600 text-sm cursor-pointer"
        >
          + Add product
        </button>

        <div className="text-right">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-xl font-bold text-green-600">
            ${total.toFixed(2)}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || total === 0}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Creating sale..." : "Create sale"}
      </button>
    </form>
  );
}
