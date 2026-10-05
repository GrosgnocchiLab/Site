/*
 * Emplacements publicitaires Google AdSense.
 *
 * 1. Remplacez ADSENSE_CLIENT par votre identifiant éditeur (ca-pub-…).
 * 2. Remplacez chaque data-slot dans le HTML par l'ID du bloc créé dans AdSense.
 * Tant que l'identifiant n'est pas renseigné, un cadre gris marque l'emplacement.
 *
 * Le consentement RGPD est géré par le message « Confidentialité et messages »
 * de Google AdSense (CMP certifiée TCF), à activer dans la console AdSense.
 */
(function () {
  var ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";
  var configure = !/X{4}/.test(ADSENSE_CLIENT);
  var slots = document.querySelectorAll(".pub[data-slot]");

  if (!configure) {
    slots.forEach(function (el) { el.classList.add("pub--demo"); });
    return;
  }

  var s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + ADSENSE_CLIENT;
  document.head.appendChild(s);

  slots.forEach(function (el) {
    var ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", ADSENSE_CLIENT);
    ins.setAttribute("data-ad-slot", el.getAttribute("data-slot"));
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    el.appendChild(ins);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
})();
