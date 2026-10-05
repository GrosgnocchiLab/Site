/*
 * Barème du certificat d'immatriculation (carte grise) — voitures particulières.
 *
 * ⚠️ Les tarifs régionaux changent chaque année (souvent au 1er janvier).
 * Vérifiez-les sur service-public.fr ou sur le site de chaque région
 * avant la mise en ligne, puis mettez à jour DERNIERE_MAJ.
 */
window.TARIFS = {
  DERNIERE_MAJ: "2026-10",

  // Y4 : taxe fixe (€)
  TAXE_FIXE: 11,

  // Y5 : redevance d'acheminement du titre (€)
  REDEVANCE_ACHEMINEMENT: 2.76,

  // Réduction de la taxe régionale pour les véhicules de plus de 10 ans
  REDUCTION_PLUS_10_ANS: 0.5,

  // Y1 : prix du cheval fiscal par région (€)
  // exoElectrique : part exonérée pour les véhicules électriques/hydrogène
  // (0 = aucune exonération, 0.5 = moitié, 1 = totale) — décidé par chaque région.
  REGIONS: [
    { id: "ara", nom: "Auvergne-Rhône-Alpes", cheval: 43, exoElectrique: 0 },
    { id: "bfc", nom: "Bourgogne-Franche-Comté", cheval: 60, exoElectrique: 0 },
    { id: "bre", nom: "Bretagne", cheval: 60, exoElectrique: 0 },
    { id: "cvl", nom: "Centre-Val de Loire", cheval: 60, exoElectrique: 0 },
    { id: "cor", nom: "Corse", cheval: 53, exoElectrique: 0 },
    { id: "ges", nom: "Grand Est", cheval: 60, exoElectrique: 0 },
    { id: "hdf", nom: "Hauts-de-France", cheval: 42, exoElectrique: 0 },
    { id: "idf", nom: "Île-de-France", cheval: 54.95, exoElectrique: 0 },
    { id: "nor", nom: "Normandie", cheval: 60, exoElectrique: 0 },
    { id: "naq", nom: "Nouvelle-Aquitaine", cheval: 58, exoElectrique: 0 },
    { id: "occ", nom: "Occitanie", cheval: 59.5, exoElectrique: 0 },
    { id: "pdl", nom: "Pays de la Loire", cheval: 59, exoElectrique: 0 },
    { id: "pac", nom: "Provence-Alpes-Côte d'Azur", cheval: 60, exoElectrique: 0 },
    { id: "glp", nom: "Guadeloupe", cheval: 41, exoElectrique: 0 },
    { id: "guf", nom: "Guyane", cheval: 42.5, exoElectrique: 0 },
    { id: "mtq", nom: "Martinique", cheval: 35, exoElectrique: 0 },
    { id: "may", nom: "Mayotte", cheval: 30, exoElectrique: 0 },
    { id: "reu", nom: "La Réunion", cheval: 51, exoElectrique: 0 }
  ]
};
