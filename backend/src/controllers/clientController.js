import Customer from "../models/Customer.js";


export const createClient = async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClients = async (req, res) => {
    try {
        const customers = Customer.find();
        res.json(customers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};