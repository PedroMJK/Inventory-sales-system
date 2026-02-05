import Product from "../models/Product.js";
import Sale from "../models/Sale.js";

export const createSaleService = async ({ client, items, userId }) => {
    let total = 0

    // Validate stock availability and calculate order total
    for (const item of items) {
        const product = await Product.findById(item.product);

        if (!product) {
            throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
            throw new Error(
                `Insufficient stock for product: ${product.name}`
            );
        }

        item.price = product.price;
        total += product.price * item.quantity;
    }

    // Persist sale transaction
    const sale = await Sale.create({
        client,
        items,
        total,
        soldBy: userId
    });

    // Decrement product stock based on sale items
    for (const item of items) {
        await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity }
        });
    }

    const populatedSale = await Sale.findById(sale._id)
        .populate("client", "name")
        .populate("soldBy", "name")
        .populate("items.product", "name");

    return populatedSale;
}