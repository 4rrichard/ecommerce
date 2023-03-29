//sk_test_51Mnf1qKtMN1C4Z0pXSt6LQnWsw6yB6v3Xerjp0hj7qtlE0wAZRiHEgRkFGiN7AyGoBeyJHAYYHaQywIOXexvtEZP004zKfIwLG

/* 
White Gold Plated Princess : price_1MnfHgKtMN1C4Z0pV6tohVNf
Solid Gold Petite Micropave : price_1MnfGkKtMN1C4Z0plXENelS8
John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet : price_1MnfG8KtMN1C4Z0piEX1YxEk
Mens Casual Slim Fit : price_1MnfFTKtMN1C4Z0poZ68zusF
Mens Cotton Jacket : price_1MnfEbKtMN1C4Z0po4FWEdvF
Mens Casual Premium Slim Fit T-Shirts : price_1MnfDfKtMN1C4Z0pJXxRBcE5
Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops : price_1MnfBaKtMN1C4Z0phBPeft4f
*/
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Mnf1qKtMN1C4Z0pXSt6LQnWsw6yB6v3Xerjp0hj7qtlE0wAZRiHEgRkFGiN7AyGoBeyJHAYYHaQywIOXexvtEZP004zKfIwLG"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants 
    [
        {
            price: 1,
            quantity : 3
        }
    ]
    */
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
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000!"));
