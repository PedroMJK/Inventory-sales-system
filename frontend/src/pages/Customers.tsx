import { useEffect, useMemo, useState } from "react";
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../services/customerService";
import type { Customer } from "../types/Customer";

import CustomerForm from "../components/customers/CustomerForm";
import CustomerList from "../components/customers/CustomerList";

const ITEMS_PER_PAGE = 5;

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error loading customers", error);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, [reload]);

  // 1️⃣ Filter by name
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  // 2️⃣ Pagination
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredCustomers.slice(start, end);
  }, [filteredCustomers, page]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  async function handleSubmit(data: Omit<Customer, "id" | "createdAt">) {
    if (editingCustomer) {
        await updateCustomer(editingCustomer.id, data);
        setEditingCustomer(null);
    } else {
        await createCustomer(data);
    }

    setReload((prev) => !prev);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Do you really want to delete this customer?")) return;

    await deleteCustomer(id);
    setReload((prev) => !prev);
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Customers</h2>

      

      <CustomerForm 
        onSubmit={handleSubmit}
        customer={editingCustomer}
        onCancel={() => setEditingCustomer(null)}
      />

    {/* Search */}
        <input
            type="text"
            placeholder="Search customer by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded"
        />
      {loading ? (
        <p className="text-gray-500">Loading customers...</p>
      ) : (
        <>
          <CustomerList 
            customers={paginatedCustomers} 
            onEdit={setEditingCustomer}
            onDelete={handleDelete}
        />

          

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`px-3 py-1 rounded border text-sm ${
                      page === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
