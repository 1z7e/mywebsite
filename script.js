let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* إضافة منتج */
function addToCart(name, price, image = "") {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1, image });
  }

  saveCart();
  alert("تمت الإضافة للسلة 🛒");
}

/* حفظ وتحديث */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

/* عداد السلة */
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) {
    el.textContent = cart.reduce((a, b) => a + b.qty, 0);
  }
}

/* عرض السلة */
function renderCart() {
  const items = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  if (!items) return;

  items.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    items.innerHTML += `
      <div class="cart-item">
        <img src="${item.image || 'https://via.placeholder.com/80'}">

        <div class="item-info">
          <h4>${item.name}</h4>
          <span>${item.price} ر.س</span>
          <button class="remove" onclick="removeItem(${index})">حذف</button>
        </div>

        <div class="qty">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
  });

  subtotalEl.textContent = subtotal + " ر.س";
  totalEl.textContent = subtotal + " ر.س";
}

/* تغيير الكمية */
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
}

/* حذف المنتج */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

/* واتساب */
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("السلة فاضية");
    return;
  }

  let message = "السلام عليكم، حاب أطلب:\n\n";
  let total = 0;

  cart.forEach((item, i) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    message += `${i + 1}- ${item.name} × ${item.qty} = ${itemTotal} ر.س\n`;
  });

  message += `\nالإجمالي: ${total} ر.س`;

  const phone = "966550416731"; // ← رقمك
  window.open(
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(message),
    "_blank"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
