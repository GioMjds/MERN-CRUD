import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");
const connectDB = require("./models/models");
const SampleModel = require("./models/SampleModel");
const app = express();

connectDB();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Fetch all samples
app.get("/api/samples", async (req: Request, res: Response) => {
    try {
        const samples = await SampleModel.find();
        res.json(samples);
    } catch (error: any) {
        console.error(`Error fetching data: ${error.message}`);
        res.status(500).json({ error: "Server Error!" });
    }
});

// CRUD Operation

// Create
app.post("/api/add_sample", async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const newSample = new SampleModel({ name, description });
        await newSample.save();
        res.status(201).json(newSample);
    } catch (error: any) {
        console.error(`Error creating data: ${error.message}`);
        res.status(500).json({ error: "Server Error!" });
    }
});

// Read

// Update
app.put("/api/update_sample/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedSample = await SampleModel.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedSample) return res.status(404).json({ error: "Sample not found!" });
        res.json(updatedSample);
    } catch (error: any) {
        console.error(`Error updating data: ${error.message}`);
        res.status(500).json({ error: "Server Error!" });
    }
});

// Delete
app.delete("/api/delete_sample/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedSample = await SampleModel.findByIdAndDelete(id);
        if (!deletedSample) return res.status(404).json({ error: "Sample not found!" });
        res.json({ message: "Sample deleted successfully!" });
    } catch (error: any) {
        console.error(`Error deleting data: ${error.message}`);
        res.status(500).json({ error: "Server Error!" });
    }
});

app.listen(PORT, () => {
  console.log(`Running: ${PORT}`);
});
