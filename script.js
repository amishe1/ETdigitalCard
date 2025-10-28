/*────────────────────────────
 Aymen Solutions – ETdigitalCard v1.0 (Popl Edition)
────────────────────────────*/

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const searchInput = document.getElementById("search");
  const shareBtn = document.getElementById("shareBtn");
  const shareMenu = document.getElementById("shareMenu");
  const copyLink = document.getElementById("copyLink");
  const qrCanvas = document.getElementById("qrcode");
  const siteURL = window.location.href;

  /* DARK / LIGHT MODE */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });

  /* LIVE QR GENERATOR */
  QRCode.toCanvas(qrCanvas, siteURL, { width: 150 }, function (error) {
    if (error) console.error(error);
  });

  /* SEARCH FILTER (Dynamic for Future CMS) */
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const links = document.querySelectorAll(".links-grid a");
    links.forEach((link) => {
      const text = link.textContent.toLowerCase();
      link.style.display = text.includes(filter) ? "flex" : "none";
    });
  });

  /* SHARE MENU */
  shareBtn.addEventListener("click", () => {
    shareMenu.classList.toggle("hidden");
  });

  document.getElementById("shareWhatsApp").href =
    `https://wa.me/?text=${encodeURIComponent(siteURL)}`;
  document.getElementById("shareTelegram").href =
    `https://t.me/share/url?url=${encodeURIComponent(siteURL)}`;
  document.getElementById("shareEmail").href =
    `mailto:?subject=Check this out&body=${encodeURIComponent(siteURL)}`;

  copyLink.addEventListener("click", async () => {
    await navigator.clipboard.writeText(siteURL);
    copyLink.textContent = "Copied!";
    setTimeout(() => (copyLink.textContent = "Copy Link"), 1500);
  });

  /* CONTACT FORM SUCCESS MESSAGE */
  const form = document.querySelector("form[name='contact']");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.reset();
      alert("✅ Message sent successfully to Aymen Solutions!");
    });
  }
});
