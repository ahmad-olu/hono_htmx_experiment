import { Hono } from "hono";
import { css, Style } from "hono/css";
import { FC } from "hono/jsx";

export const mini_commerce = new Hono();

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <Style>{css`
          .bucket-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background: #f8f8f8;
            border-bottom: 1px solid #ccc;
          }

          .bucket-header h2 {
            margin: 0;
          }
          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
          }

          .product {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            background: #fff;
          }

          .product h2 {
            font-size: 1.5rem;
            margin: 0 0 10px;
          }

          .product h3 {
            font-size: 1.2rem;
            color: #666;
            margin: 0 0 10px;
          }

          .product p {
            font-size: 1rem;
            color: #333;
            margin: 0 0 10px;
          }

          .product ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .product ul li {
            font-size: 0.9rem;
            margin-bottom: 5px;
          }
        `}</Style>
        <script src="/static/htmx.min.js"></script>
        <script src="/static/mini-commerce.js"></script>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const MiniCommercePage: FC<{}> = (props: {}) => {
  return (
    <Layout>
      <div
        hx-get="/api/mini_commerce"
        hx-trigger="load"
        hx-swap="innerHTML"
      ></div>
    </Layout>
  );
};

mini_commerce.get("/mini_commerce", (c) => {
  return c.html(<MiniCommercePage />);
});

mini_commerce.get("/mini_commerce/bucket", (c) => {
  return c.html(
    `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout</title>
  <style>
    .checkout-container {
      padding: 20px;
      max-width: 600px;
      margin: auto;
    }

    .bucket-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }

    .total-price {
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 20px;
    }

  </style>
</head>
<body>
  <div class="checkout-container">
    <h1>Checkout</h1>
    <div id="bucket-items"></div>
    <div class="total-price" id="total-price">Total Price: $0</div>
    <a id="go-to-checkout" class="total-price" href="api/mini_commerce/checkout">Go to Checkout</a>
  </div>


  <script src="/static/mini-commerce-bucket.js"></script>
</body>
</html>

    `
  );
});

export default mini_commerce;
