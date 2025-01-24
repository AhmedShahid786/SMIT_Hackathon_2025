//? Import modules
import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/connectDB.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  })
  .catch((err) => console.log("\n \n Error in MongoDB connection.", err));

app.get("/", (req, res) => res.send(`App is running on port ${PORT}...`));
