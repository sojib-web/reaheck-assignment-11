// @ts-nocheck

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
  console.log(`inside the logger middleware`, req.method, req.url);
  next();
};

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    req.decoded = decoded;
    next();
  });
};
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

    //  jwt token related API

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "2h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });
      res.send({ success: true });
    });
    // Get all services
    app.get("/services", async (req, res) => {
      const getData = await servicesCollection.find().limit(6).toArray();
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

    app.get("/stats", async (req, res) => {
      try {
        const totalUsers = await usersCollection.estimatedDocumentCount();
        const totalServices = await servicesCollection.estimatedDocumentCount();
        const totalReviews = await reviewsCollection.estimatedDocumentCount();

        res.send({
          user: totalUsers,
          services: totalServices,
          reviews: totalReviews,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        res.status(500).send({ error: "Failed to fetch stats" });
      }
    });

    app.get("/top-rated-services", async (req, res) => {
      try {
        const result = await servicesCollection
          .aggregate([
            {
              $lookup: {
                from: "reviews", // Must match actual collection name
                localField: "_id",
                foreignField: "serviceId",
                as: "reviews",
              },
            },
            {
              $addFields: {
                rating: { $avg: "$reviews.rating" }, // renamed to rating
                totalReviews: { $size: "$reviews" },
              },
            },
            {
              $sort: { rating: -1 },
            },
            {
              $limit: 4,
            },
          ])
          .toArray();

        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch top services" });
      }
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
