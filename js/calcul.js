/*
 * Calcul du coût de la carte grise (logique pure, sans DOM).
 * Utilisable dans le navigateur (window.calculerCarteGrise) et dans Node (tests).
 */
(function (root) {
  function arrondi(n) {
    return Math.round(n * 100) / 100;
  }

  function ageEnAnnees(dateMEC, aujourdhui) {
    var d = new Date(dateMEC);
    var now = aujourdhui || new Date();
    var age = now.getFullYear() - d.getFullYear();
    var m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age;
  }

  /**
   * @param {object} p
   * @param {object} p.tarifs     window.TARIFS
   * @param {string} p.regionId   identifiant de région
   * @param {number} p.chevaux    puissance fiscale (case P.6)
   * @param {string} p.energie    "thermique" | "hybride" | "electrique"
   * @param {string} p.dateMEC    date de 1re mise en circulation (AAAA-MM-JJ)
   * @param {string} p.demarche   "occasion" | "neuf" | "adresse"
   * @param {Date}   [p.aujourdhui]
   */
  function calculerCarteGrise(p) {
    var t = p.tarifs;
    var region = t.REGIONS.find(function (r) { return r.id === p.regionId; });
    if (!region) throw new Error("Région inconnue");

    if (p.demarche === "adresse") {
      return {
        region: region,
        taxeRegionale: 0,
        taxeFixe: 0,
        redevance: 0,
        total: 0,
        notes: ["Le changement d'adresse sur la carte grise est gratuit."]
      };
    }

    var chevaux = Math.max(1, Math.floor(Number(p.chevaux) || 0));
    var notes = [];
    var taxeRegionale = chevaux * region.cheval;

    if (p.energie === "electrique" && region.exoElectrique > 0) {
      taxeRegionale *= 1 - region.exoElectrique;
      notes.push(
        region.exoElectrique >= 1
          ? "Exonération totale de la taxe régionale pour les véhicules électriques dans votre région."
          : "Réduction de " + region.exoElectrique * 100 + " % de la taxe régionale pour les véhicules électriques dans votre région."
      );
    } else if (p.demarche !== "neuf" && p.dateMEC && ageEnAnnees(p.dateMEC, p.aujourdhui) >= 10) {
      taxeRegionale *= 1 - t.REDUCTION_PLUS_10_ANS;
      notes.push("Véhicule de plus de 10 ans : taxe régionale réduite de 50 %.");
    }

    if (p.demarche === "neuf") {
      notes.push("Véhicule neuf : un malus écologique (CO₂) et un malus au poids peuvent s'ajouter. Ils ne sont pas inclus dans ce calcul.");
    }

    taxeRegionale = arrondi(taxeRegionale);
    var total = arrondi(taxeRegionale + t.TAXE_FIXE + t.REDEVANCE_ACHEMINEMENT);

    return {
      region: region,
      chevaux: chevaux,
      taxeRegionale: taxeRegionale,
      taxeFixe: t.TAXE_FIXE,
      redevance: t.REDEVANCE_ACHEMINEMENT,
      total: total,
      notes: notes
    };
  }

  root.calculerCarteGrise = calculerCarteGrise;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { calculerCarteGrise: calculerCarteGrise, ageEnAnnees: ageEnAnnees };
  }
})(typeof window !== "undefined" ? window : globalThis);
