// @ts-nocheck
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f3o1onw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB Atlas successfully!");

    const servicesCollection = client.db("serviceDB").collection("services");
    const usersCollection = client.db("serviceDB").collection("users");
    const reviewsCollection = client.db("serviceDB").collection("reviews"); // <-- Added this

    // Get all services
    app.get("/services", async (req, res) => {
      const getData = await servicesCollection.find().toArray();
      res.send(getData);
    });

    app.get("/reviews", async (req, res) => {
      const getData = await reviewsCollection.find().toArray();
      res.send(getData);
    });

    // Add new service
    app.post("/services", async (req, res) => {
      const servicesData = req.body;
      const result = await servicesCollection.insertOne(servicesData);
      res.send(result);
    });

    // Get single service by id
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const service = await servicesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(service);
    });

    // Update service by id
    app.put("/services/:id", async (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;

      try {
        const result = await servicesCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );
        res.send(result);
      } catch (error) {
        console.error("Update failed:", error);
        res.status(500).send({ error: "Failed to update service" });
      }
    });

    // Delete service by id
    app.delete("/services/:id", async (req, res) => {
      const { id } = req.params;
      const result = await servicesCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Add new user
    app.post("/users", async (req, res) => {
      const { uid, name, photoURL } = req.body;

      if (!uid || !name) {
        return res.status(400).json({ message: "uid and name are required" });
      }

      // Check if user already exists
      const existingUser = await usersCollection.findOne({ uid });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const newUser = {
        uid,
        name,
        photoURL: photoURL || null,
        createdAt: new Date(),
      };

      const result = await usersCollection.insertOne(newUser);

      res.status(201).json({
        message: "User added successfully",
        id: result.insertedId,
      });
    });

    // Get all users
    app.get("/users", async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // Get reviews for a service (filtered by serviceId)
    app.get("/reviews", async (req, res) => {
      const serviceId = req.query.serviceId;
      if (!serviceId)
        return res.status(400).send({ message: "serviceId query missing" });

      const reviews = await reviewsCollection.find({ serviceId }).toArray();
      res.send(reviews);
    });

    // Add a new review
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      if (
        !review.serviceId ||
        !review.name ||
        review.rating === undefined || // allow 0 rating if needed
        !review.comment
      ) {
        return res
          .status(400)
          .send({ message: "Missing required review fields" });
      }
      review.createdAt = new Date();

      const result = await reviewsCollection.insertOne(review);
      if (result.acknowledged) {
        review._id = result.insertedId; // assign MongoDB _id to review object
        res.status(201).json(review); // send back full review object
      } else {
        res.status(500).send({ message: "Failed to add review" });
      }
    });

    // DELETE a review
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const result = await reviewsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.patch("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const { text, rating } = req.body;

      const result = await reviewsCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            text,
            rating,
          },
        }
      );
      res.send(result);
    });
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

run();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
