# SimulAuto — Simulateur du prix de la carte grise

Site statique (HTML/CSS/JS, sans build) qui calcule le coût d'une carte grise
selon la région, la puissance fiscale, l'énergie et l'âge du véhicule.
Monétisation : Google AdSense (4 emplacements prêts).

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Page du simulateur + contenu SEO + FAQ |
| `js/tarifs.js` | **Barème** (prix du cheval par région, taxes fixes) — à tenir à jour |
| `js/calcul.js` | Logique de calcul (testée) |
| `js/app.js`, `js/regions.js` | Interface |
| `js/pub.js` | Chargement des publicités AdSense |
| `mentions-legales.html`, `confidentialite.html` | Pages légales (obligatoires pour AdSense) |
| `ads.txt`, `robots.txt`, `sitemap.xml` | Fichiers techniques |

## Tester en local

    python3 -m http.server 8000      # puis ouvrir http://localhost:8000
    node --test tests/*.test.js      # tests du calcul

## Mise en ligne (gratuit)

GitHub Pages, Netlify ou Cloudflare Pages : publier la racine du dépôt tel quel.
Achetez ensuite un nom de domaine (≈ 10 €/an) et remplacez `https://www.example.fr`
dans `index.html`, `robots.txt` et `sitemap.xml`.

## Activer la publicité (Google AdSense)

1. Remplir `mentions-legales.html` et `confidentialite.html` (champs entre crochets).
2. Mettre le site en ligne avec son domaine, puis s'inscrire sur https://adsense.google.com.
3. Dans `js/pub.js`, remplacer `ca-pub-XXXXXXXXXXXXXXXX` par votre identifiant éditeur.
4. Dans `ads.txt`, remplacer `pub-XXXXXXXXXXXXXXXX` par le même identifiant.
5. Créer 4 blocs d'annonces dans AdSense et reporter leurs ID dans les attributs
   `data-slot` de `index.html` (`1111111111` … `4444444444`).
6. **RGPD** : dans AdSense → *Confidentialité et messages*, activer le message de
   consentement européen (CMP certifiée, obligatoire pour l'UE).

Tant que l'identifiant n'est pas configuré, les emplacements apparaissent en pointillés.

## À faire avant la mise en ligne

- [ ] Vérifier chaque tarif régional dans `js/tarifs.js` (service-public.fr / site de la région)
      ainsi que les exonérations pour les véhicules électriques (`exoElectrique`).
- [ ] Mettre à jour `DERNIERE_MAJ`.
