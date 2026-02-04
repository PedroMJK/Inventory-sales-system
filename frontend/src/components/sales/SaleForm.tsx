import { useEffect, useState } from "react";
import api from "../../api/axios";
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

  function updateItem(index: number, field: keyof SaleItemForm, value: any) {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Customer */}
      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="w-full border p-2 rounded"
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
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <select
            value={item.productId}
            onChange={(e) =>
              updateItem(index, "productId", e.target.value)
            }
            className="flex-1 border p-2 rounded"
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
            className="w-24 border p-2 rounded"
          />

          {items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-600 font-bold text-lg cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center pt-4 border-t">
        <button
            type="button"
            onClick={addItem}
            className="text-base text-blue-600 cursor-pointer "
        >
            + Add product
        </button>

        <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 rounded disabled:opacity-50 cursor-pointer"
        >
            {loading ? "Creating..." : "Create sale"}
        </button>
      </div>
    </form>
  );
}
