//sk_test_51Mnf1qKtMN1C4Z0pXSt6LQnWsw6yB6v3Xerjp0hj7qtlE0wAZRiHEgRkFGiN7AyGoBeyJHAYYHaQywIOXexvtEZP004zKfIwLG

/* 
White Gold Plated Princess : price_1MnfHgKtMN1C4Z0pV6tohVNf
Solid Gold Petite Micropave : price_1MnfGkKtMN1C4Z0plXENelS8
John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet : price_1MnfG8KtMN1C4Z0piEX1YxEk
Mens Casual Slim Fit : price_1MsmzsKtMN1C4Z0pF4sq7Qud
Mens Cotton Jacket : price_1MsmzCKtMN1C4Z0ptGeqcjuS
Mens Casual Premium Slim Fit T-Shirts : price_1Msn27KtMN1C4Z0pAOziB5AK
Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops : price_1MsmyMKtMN1C4Z0pR8kmRWHF
*/
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51Mnf1qKtMN1C4Z0pXSt6LQnWsw6yB6v3Xerjp0hj7qtlE0wAZRiHEgRkFGiN7AyGoBeyJHAYYHaQywIOXexvtEZP004zKfIwLG"
);

const app = express();
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://ecommerce-rr.netlify.app"],
  })
);
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "https://ecommerce-rr.netlify.app/success",
    cancel_url: "https://ecommerce-rr.netlify.app/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
      id: session.id,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000!"));
