/**
 * Shared header, footer, and navigation active-state for Sauer Law LLC.
 */
(function () {
  const PHONE = "(513) 519-1096";
  const PHONE_TEL = "+15135191096";
  const FIRM = "Sauer Law LLC";
  const ATTORNEY = "Greg Sauer, Attorney at Law";
  const DISCLAIMER =
    "The text, photos, descriptions, and other material on this web site are presented for informational purposes only and should not be considered or interpreted as legal advice. You should consult a qualified licensed attorney for legal advice specific to your individual situation. No attorney-client relationship is offered or created by or between Gregory J. Sauer, Attorneys at Law";

  const navItems = [
    { href: "index.html", label: "Home", page: "index" },
    { href: "about.html", label: "About", page: "about" },
    { href: "practice-areas.html", label: "Practice Areas", page: "practice-areas" },
    { href: "testimonials.html", label: "Testimonials", page: "testimonials" },
    { href: "contact.html", label: "Contact", page: "contact" },
  ];

  function currentPage() {
    const path = window.location.pathname.replace(/\\/g, "/");
    const file = path.split("/").pop() || "index.html";
    if (file === "" || file === "/") return "index";
    return file.replace(".html", "");
  }

  function navLinks(active, mobile) {
    const base = mobile
      ? "block py-2 text-gray-700 hover:text-brand-blue nav-link"
      : "text-gray-700 hover:text-brand-blue nav-link px-1";
    return navItems
      .map(({ href, label, page }) => {
        const cls =
          page === active
            ? base + " is-active text-brand-blue font-semibold"
            : base;
        return `<a href="${href}" class="${cls}" data-nav="${page}">${label}</a>`;
      })
      .join(mobile ? "" : '\n<span class="text-gray-300 hidden sm:inline">|</span>\n');
  }

  function renderHeader() {
    const active = currentPage();
    const desktopNav = navItems
      .map(({ href, label, page }) => {
        const cls =
          page === active
            ? "nav-link is-active text-brand-blue font-semibold"
            : "nav-link text-gray-700 hover:text-brand-blue";
        return `<a href="${href}" class="${cls}">${label}</a>`;
      })
      .join("");

    return `
<header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
  <div class="bg-brand-navy text-white text-sm">
    <div class="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
      <span class="opacity-90">${ATTORNEY}</span>
      <a href="tel:${PHONE_TEL}" class="phone-cta font-semibold text-lg hover:text-blue-200" aria-label="Call ${PHONE}">
        ${PHONE}
      </a>
    </div>
  </div>
  <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
    <a href="index.html" class="group shrink-0" aria-label="${FIRM} home">
      <span class="block text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">${FIRM}</span>
      <span class="block text-sm text-gray-500">Maineville, Ohio</span>
    </a>
    <nav class="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Main navigation">
      ${desktopNav}
    </nav>
    <a href="contact.html" class="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm">
      Schedule Consultation
    </a>
    <button type="button" id="menu-toggle" class="md:hidden p-2 rounded-lg text-brand-navy hover:bg-gray-100 transition-colors" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
  <nav id="mobile-menu" class="md:hidden is-closed border-t border-gray-100 bg-white" aria-label="Mobile navigation">
    <div class="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1 text-sm font-medium">
      ${navLinks(active, true)}
      <a href="tel:${PHONE_TEL}" class="phone-cta py-2 font-bold text-brand-blue text-lg">${PHONE}</a>
      <a href="contact.html" class="mt-2 inline-flex justify-center px-4 py-2 rounded-lg bg-brand-blue text-white font-semibold hover:bg-blue-800 transition-colors">Schedule Consultation</a>
    </div>
  </nav>
</header>`;
  }

  function renderFooter() {
    return `
<footer class="bg-brand-navy text-gray-300 mt-auto">
  <div class="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
    <div>
      <p class="text-white font-bold text-lg mb-2">${FIRM}</p>
      <p class="text-sm mb-4">${ATTORNEY}</p>
      <p class="text-sm leading-relaxed">
        5854 Pepperridge Court<br>
        Maineville, OH 45039
      </p>
    </div>
    <div>
      <p class="text-white font-semibold mb-3">Contact</p>
      <p class="mb-2">
        <a href="tel:${PHONE_TEL}" class="phone-cta text-white text-xl font-bold hover:text-blue-200 transition-colors">${PHONE}</a>
      </p>
      <p>
        <a href="mailto:greg@sauerlawllc.com" class="hover:text-white transition-colors">greg@sauerlawllc.com</a>
      </p>
    </div>
    <div>
      <p class="text-white font-semibold mb-3">Quick Links</p>
      <ul class="space-y-2 text-sm">
        ${navItems.map(({ href, label }) => `<li><a href="${href}" class="hover:text-white transition-colors">${label}</a></li>`).join("")}
      </ul>
    </div>
  </div>
  <div class="border-t border-white/10">
    <div class="max-w-6xl mx-auto px-4 py-6">
      <p class="text-xs text-gray-400 leading-relaxed">${DISCLAIMER}</p>
      <p class="text-xs text-gray-500 mt-4">&copy; ${new Date().getFullYear()} ${FIRM}. All rights reserved.</p>
    </div>
  </div>
</footer>`;
  }

  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const open = menu.classList.contains("is-open");
      menu.classList.toggle("is-open", !open);
      menu.classList.toggle("is-closed", open);
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });
  }

  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();
  initMobileMenu();
})();
