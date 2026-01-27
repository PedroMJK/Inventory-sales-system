import Client from "../models/Client.js";


export const createClient = async (req, res) => {
  try {
    const client = await Client.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClients = async (req, res) => {
    try {
        const clients = Client.find();
        res.json(clients)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};