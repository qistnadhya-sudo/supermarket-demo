// Senarai Data Menu Western & Grill
const menuData = [
  // MAIN COURSE
  {
    id: 1,
    category: "MAIN COURSE",
    name: "Crispy Chicken Chop",
    desc: "Ayam goreng rangup bersama sos blackpepper pekat, kentang putar & coleslaw.",
    price: 16.90,
    img: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    category: "MAIN COURSE",
    name: "Grilled Lamb Chop",
    desc: "Daging kambing perap herba dipanggang sempurna dengan sos lada hitam.",
    price: 24.90,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    category: "MAIN COURSE",
    name: "Grilled Chicken Chop",
    desc: "Peha ayam tanpa tulang dipanggang berjus dengan sos mushroom atau blackpepper.",
    price: 17.90,
    img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    category: "MAIN COURSE",
    name: "Fish & Chips",
    desc: "Isi ikan dory bersalut tepung rangup bersama kentang goreng & sos tartar.",
    price: 15.90,
    img: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=500&q=80"
  },

  // PASTA & SPAGHETTI
  {
    id: 5,
    category: "PASTA & SPAGHETTI",
    name: "Spaghetti Carbonara",
    desc: "Sos berkrim keju parmesan bersama hirisan daging salai & cendawan butang.",
    price: 14.90,
    img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    category: "PASTA & SPAGHETTI",
    name: "Spaghetti Bolognese",
    desc: "Sos tomato autentik dimasak perlahan bersama daging lembu cincang.",
    price: 13.90,
    img: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    category: "PASTA & SPAGHETTI",
    name: "Aglio Olio Seafood",
    desc: "Spaghetti tumis bawang putih & minyak zaitun bersama udang dan sotong segar.",
    price: 18.50,
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=80"
  },

  // SIDES
  {
    id: 8,
    category: "SIDES",
    name: "Cheesy Wedges",
    desc: "Kentang baji rangup disiram sos keju cair dan mayonis.",
    price: 7.50,
    img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 9,
    category: "SIDES",
    name: "Garlic Bread & Mushroom Soup",
    desc: "Sup cendawan berkrim dihidang panas bersama 2 keping roti bawang putih.",
    price: 8.90,
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    category: "SIDES",
    name: "Crispy Calamari Rings",
    desc: "Sotong celup tepung goreng keemasan dengan sos cili Thai.",
    price: 10.90,
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80"
  },

  // COMBO
  {
    id: 11,
    category: "COMBO",
    name: "Talam Western Family (3-4 Pax)",
    desc: "Lamb Chop, Chicken Chop, Meatball, Spaghetti, Fries & 1 Jag Air.",
    price: 59.90,
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 12,
    category: "COMBO",
    name: "Couple Grill Platter (2 Pax)",
    desc: "Grilled Chicken, Lamb Shoulder, Cheesy Wedges & 2 Iced Lemon Tea.",
    price: 38.90,
    img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&q=80"
  }
];

let currentCategory = "MAIN COURSE";
let cart = [];

// Nombor WhatsApp Penjual (Tukar kepada nombor anda dengan kod negara 60)
const SELLER_PHONE = "60123456789";

// Papar Menu Mengikut Kategori
function renderMenu() {
  const grid = document.getElementById("menuGrid");
  const heading = document.getElementById("categoryHeading");
  heading.textContent = currentCategory;

  const filtered = menuData.filter(item => item.category === currentCategory);

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card">
      <div>
        <div class="card-img-box">
          <img src="${item.img}" alt="${item.name}" loading="lazy" />
        </div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
      </div>
      <div class="card-footer">
        <span class="card-price">RM ${item.price.toFixed(2)}</span>
        <button class="add-btn" onclick="addToCart(${item.id})">+ Add</button>
      </div>
    </div>
  `).join("");
}

// Klik Butang Kategori Desktop
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    syncMobileCategory(currentCategory);
    renderMenu();
  });
});

// Klik Ikon Kategori Bulat Mobile
document.querySelectorAll(".cat-circle-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-circle-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    syncDesktopCategory(currentCategory);
    renderMenu();
  });
});

function syncMobileCategory(cat) {
  document.querySelectorAll(".cat-circle-item").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-category") === cat);
  });
}

function syncDesktopCategory(cat) {
  document.querySelectorAll(".cat-btn").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-category") === cat);
  });
}

// Tambah Item ke Troli
function addToCart(id) {
  const product = menuData.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(product.name);
}

// Ubah Kuantiti Item
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

// Kemas Kini Paparan Troli
function updateCartUI() {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  const orderType = document.getElementById("orderType").value;
  const deliveryFee = orderType.includes("Luar Bandar") ? 5.00 : 0.00;
  const finalTotal = subtotal + deliveryFee;

  // Kemas kini lencana kuantiti pada Desktop & Mobile
  document.getElementById("cartBadge").textContent = totalQty;
  document.getElementById("cartBadgeMobile").textContent = totalQty;

  const cartItemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty-cart-msg">Troli anda masih kosong.</p>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>RM ${(item.price * item.qty).toFixed(2)}</p>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join("");
  }

  document.getElementById("subtotalText").textContent = `RM ${subtotal.toFixed(2)}`;
  document.getElementById("deliveryFeeText").textContent = `RM ${deliveryFee.toFixed(2)}`;
  document.getElementById("totalText").textContent = `RM ${finalTotal.toFixed(2)}`;
}

// Pop-up Toast di Tengah-tengah Skrin
function showToast(title) {
  const container = document.getElementById("toastContainer");
  if (container.children.length >= 2) container.firstChild.remove();

  const t = document.createElement("div");
  t.className = "toast-item";
  t.innerHTML = `<span>✅</span> <span><strong>${title}</strong> ditambah ke troli!</span>`;
  container.appendChild(t);

  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "scale(0.9)";
    t.style.transition = "all 0.25s ease";
    setTimeout(() => t.remove(), 250);
  }, 1800);
}

// Kawalan Buka & Tutup Troli
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

document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("openCartBtnMobile").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Kawalan Pilihan COD vs Self-Pickup
document.getElementById("orderType").addEventListener("change", (e) => {
  const addrGroup = document.getElementById("addressGroup");
  if (e.target.value.includes("Self-Pickup")) {
    addrGroup.style.display = "none";
  } else {
    addrGroup.style.display = "block";
  }
  updateCartUI();
});

// Hantar Pesanan ke WhatsApp
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Sila pilih sekurang-kurangnya satu menu terlebih dahulu!");
    return;
  }

  const name = document.getElementById("custName").value.trim();
  const orderType = document.getElementById("orderType").value;
  const address = document.getElementById("custAddress").value.trim();
  const notes = document.getElementById("orderNotes").value.trim();

  if (!name) {
    alert("Sila masukkan nama penuh anda.");
    return;
  }

  if (!orderType.includes("Self-Pickup") && !address) {
    alert("Sila masukkan alamat penghantaran COD anda.");
    return;
  }

  let subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let deliveryFee = orderType.includes("Luar Bandar") ? 5.00 : 0.00;
  let total = subtotal + deliveryFee;

  let msg = `*PESANAN BARU - WESTERN & GRILL*\n`;
  msg += `----------------------------------\n`;
  msg += `*Nama:* ${name}\n`;
  msg += `*Kaedah:* ${orderType}\n`;
  if (!orderType.includes("Self-Pickup")) {
    msg += `*Alamat COD:* ${address}\n`;
  }
  if (notes) {
    msg += `*Nota:* ${notes}\n`;
  }
  msg += `----------------------------------\n`;
  msg += `*Senarai Menu:*\n`;

  cart.forEach((item, index) => {
    msg += `${index + 1}. ${item.name} (x${item.qty}) - RM ${(item.price * item.qty).toFixed(2)}\n`;
  });

  msg += `----------------------------------\n`;
  msg += `Subtotal: RM ${subtotal.toFixed(2)}\n`;
  msg += `Caj Penghantaran: RM ${deliveryFee.toFixed(2)}\n`;
  msg += `*JUMLAH BAYARAN: RM ${total.toFixed(2)}*\n`;

  const waUrl = `https://wa.me/${SELLER_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
});

// Mulakan paparan menu
renderMenu();