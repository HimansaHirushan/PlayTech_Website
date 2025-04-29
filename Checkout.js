document.addEventListener("DOMContentLoaded", function () {
  // Get the table and total elements
  const checkoutTable = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  // Retrieve cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to render checkout items
  function renderCheckout(items) {
    checkoutTable.innerHTML = "";
    let total = 0;

    items.forEach(item => {
      const price = typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^\d\.]/g, ''))
        : item.price;
      const subtotal = price * (item.quantity || 1);
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image || './images/placeholder.png'}" alt="${item.name || 'Unnamed Product'}" style="width:50px;"></td>
        <td>${item.name || "Unnamed Product"}</td>
        <td>Rs. ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td>${item.quantity || 1}</td>
        <td>Rs. ${(subtotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
      `;
      checkoutTable.appendChild(row);
    });

    totalEl.textContent = `Total: Rs. ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  }

  // Form submission handler
  const checkoutForm = document.getElementById("checkout-form");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const address = document.getElementById("address")?.value.trim();
      const card = document.getElementById("card")?.value.trim();

      if (!name || !address || !card) {
        alert("Please fill in all the fields.");
        return;
      }

      alert("Order confirmed! Redirecting to Thank You page...Your wii be diliver soon");
      localStorage.removeItem("cart");
      window.location.href = "./Thank.html"; // Must match actual file name exactly
    });
  }

  // Initial rendering of checkout page
  renderCheckout(cartItems);
});
