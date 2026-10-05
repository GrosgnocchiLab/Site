// Lancer avec : node --test tests/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../js/tarifs.js"), "utf8"), ctx);
const TARIFS = ctx.window.TARIFS;
const { calculerCarteGrise, ageEnAnnees } = require("../js/calcul.js");
const aujourdhui = new Date("2026-10-05");

test("occasion récente en Île-de-France, 5 CV", () => {
  const r = calculerCarteGrise({ tarifs: TARIFS, regionId: "idf", chevaux: 5, energie: "thermique", dateMEC: "2022-01-01", demarche: "occasion", aujourdhui });
  assert.strictEqual(r.taxeRegionale, 274.75);
  assert.strictEqual(r.total, 288.51);
});

test("véhicule de plus de 10 ans : taxe régionale divisée par 2", () => {
  const r = calculerCarteGrise({ tarifs: TARIFS, regionId: "bre", chevaux: 6, energie: "thermique", dateMEC: "2010-05-01", demarche: "occasion", aujourdhui });
  assert.strictEqual(r.taxeRegionale, 180);
  assert.strictEqual(r.total, 193.76);
});

test("pile 10 ans le jour même : réduction appliquée", () => {
  assert.strictEqual(ageEnAnnees("2016-10-05", aujourdhui), 10);
  assert.strictEqual(ageEnAnnees("2016-10-06", aujourdhui), 9);
});

test("véhicule neuf : pas de réduction, avertissement malus", () => {
  const r = calculerCarteGrise({ tarifs: TARIFS, regionId: "ara", chevaux: 4, energie: "thermique", demarche: "neuf", aujourdhui });
  assert.strictEqual(r.taxeRegionale, 172);
  assert.ok(r.notes.some((n) => n.includes("malus")));
});

test("électrique avec exonération régionale totale", () => {
  const tarifs = { ...TARIFS, REGIONS: [{ id: "x", nom: "Test", cheval: 50, exoElectrique: 1 }] };
  const r = calculerCarteGrise({ tarifs, regionId: "x", chevaux: 3, energie: "electrique", dateMEC: "2024-01-01", demarche: "occasion", aujourdhui });
  assert.strictEqual(r.taxeRegionale, 0);
  assert.strictEqual(r.total, 13.76);
});

test("changement d'adresse gratuit", () => {
  const r = calculerCarteGrise({ tarifs: TARIFS, regionId: "idf", demarche: "adresse", aujourdhui });
  assert.strictEqual(r.total, 0);
});
