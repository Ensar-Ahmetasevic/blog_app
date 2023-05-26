import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    // Store it in a database
    const newMassage = {
      email,
      name,
      message,
    };

    // Connectin to the MongoDB

    let client;

    const connectionString = env("DATABASE_URL");

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to the database." });
      return;
    }

    // inserting data

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMassage);
      newMassage.id = result.insertedId;
      // Add an "id" field (newMassage.id) and set this equals to "result.insertedId" to have that automatically
      // generated "id" inserted into that "newMessage" object (after the message was inserted in the database).
    } catch (error) {
      res.status(500).josn({ message: "Storing massage faild!" });
      return;
    }

    res
      .status(201)
      .json({ message: "Successfully stored message", data: newMassage });
  }
}

export default handler;
