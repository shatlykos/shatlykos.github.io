/* Google Analytics 4 для abdullab.com.
   Чтобы включить: впиши свой Measurement ID вместо G-XXXXXXXXXX. Пока там заглушка, ничего не загружается.
   События: contact_click (написать в Telegram), bot_demo_click (открыть демо-бота в Telegram),
   cafe_demo_open (переход на демо кассы) и шаги демо через window.track(...) в cafe.html. */
(function () {
  var GA_ID = "G-2DFCX3Y68M";
  var on = /^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== "G-XXXXXXXXXX";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.track = function (name, params) { if (on) gtag("event", name, params || {}); };
  if (!on) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  gtag("js", new Date());
  gtag("config", GA_ID);

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    var label = (a.textContent || "").trim().slice(0, 60);
    var place = a.closest("section, header, footer, nav");
    var where = place ? (place.id || place.tagName.toLowerCase()) : "page";
    var m = href.match(/^https:\/\/t\.me\/([\w_]+)/);
    if (m) {
      var contact = m[1] === "abdullah_shatlyk";
      window.track(contact ? "contact_click" : "bot_demo_click",
        { link_text: label, bot: m[1], placement: where, transport_type: "beacon" });
    } else if (/cafe\.html/.test(href) && !/cafe\.html/.test(location.pathname)) {
      window.track("cafe_demo_open", { link_text: label, placement: where, transport_type: "beacon" });
    }
  }, true);
})();
