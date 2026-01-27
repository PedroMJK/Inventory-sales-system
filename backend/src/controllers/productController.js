import Product from "../models/Product.js";

//CREATE
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            createdBy: req.user._id
        });

        res.status(201).json({product});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ
export const getProducts = async (req, res) => {
    try {
        const products =  await Product.find().populate("createdBy", "name email");
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}