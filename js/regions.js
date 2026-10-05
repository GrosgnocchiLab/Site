/* Tableau du prix du cheval fiscal par région (contenu utile pour le référencement). */
(function () {
  var tbody = document.querySelector("#tableau-regions tbody");
  if (!tbody) return;
  var euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
  var t = window.TARIFS;

  t.REGIONS.forEach(function (r) {
    var exemple = 5 * r.cheval + t.TAXE_FIXE + t.REDEVANCE_ACHEMINEMENT;
    var tr = document.createElement("tr");
    [r.nom, euro.format(r.cheval), euro.format(exemple)].forEach(function (texte) {
      var td = document.createElement("td");
      td.textContent = texte;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
})();
