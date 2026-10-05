/* Interface du simulateur : remplit le formulaire et affiche le résultat. */
(function () {
  var form = document.getElementById("form-calcul");
  var selectRegion = document.getElementById("region");
  var champDate = document.getElementById("dateMEC");
  var champChevaux = document.getElementById("chevaux");
  var blocVehicule = document.getElementById("bloc-vehicule");
  var resultat = document.getElementById("resultat");
  var euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

  window.TARIFS.REGIONS.forEach(function (r) {
    var opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = r.nom + " (" + euro.format(r.cheval) + " / CV)";
    selectRegion.appendChild(opt);
  });

  champDate.max = new Date().toISOString().slice(0, 10);
  document.getElementById("maj-tarifs").textContent = window.TARIFS.DERNIERE_MAJ;

  function demarche() {
    return form.querySelector("input[name=demarche]:checked").value;
  }

  function majChamps() {
    var adresse = demarche() === "adresse";
    blocVehicule.hidden = adresse;
    champChevaux.required = !adresse;
    champDate.required = demarche() === "occasion";
    document.getElementById("bloc-date").hidden = demarche() !== "occasion";
  }

  form.addEventListener("change", majChamps);
  majChamps();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var r = window.calculerCarteGrise({
      tarifs: window.TARIFS,
      regionId: selectRegion.value,
      chevaux: champChevaux.value,
      energie: document.getElementById("energie").value,
      dateMEC: champDate.value,
      demarche: demarche()
    });

    document.getElementById("res-total").textContent = euro.format(r.total);
    document.getElementById("res-regionale").textContent = euro.format(r.taxeRegionale);
    document.getElementById("res-fixe").textContent = euro.format(r.taxeFixe);
    document.getElementById("res-redevance").textContent = euro.format(r.redevance);

    var ul = document.getElementById("res-notes");
    ul.replaceChildren();
    r.notes.forEach(function (n) {
      var li = document.createElement("li");
      li.textContent = n;
      ul.appendChild(li);
    });

    resultat.hidden = false;
    resultat.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
