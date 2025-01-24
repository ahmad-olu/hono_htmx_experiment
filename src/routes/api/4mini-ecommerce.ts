import { Hono } from "hono";
import { pbDb } from "../../lib/db/pocketBase";
import { BaseProduct } from "../../lib/model/4commerce/product";
import axios from "axios";
import { PAY_STACK_SECRET_KEY } from "../../lib/env/paystack";

export const mini_e_commerce_api = new Hono();

mini_e_commerce_api.get("/api/mini_commerce", async (c) => {
  const prince = 50;
  const resultList = (await pbDb.collection("4mini_ecommerce_ts").getList())
    .items as BaseProduct[];
  const htmlString = `
  <div id="bucket-container">
    <div class="bucket-header">
      <h2>Your Bucket</h2>
    <a href="/mini_commerce/bucket">  <p>Total Products: <span id="bucket-count">0</span></p> </a>
    </div>
  </div>

  <div class="product-grid">
    ${resultList
      .map(
        (product) => `
      <div class="product">
        <h2>${product.title}</h2>
        <h3>${product.subtitle}</h3>
        <p>${product.description}</p>
        <ul>
          <li><strong>Gift Card:</strong> ${
            product.is_giftCard ? "Yes" : "No"
          }</li>
          <li><strong>Status:</strong> ${product.status}</li>
          <li><strong>Dimensions:</strong> ${product.width}cm (W) x ${
          product.length
        }cm (L) x ${product.height}cm (H)</li>
          <li><strong>Weight:</strong> ${product.weight}g</li>
          <li><strong>Categories:</strong> ${product.categories}</li>
          <li><strong>Type:</strong> ${product.type}</li>
          <li><strong>Tags:</strong> ${product.tags}</li>
          <li><strong>Discountable:</strong> ${
            product.discountable ? "Yes" : "No"
          }</li>
          ${
            product.metadata
              ? `<li><strong>Metadata:</strong> ${JSON.stringify(
                  product.metadata
                )}</li>`
              : ""
          }
        </ul>
        <button class="add-to-bucket-btn" onclick="addToBucket('${
          product.title
        }', ${prince})">Add to Bucket</button>
      </div>
    `
      )
      .join("")}
  </div>
`;

  return c.html(htmlString);
});
//product.price

mini_e_commerce_api.post("/api/mini_commerce/checkout", async (c) => {
  const { bucket } = await c.req.json();
  if (!bucket || bucket.length === 0) {
    return c.json({ success: false, message: "Bucket is empty" }, 400);
  }

  const totalAmount = bucket.reduce((sum, item) => sum + item.price, 0);

  const amountInKobo = totalAmount * 100;

  // Create a new Paystack payment session
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: "customer@example.com",
        amount: amountInKobo,
        callback_url:
          "http://localhost:3000/api/mini_commerce/checkout-success",
      },
      {
        headers: {
          Authorization: `Bearer ${PAY_STACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = response.data;
    return c.json({ success: true, authorization_url: data.authorization_url });
  } catch (error) {
    console.error(error);
    return c.json(
      { success: false, message: "Payment initialization failed" },
      500
    );
  }
});

mini_e_commerce_api.get("/api/mini_commerce/checkout-success", async (c) => {
  const { reference } = c.req.query();

  if (!reference) {
    return c.text("Payment reference not found", 400);
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAY_STACK_SECRET_KEY}`,
        },
      }
    );

    const { data } = response.data;
    if (data.status === "success") {
      return c.text("Payment Successful! Thank you for your purchase.");
    } else {
      return c.text("Payment failed. Please try again.", 400);
    }
  } catch (error) {
    console.error(error);
    return c.text("Error verifying payment.", 500);
  }
});
