/* ==================================================
   MEGA MENU (tambahan untuk WebTesla.js)
   Pasang <script src="megamenu.js"></script> di paling bawah HTML
================================================== */

(function () {

    /* ---------- 1. DATA MENU (edit di sini saja) ---------- */
    /* img = gambar dari folder images Anda, icon = emoji cadangan */

    const MENUS = {

        vehicles: {
            cards: [
                { name: "Model 3",    img: "images/Model 3.avif",  links: [["Learn", "#"], ["Order", "#"]] },
                { name: "Model Y",    img: "images/Tesla Y.avif",  links: [["Learn", "#"], ["Order", "#"]] },
                { name: "Cybertruck", img: "images/CyberTruck.avif", links: [["Learn", "#"], ["Order", "#"]] },
                { name: "Full Self-Driving", icon: "🧭", links: [["Learn", "#"]] },
                { name: "Inventory",  icon: "📦", links: [["New", "#"], ["Pre-Owned", "#"]] },
                { name: "Model S",    img: "images/Model S.avif",  links: [["Learn", "#"]] },
                { name: "Model X",    img: "images/Model X.avif",  links: [["Learn", "#"]] },
                { name: "Roadster",   img: "images/Roadster.avif", links: [["Learn", "#"]] }
            ],
            list: ["Current Offers", "Demo Drive", "Trade-In", "Vehicle Safety",
                   "Compare", "Fleet"]
        },

        energy: {
            cards: [
                { name: "Solar Panels", icon: "☀️", links: [["Learn", "#"], ["Order", "#"]] },
                { name: "Powerwall",    icon: "🔋", links: [["Learn", "#"], ["Order", "#"]] },
                { name: "Megapack",     icon: "🏭", links: [["Learn", "#"]] }
            ],
            list: ["Schedule a Consultation", "Why Solar", "Incentives",
                   "Support", "Commercial", "Utilities"]
        },

        charging: {
            cards: [
                { name: "Charging",       icon: "🔌", links: [["Learn", "#"]] },
                { name: "Home Charging",  icon: "🏠", links: [["Learn", "#"], ["Shop", "#"]] },
                { name: "Supercharging",  icon: "⚡", links: [["Learn", "#"], ["Find", "#"]] },
                { name: "Wall Connector", icon: "🧰", links: [["Learn", "#"], ["Order", "#"]] }
            ],
            list: ["Help Me Charge", "Charging Calculator", "Host a Supercharger"]
        },

        discover: {
            cols: {
                "Resources": ["Demo Drive", "Insurance", "Current Offers", "Learn",
                              "Video Guides", "Events", "Safety"],
                "Location Services": ["Find Us", "Find a Collision Center",
                                      "Find a Certified Installer"],
                "Company": ["About", "Careers", "Investor Relations"]
            }
        },

        shop: {
            cards: [
                { name: "Charging",    icon: "🔌", links: [] },
                { name: "Accessories", icon: "🛞", links: [] },
                { name: "Apparel",     icon: "🧢", links: [] },
                { name: "Lifestyle",   icon: "🎒", links: [] }
            ]
        }
    };


    /* ---------- 2. BUAT ELEMEN MEGA + BACKDROP ---------- */

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-menu a[data-menu]");

    if (!navbar || !navLinks.length) return;

    const mega = document.createElement("div");
    mega.className = "mega";
    mega.setAttribute("aria-hidden", "true");
    navbar.appendChild(mega);

    const backdrop = document.createElement("div");
    backdrop.className = "mega-backdrop";
    document.body.appendChild(backdrop);

    const linkList = (items) =>
        items.map((t) => `<a href="#">${t}</a>`).join("");

    mega.innerHTML = Object.entries(MENUS).map(([key, m]) => {

        let html = "";

        if (m.cards) {
            html += `<div class="mega-cards">` + m.cards.map((c) => `
                <div class="mega-card">
                    <a href="#">
                        <div class="mega-thumb">
                            ${c.img ? `<img src="${c.img}" alt="${c.name}">` : (c.icon || "")}
                        </div>
                        ${c.name}
                    </a>
                    <div class="mega-card-links">
                        ${c.links.map(([t, u]) => `<a href="${u}">${t}</a>`).join("")}
                    </div>
                </div>`).join("") + `</div>`;
        }

        if (m.list) {
            html += `<div class="mega-list">${linkList(m.list)}</div>`;
        }

        if (m.cols) {
            html += Object.entries(m.cols).map(([title, items]) => `
                <div class="mega-list no-border">
                    <small>${title}</small>
                    ${linkList(items)}
                </div>`).join("");
        }

        return `<div class="mega-panel" data-panel="${key}">${html}</div>`;

    }).join("");

    const panels = mega.querySelectorAll(".mega-panel");


    /* ---------- 3. BUKA / TUTUP ---------- */

    let current = null;
    let closeTimer;

    function openMenu(name) {
        clearTimeout(closeTimer);
        current = name;

        navLinks.forEach((a) =>
            a.classList.toggle("active", a.dataset.menu === name));

        panels.forEach((p) =>
            p.classList.toggle("active", p.dataset.panel === name));

        mega.classList.add("open");
        mega.setAttribute("aria-hidden", "false");
        backdrop.classList.add("show");
    }

    function closeMenu() {
        current = null;

        navLinks.forEach((a) => a.classList.remove("active"));

        mega.classList.remove("open");
        mega.setAttribute("aria-hidden", "true");
        backdrop.classList.remove("show");
    }

    const canHover = window.matchMedia("(hover: hover)").matches;

    navLinks.forEach((a) => {

        // Desktop: hover membuka menu
        if (canHover) {
            a.addEventListener("mouseenter", () => openMenu(a.dataset.menu));
        }

        // Klik / tap: toggle (dan cegah loncat ke #anchor)
        a.addEventListener("click", (e) => {
            e.preventDefault();
            current === a.dataset.menu ? closeMenu() : openMenu(a.dataset.menu);
        });
    });

    // Tutup dengan jeda kecil saat mouse keluar navbar (supaya tidak berkedip)
    navbar.addEventListener("mouseleave", () => {
        if (canHover) closeTimer = setTimeout(closeMenu, 150);
    });

    navbar.addEventListener("mouseenter", () => clearTimeout(closeTimer));

    backdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    // Tutup saat halaman di-scroll
    window.addEventListener("scroll", () => {
        if (current && window.scrollY > 10) closeMenu();
    }, { passive: true });

})();
