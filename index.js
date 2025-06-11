require("dotenv").config(); // Make sure this is at the top!

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Use environment variables here
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

    app.get("/services", async (req, res) => {
      const getData = await servicesCollection.find().limit(6).toArray();
      res.send(getData);
    });

    app.post("/services", async (req, res) => {
      const servicesData = req.body;
      // console.log(servicesData);
      const result = await servicesCollection.insertOne(servicesData);
      res.send(result);
    });
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    // await client.close();
  }
}

run();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
