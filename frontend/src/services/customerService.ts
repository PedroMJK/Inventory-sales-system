import api from "../api/axios";
import type { Customer } from "../types/Customer";

interface CustomerFromApi {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

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

export async function createCustomer(data: {
    name: string;
    email: string;
    phone?: string;
}) {
    await api.post("/clients", data);
}