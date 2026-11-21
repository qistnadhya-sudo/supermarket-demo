const menuData = [
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
  {
    id: 5,
    category: "SPAGHETTI & PASTA",
    name: "Spaghetti Carbonara",
    price: 14.90,
    img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    category: "SPAGHETTI & PASTA",
    name: "Spaghetti Bolognese",
    price: 13.90,
    img: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    category: "SPAGHETTI & PASTA",
    name: "Aglio Olio Seafood",
    price: 18.50,
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=80"
  },
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
const SELLER_PHONE = "60128655181";

const bgAudio = document.getElementById("bgAudio");
const playMainBtn = document.querySelector(".play-main-btn");
const nowPlayingTitle = document.getElementById("nowPlayingTitle");
let isPlaying = false;

if (playMainBtn && bgAudio) {
  playMainBtn.addEventListener("click", () => {
    if (isPlaying) {
      bgAudio.pause();
      playMainBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#000000"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      showCenterToast("Music paused");
    } else {
      bgAudio.play().then(() => {
        playMainBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
        showCenterToast("Playing café vibes 🎶");
      }).catch(err => {
        console.log("Audio error:", err);
        showCenterToast("Sila klik sekali lagi untuk play");
      });
    }
    isPlaying = !isPlaying;
  });
}

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
      <div class="card-player-controls">
        <div class="progress-bar-wrap">
          <div class="progress-fill"></div>
          <div class="progress-thumb"></div>
        </div>
        <div class="player-btns-row">
          <button class="mini-icon-btn">🔀</button>
          <button class="mini-icon-btn">⏮</button>
          <button class="card-add-circle" onclick="addToCart(${item.id})" aria-label="Add to Cart">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
          <button class="mini-icon-btn">⏭</button>
          <button class="mini-icon-btn">🔁</button>
        </div>
        <div class="card-price-label">RM ${item.price.toFixed(2)}</div>
      </div>
    </div>
  `).join("");
}

document.querySelectorAll(".cat-pill-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-pill-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-category");
    renderMenu();
  });
});

function addToCart(id) {
  const product = menuData.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  nowPlayingTitle.textContent = `Selected: ${product.name}`;
  updateCart();
  showCenterToast(product.name);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCart();
}

function updateCart() {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  const orderType = document.getElementById("orderType").value;
  const deliveryFee = orderType.includes("Luar Bandar") ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  document.getElementById("cartBadge").textContent = totalQty;
  document.getElementById("footerCartCount").textContent = `RM ${total.toFixed(2)}`;

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

function showCenterToast(title) {
  const container = document.getElementById("toastContainer");
  if (container.children.length >= 2) container.firstChild.remove();

  const toast = document.createElement("div");
  toast.className = "toast-item";
  toast.innerHTML = `<span>🟢</span> <span><strong>${title}</strong></span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "scale(0.9)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 200);
  }, 1600);
}

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
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("orderType").addEventListener("change", (e) => {
  const addrGroup = document.getElementById("addressGroup");
  addrGroup.style.display = e.target.value.includes("Self-Pickup") ? "none" : "block";
  updateCart();
});

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