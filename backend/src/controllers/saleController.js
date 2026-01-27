import { createSaleService } from "../services/saleService.js";
import Sale from "../models/Sale.js";

export const createSale = async (req, res) => {
    try {
        const sale = await createSaleService({
            client: req.body.client,
            items: req.body.items,
            userId: req.user._id
        });

        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSales = async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate("client", "name")
            .populate("soldBy", "name")
            .populate("items.product", "name");

        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};