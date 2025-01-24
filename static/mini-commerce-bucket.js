function displayBucketItems() {
  const bucketItemsContainer = document.getElementById("bucket-items");
  const totalPriceContainer = document.getElementById("total-price");
  const bucket = JSON.parse(localStorage.getItem("bucket")) || [];

  if (bucket.length === 0) {
    bucketItemsContainer.innerHTML = "<p>Your bucket is empty.</p>";
    return;
  }

  let totalPrice = 0;
  bucketItemsContainer.innerHTML = bucket
    .map((item) => {
      totalPrice += item.price;
      return `
        <div class="bucket-item">
          <span>${item.title}</span>
          <span>$${item.price.toFixed(2)}</span>
        </div>
      `;
    })
    .join("");
  totalPriceContainer.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}
displayBucketItems();

const goToCheckoutButton = document.getElementById("go-to-checkout");

goToCheckoutButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const bucket = JSON.parse(localStorage.getItem("bucket")) || [];
  if (bucket.length === 0) {
    alert("Your bucket is empty!");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/mini_commerce/checkout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bucket }),
      }
    );

    const result = await response.json();

    if (result.success) {
      window.location.href = result.authorization_url;
    } else {
      alert(result.message || "Something went wrong during checkout.");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to initialize payment.");
  }
});
