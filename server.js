import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Car Dealership API is running." });
});

/*
  INVENTORY ENDPOINT
  Returns a clean list of cars a dealership might carry.
  You can later swap in real DB or API data.
*/
app.get("/inventory", (req, res) => {
  const inventory = [
    { id: 1, make: "BMW", model: "M5 Competition", year: 2023, price: 88900 },
    { id: 2, make: "Mercedes", model: "AMG GT63", year: 2022, price: 102500 },
    { id: 3, make: "Porsche", model: "911 Turbo S", year: 2021, price: 198000 },
    { id: 4, make: "Audi", model: "RS7", year: 2023, price: 119000 },
    { id: 5, make: "Dodge", model: "Durango Hellcat", year: 2023, price: 98500 }
  ];

  res.json({ inventory });
});

/*
  SERVICE HOURS
*/
app.get("/service-hours", (req, res) => {
  res.json({
    weekdays: "8 AM to 6 PM",
    saturday: "9 AM to 4 PM",
    sunday: "Closed"
  });
});

/*
  SCHEDULE TEST DRIVE
  BlackBox/Dasha can POST user info here.
*/
app.post("/schedule-test-drive", (req, res) => {
  const { name, phone, car } = req.body;

  if (!name || !phone || !car) {
    return res.json({ error: "Missing name, phone, or car selection." });
  }

  res.json({
    message: `Test drive scheduled.`,
    appointment: { name, phone, car }
  });
});

/*
  FINANCING ESTIMATOR
*/
app.post("/financing", (req, res) => {
  const { price, downPayment } = req.body;

  if (!price || !downPayment)
    return res.json({ error: "Missing price or down payment." });

  const amountFinanced = price - downPayment;
  const monthly = ((amountFinanced * 0.06) / 12).toFixed(2); // simple mock calculation

  res.json({
    amountFinanced,
    estimatedMonthlyPayment: monthly
  });
});

/*
  TRADE-IN VALUE
*/
app.post("/trade-in", (req, res) => {
  const { make, model, year, condition } = req.body;

  if (!make || !model || !year)
    return res.json({ error: "Missing required fields." });

  const base = 25000 - (2025 - year) * 1000;

  const multiplier = condition === "excellent" ? 1.2 : condition === "fair" ? 0.8 : 1;

  const value = Math.max(2000, base * multiplier);

  res.json({
    estimatedTradeIn: Math.round(value)
  });
});

/*
  DEALERSHIP INFO
*/
app.get("/dealership-info", (req, res) => {
  res.json({
    name: "Luxen Automotive",
    address: "1234 Highway 59, Houston TX",
    phone: "(832) 555-0199",
    hours: {
      weekday: "9 AM to 8 PM",
      saturday: "9 AM to 6 PM",
      sunday: "Closed"
    }
  });
});

// Port for local dev + Vercel support
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Car dealership API running on ${port}`));
