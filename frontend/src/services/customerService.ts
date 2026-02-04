import api from "../api/axios";
import type { Customer } from "../types/Customer";

interface CustomerFromApi {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

//  GET ALL
export async function getCustomers(): Promise<Customer[]> {
    const res = await api.get("/clients");

    return res.data.map((c: CustomerFromApi) => ({
        id: c._id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        createdAt: c.createdAt,       
    }));
}

// CREATE
export async function createCustomer(data: {
    name: string;
    email: string;
    phone?: string;
}) {
    await api.post("/clients", data);
}

// UPDATE
export async function updateCustomer(
    id: string,
    data: {
        name: string,
        email: string,
        phone?: string,
    }
) {
    await api.put(`/clients/${id}`, data)
}

// DELETE
export async function deleteCustomer(id: string) {
    await api.delete(`/clients/${id}`);
}
