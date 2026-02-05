import { useEffect, useMemo, useState } from "react";
import type { Sale } from "../types/Sale";

import { getSales } from "../services/salesService";

import SaleForm from "../components/sales/SaleForm";
import SaleList from "../components/sales/SaleList";

const ITEMS_PER_PAGE = 5;

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [page, setPage] = useState(1)

  useEffect(() => {
    async function loadSales() {
      try {
        setLoading(true);
        const data = await getSales();
        setSales(data);
      } finally {
        setLoading(false);
      }
    }

    loadSales();
  }, [reload]);

  const totalPages = Math.ceil(sales.length / ITEMS_PER_PAGE);

  const paginatedSales = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sales.slice(start, end);
  }, [sales, page]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold">Sales</h2>

      <SaleForm onCreated={() => setReload((prev) => !prev)} />

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          <div className="h-20 bg-gray-100 rounded animate-pulse" />
          <div className="h-20 bg-gray-100 rounded animate-pulse" />
        </div>
      )}

      {/* Empty state */}
      {!loading && sales.length === 0 && (
        <div className="text-center py-8 border rounded-lg bg-gray-50">
          <p className="text-gray-700 font-medium">
            No sales yet
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Create your first sale using the form above.
          </p>
        </div>
      )}

      {/* List */}
      {!loading && sales.length > 0 && (
        <>
            <SaleList sales={paginatedSales} />

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
                                        ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                        : "bg-white hover:bg-gray-100 cursor-pointer"
                                }`}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}
                </div>
            )}
        </>
      )}
    </div>
  );
}
