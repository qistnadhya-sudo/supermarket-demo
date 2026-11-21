const SELLER_PHONE = "60123445678";

const menuItems = [
  // MAIN COURSE
  { id: 1, category: "MAIN COURSE", title: "Classic Chicken Chop", price: 25.90, desc: "Crispy breaded thigh, black pepper sauce, fries, coleslaw.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80" },
  { id: 2, category: "MAIN COURSE", title: "Grilled Lamb Chop", price: 36.00, desc: "3pcs tender lamb shoulder, mint sauce, mashed potato, salad.", img: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&q=80" },
  { id: 3, category: "MAIN COURSE", title: "Fish & Chips", price: 24.50, desc: "Deep-fried crispy dory fillet, tartar sauce, salad, wedges.", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80" },
  { id: 4, category: "MAIN COURSE", title: "Grilled Blackpepper Chicken", price: 23.90, desc: "Juicy grilled chicken chop, rich black pepper sauce, fries.", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=500&q=80" },
  { id: 5, category: "MAIN COURSE", title: "Sirloin Beef Steak", price: 42.00, desc: "Australian beef sirloin, brown mushroom sauce, roasted veg.", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=500&q=80" },
  { id: 6, category: "MAIN COURSE", title: "Hawaiian Chicken Burger", price: 22.00, desc: "Crispy chicken patty, grilled pineapple, cheddar cheese, fries.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 7, category: "MAIN COURSE", title: "Cheesy Chicken Maryland", price: 27.50, desc: "Breaded chicken, fried banana, sausage, cheese sauce, fries.", img: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80" },
  { id: 8, category: "MAIN COURSE", title: "Salted Egg Chicken Chop", price: 26.90, desc: "Crispy chicken chop topped with creamy salted egg yolk sauce.", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80" },

  // PASTA & SPAGHETTI
  { id: 9, category: "PASTA & SPAGHETTI", title: "Beef Bolognese Spaghetti", price: 24.00, desc: "Classic spaghetti with rich minced beef tomato sauce & parmesan.", img: "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=500&q=80" },
  { id: 10, category: "PASTA & SPAGHETTI", title: "Creamy Carbonara", price: 25.00, desc: "Spaghetti tossed in creamy white sauce, beef streaky & mushroom.", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80" },
  { id: 11, category: "PASTA & SPAGHETTI", title: "Aglio Olio Seafood", price: 28.50, desc: "Olive oil, garlic, chili flakes, fresh prawns & squid rings.", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { id: 12, category: "PASTA & SPAGHETTI", title: "Mac & Cheese Baked", price: 21.00, desc: "Macaroni baked with mozzarella & cheddar cheese crust.", img: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=500&q=80" },

  // SIDES
  { id: 13, category: "SIDES", title: "Spicy Chicken Tenders", price: 16.00, desc: "6pcs fiery crispy chicken tenders with honey mustard dip.", img: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=500&q=80" },
  { id: 14, category: "SIDES", title: "Mushroom Soup & Garlic Bread", price: 12.50, desc: "Homemade creamy mushroom soup served with 3pcs garlic toast.", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80" },
  { id: 15, category: "SIDES", title: "Cheesy Wedges", price: 11.00, desc: "Crispy potato wedges drizzled with nacho cheese & mayo.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80" },
  { id: 16, category: "SIDES", title: "Crispy Calamari Rings", price: 15.50, desc: "Golden fried squid rings served with thai chili & tartar sauce.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80" },

  // COMBO
  { id: 17, category: "COMBO", title: "Couple Western Platter", price: 58.00, desc: "1 Chicken Chop, 1 Lamb Chop, Spaghetti, Fries, Wedges & 2 Drinks.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80" },
  { id: 18, category: "COMBO", title: "Family Feast Box (4 Pax)", price: 98.00, desc: "2 Chicken Chop, 1 Fish & Chips, 1 Carbonara, Sides & 4 Drinks.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" }
];

let currentCategory = "MAIN COURSE";
let cart = [];

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  const heading = document.getElementById("categoryHeading");
  heading.textContent = currentCategory;

  const filtered = menuItems.filter(item => item.category === currentCategory);

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card">
      <div class="card-img-box">
        <img src="${item.img}" alt="${item.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80';" />
      </div>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">${item.desc}</p>
      <div class="card-bottom">
        <span class="card-price">RM ${item.price.toFixed(2)}</span>
        <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

// ... (kekalkan fungsi cart dan event listener yang lain di bawah seperti biasa)

// Tukar Kategori bila klik menu di Sidebar Kiri
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    renderMenu();
  });
});

// Toast Notification
function showToast(title) {
  const container = document.getElementById("toastContainer");
  if (container.children.length >= 2) container.firstChild.remove();
  const t = document.createElement("div");
  t.className = "toast-item";
  t.textContent = `✓ ${title} ditambah ke troli!`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// Fungsi Cart
function addToCart(id) {
  const product = menuItems.find(i => i.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(product.title);
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  let subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  const orderType = document.getElementById("orderType").value;
  const deliveryFee = orderType.includes("Delivery") ? 3.00 : 0.00;
  const finalTotal = subtotal + deliveryFee;

  document.getElementById("cartBadge").textContent = totalQty;

  const container = document.getElementById("cartItems");
  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#78716c; margin-top:40px;">Troli pesanan anda masih kosong.</p>`;
    document.getElementById("cartTotal").textContent = "RM 0.00";
    return;
  }

  container.innerHTML = "";
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <div>
        <h4 style="font-size:0.85rem; font-weight:700;">${item.title}</h4>
        <span style="font-size:0.75rem; color:#78716c;">RM ${item.price.toFixed(2)} x ${item.qty}</span>
      </div>
      <div class="qty-controls">
        <button class="q-btn" onclick="changeQty(${item.id}, -1)">-</button>
        <span style="font-size:0.85rem; font-weight:700;">${item.qty}</span>
        <button class="q-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;
    container.appendChild(row);
  });

  document.getElementById("cartTotal").textContent = `RM ${finalTotal.toFixed(2)}`;
}

document.getElementById("orderType").addEventListener("change", updateCartUI);

// Buka / Tutup Cart Drawer
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart() { cartDrawer.classList.add("open"); cartOverlay.classList.add("open"); }
function closeCart() { cartDrawer.classList.remove("open"); cartOverlay.classList.remove("open"); }

document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Hantar Order ke WhatsApp
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Sila pilih sekurang-kurangnya satu menu.");
    return;
  }
  const name = document.getElementById("custName").value.trim();
  if (!name) {
    alert("Sila masukkan nama anda.");
    document.getElementById("custName").focus();
    return;
  }

  let msg = `*NEW ORDER - WESTERN & GRILL*\n\n`;
  msg += `*Nama:* ${name}\n`;
  msg += `*Jenis Pesanan:* ${document.getElementById("orderType").value}\n\n`;
  msg += `*Senarai Menu:*\n`;

  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.title} (x${item.qty}) - RM ${(item.price * item.qty).toFixed(2)}\n`;
  });

  msg += `\n*Jumlah Bayaran:* ${document.getElementById("cartTotal").textContent}`;

  const url = `https://wa.me/${SELLER_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});

renderMenu();
updateCartUI();