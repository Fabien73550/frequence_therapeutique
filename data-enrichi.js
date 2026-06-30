// ============================================================
// DATA-ENRICHI.JS — Données supplémentaires pour l'app THQV
// Toutes les fréquences vérifiées : somme des chiffres = 9 (ou 18, 27...)
// ============================================================

// ----------------------------------------------------------
// 1. PATHOGENES — Virus, bactéries, parasites, champignons
// Catégorie à ajouter : "Pathogene"
// ----------------------------------------------------------
const PATHOGENES = [
  // ---- Lyme / Borrelia ----
  {nom:"Borrelia burgdorferi", hz:432, duree:15, cat:"Pathogene", action:"Maladie de Lyme - souche principale"},
  {nom:"Lyme complexe", hz:864, duree:15, cat:"Pathogene", action:"Lyme - co-infection"},
  {nom:"Babesia", hz:570.6, duree:15, cat:"Pathogene", action:"Parasite - co-infection Lyme"},
  // ---- Virus ----
  {nom:"EBV (Epstein-Barr)", hz:744.3, duree:15, cat:"Pathogene", action:"Mononucléose - fatigue chronique"},
  {nom:"Herpès HSV1", hz:657, duree:15, cat:"Pathogene", action:"Herpès labial - bouton de fièvre"},
  {nom:"Herpès HSV2", hz:556.2, duree:15, cat:"Pathogene", action:"Herpès génital"},
  {nom:"Herpès Zona", hz:664.2, duree:15, cat:"Pathogene", action:"Zona - varicelle"},
  {nom:"Grippe Influenza A", hz:776.7, duree:15, cat:"Pathogene", action:"Grippe saisonnière A"},
  {nom:"Grippe Influenza B", hz:468, duree:15, cat:"Pathogene", action:"Grippe saisonnière B"},
  // ---- Bactéries ----
  {nom:"Staphylocoque doré", hz:728.1, duree:15, cat:"Pathogene", action:"Staphylococcus aureus - infections"},
  {nom:"Streptocoque", hz:880.2, duree:15, cat:"Pathogene", action:"Streptococcus - infections gorge"},
  {nom:"Helicobacter pylori", hz:880.2, duree:15, cat:"Pathogene", action:"Ulcère gastrique - digestion"},
  {nom:"Chlamydia", hz:430.2, duree:15, cat:"Pathogene", action:"Chlamydia trachomatis - IST"},
  // ---- Champignons ----
  {nom:"Candida albicans", hz:465.3, duree:15, cat:"Pathogene", action:"Candidose - levure intestinale"},
  // ---- Parasites ----
  {nom:"Parasites intestinaux", hz:690.3, duree:15, cat:"Pathogene", action:"Parasitose - nettoyage"},
];

// ----------------------------------------------------------
// 2. NOUVEAUX ORGANES (catégorie "Organe")
// À fusionner dans MINERAUX existant
// ----------------------------------------------------------
const NOUVEAUX_ORGANES = [
  {nom:"Cœur", hz:81, duree:10, cat:"Organe", action:"Rythme cardiaque - circulation"},
  {nom:"Poumons", hz:9, duree:10, cat:"Organe", action:"Respiration - oxygénation"},
  {nom:"Reins", hz:20.7, duree:10, cat:"Organe", action:"Filtration sanguine - détox"},
  {nom:"Rate", hz:20.7, duree:10, cat:"Organe", action:"Immunité - globules rouges"},
  {nom:"Vésicule biliaire", hz:727.2, duree:10, cat:"Organe", action:"Digestion des graisses"},
  {nom:"Intestin grêle", hz:440.1, duree:10, cat:"Organe", action:"Absorption des nutriments"},
  {nom:"Gros intestin", hz:802.8, duree:10, cat:"Organe", action:"Élimination - flore intestinale"},
  {nom:"Vessie", hz:880.2, duree:10, cat:"Organe", action:"Élimination urinaire"},
  {nom:"Estomac", hz:664.2, duree:10, cat:"Organe", action:"Digestion - acidité gastrique"},
  {nom:"Duodénum", hz:223.2, duree:10, cat:"Organe", action:"Absorption - digestion initiale"},
];

// ----------------------------------------------------------
// 3. PROTOCOLES PATHOGENES
// Nouveaux protocoles pour pathogènes
// ----------------------------------------------------------
const PROTOCOLES_PATHOGENES = [
  {nom:"Lyme - Protocole complet",
   s1:[
     {n:"Borrelia burgdorferi", hz:432, d:15},
     {n:"Lyme complexe", hz:864, d:15},
     {n:"Babesia", hz:570.6, d:15}
   ],
   s2:[
     {n:"Drainage Lyme", hz:625.5, d:15},
     {n:"Régénération", hz:787.5, d:10}
   ],
   note:"Source CAFL / Lyme Disease"},

  {nom:"Herpès - Protocole",
   s1:[
     {n:"HSV1", hz:657, d:15},
     {n:"HSV2", hz:556.2, d:15}
   ],
   s2:[
     {n:"Régénération tissus", hz:787.5, d:10}
   ],
   note:"Source CAFL / Herpes"},

  {nom:"Candida - Nettoyage",
   s1:[
     {n:"Candida albicans", hz:465.3, d:15},
     {n:"Candida profond", hz:3176.1, d:10}
   ],
   s2:[
     {n:"Régénération flore", hz:880.2, d:10},
     {n:"Soutien immunitaire", hz:3118.313016, d:10}
   ],
   note:"Source CAFL / Candida"},

  {nom:"Grippe - Soulagement",
   s1:[
     {n:"Influenza A", hz:776.7, d:15},
     {n:"Influenza B", hz:468, d:15}
   ],
   s2:[
     {n:"Soutien immunitaire", hz:3118.313016, d:10},
     {n:"Récupération", hz:2663.539155, d:10}
   ],
   note:"Source CAFL / Influenza"},

  {nom:"EBV - Fatigue chronique",
   s1:[
     {n:"EBV (Epstein-Barr)", hz:744.3, d:15},
     {n:"Drainage viral", hz:660.6, d:15}
   ],
   s2:[
     {n:"Régénération", hz:787.5, d:10},
     {n:"Soutien immunitaire", hz:3766.014000, d:10}
   ],
   note:"Source CAFL / EBV"},

  {nom:"Infection bactérienne",
   s1:[
     {n:"Staphylocoque", hz:728.1, d:15},
     {n:"Streptocoque", hz:880.2, d:15},
     {n:"Helicobacter pylori", hz:880.2, d:15}
   ],
   s2:[
     {n:"Soutien immunitaire", hz:3118.313016, d:10},
     {n:"Régénération", hz:2663.539155, d:10}
   ],
   note:"Source CAFL / Bactéries"},

  {nom:"Parasites - Nettoyage",
   s1:[
     {n:"Parasites intestinaux", hz:690.3, d:15},
     {n:"Drainage profond", hz:802.8, d:10}
   ],
   s2:[
     {n:"Régénération intestinale", hz:880.2, d:10},
     {n:"Soutien immunitaire", hz:3766.014000, d:10}
   ],
   note:"Source CAFL / Parasites"},
];

// ----------------------------------------------------------
// 4. Fonction utilitaire de vérification base 9
// ----------------------------------------------------------
function estBase9(hz) {
  var s = Math.abs(hz).toString().replace('.','').replace('-','');
  while(s.length > 1) {
    s = s.split('').reduce(function(a,b){return a+parseInt(b);},0).toString();
  }
  return s === '9';
}
