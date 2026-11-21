const menuData = [
  // MAIN COURSE
  {
    id: 1,
    category: "MAIN COURSE",
    name: "Crispy Chicken Chop",
    price: 16.90,
    img: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    category: "MAIN COURSE",
    name: "Grilled Lamb Chop",
    price: 24.90,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    category: "MAIN COURSE",
    name: "Grilled Chicken",
    price: 17.90,
    img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    category: "MAIN COURSE",
    name: "Fish & Chips",
    price: 15.90,
    img: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=500&q=80"
  },

  // PASTA & SPAGHETTI
  {
    id: 5,
    category: "PASTA & SPAGHETTI",
    name: "Spaghetti Carbonara",
    price: 14.90,
    img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    category: "PASTA & SPAGHETTI",
    name: "Spaghetti Bolognese",
    price: 13.90,
    img: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    category: "PASTA & SPAGHETTI",
    name: "Aglio Olio Seafood",
    price: 18.50,
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=80"
  },

  // SIDES
  {
    id: 8,
    category: "SIDES",
    name: "Cheesy Wedges",
    price: 7.50,
    img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 9,
    category: "SIDES",
    name: "Mushroom Soup",
    price: 8.90,
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    category: "SIDES",
    name: "Crispy Calamari",
    price: 10.90,
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80"
  },

  // COMBO
  {
    id: 11,
    category: "COMBO",
    name: "Family Talam Grill",
    price: 59.90,
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 12,
    category: "COMBO",
    name: "Couple Platter",
    price: 38.90,
    img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&q=80"
  }
];

let activeCategory = "ALL";
let cart = [];
const SELLER_PHONE = "60123456789"; // Tukar kepada nombor WhatsApp anda

// Papar Menu
function renderMenu() {
  const grid = document.getElementById("menuGrid");
  const filtered = activeCategory === "ALL"
    ? menuData
    : menuData.filter(item => item.category === activeCategory);

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card">
      <div>
        <div class="card-thumb">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
        <h3 class="card-name">${item.name}</h3>
      </div>
      <div class="card-bottom">
        <span class="card-price">RM ${item.price.toFixed(2)}</span>
        <button class="card-add-btn" onclick="addToCart(${item.id})">+ Add</button>
      </div>
    </div>
  `).join("");
}

// Klik Kategori Bulat
document.querySelectorAll(".cat-circle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-circle-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-category");
    renderMenu();
  });
});

// Tambah Item ke Troli
function addToCart(id) {
  const product = menuData.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  showCenterToast(product.name);
}

// Ubah Kuantiti
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCart();
}

// Kemas Kini Troli (Desktop & Mobile Badge)
function updateCart() {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  const orderType = document.getElementById("orderType").value;
  const deliveryFee = orderType.includes("Luar Bandar") ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  document.getElementById("cartBadgeDesktop").textContent = totalQty;
  document.getElementById("cartBadgeMobile").textContent = totalQty;

  const cartItemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty-msg">Troli masih kosong. Pilih menu kegemaran anda!</p>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>RM ${(item.price * item.qty).toFixed(2)}</p>
        </div>
        <div class="qty-box">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join("");
  }

  document.getElementById("subtotalText").textContent = `RM ${subtotal.toFixed(2)}`;
  document.getElementById("deliveryFeeText").textContent = `RM ${deliveryFee.toFixed(2)}`;
  document.getElementById("totalText").textContent = `RM ${total.toFixed(2)}`;
}

// Pop-up Toast Tepat di Tengah Skrin
function showCenterToast(title) {
  const container = document.getElementById("toastContainer");
  if (container.children.length >= 2) container.firstChild.remove();

  const toast = document.createElement("div");
  toast.className = "toast-item";
  toast.innerHTML = `<span>✅</span> <span><strong>${title}</strong> ditambah!</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "scale(0.9)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 200);
  }, 1600);
}

// Kawalan Drawer Troli
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("openCartBtnDesktop").addEventListener("click", openCart);
document.getElementById("openCartBtnMobile").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("orderType").addEventListener("change", (e) => {
  const addrGroup = document.getElementById("addressGroup");
  addrGroup.style.display = e.target.value.includes("Self-Pickup") ? "none" : "block";
  updateCart();
});

// Checkout ke WhatsApp
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Sila pilih menu dahulu!");
    return;
  }

  const name = document.getElementById("custName").value.trim();
  const orderType = document.getElementById("orderType").value;
  const address = document.getElementById("custAddress").value.trim();
  const notes = document.getElementById("orderNotes").value.trim();

  if (!name) {
    alert("Sila masukkan nama anda.");
    return;
  }

  if (!orderType.includes("Self-Pickup") && !address) {
    alert("Sila masukkan alamat COD anda.");
    return;
  }

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const deliveryFee = orderType.includes("Luar Bandar") ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  let msg = `*PESANAN BARU - WESTERN & GRILL*\n`;
  msg += `----------------------------\n`;
  msg += `*Nama:* ${name}\n`;
  msg += `*Kaedah:* ${orderType}\n`;
  if (!orderType.includes("Self-Pickup")) msg += `*Alamat:* ${address}\n`;
  if (notes) msg += `*Nota:* ${notes}\n`;
  msg += `----------------------------\n`;

  cart.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.name} (x${item.qty}) - RM ${(item.price * item.qty).toFixed(2)}\n`;
  });

  msg += `----------------------------\n`;
  msg += `Subtotal: RM ${subtotal.toFixed(2)}\n`;
  msg += `Caj COD: RM ${deliveryFee.toFixed(2)}\n`;
  msg += `*JUMLAH: RM ${total.toFixed(2)}*`;

  window.open(`https://wa.me/${SELLER_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
});

renderMenu();