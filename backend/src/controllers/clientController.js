import Customer from "../models/Customer.js";

// CREATE
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

// READ ALL
export const getClients = async (req, res) => {
    try {
        const customers = await Customer.find({ createdBy: req.user._id});
        res.json(customers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// UPDATE
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCustomer = await Customer.findOneAndUpdate(
      {_id: id, createdBy: req.user._id},
      req.body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DELETE

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete({
      _id: id,
      createdBy: req.user._id,
    });

    if (!deleteClient) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}