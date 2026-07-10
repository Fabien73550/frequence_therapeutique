// ============================================================
// DATA.JS — Toutes les données pour l'app Fréquences Thérapeutiques
// ============================================================

const GUIDE=[
  {t:"🔵 Onde Binaurale 🎧",k:["binaural"],c:"<b>🤔 Qu'est-ce qu'un battement binaural ?</b><br><br>Le cerveau 🧠 crée une fréquence virtuelle quand chaque oreille 👂 entend une fréquence légèrement différente.<br><br>📌 <b>Exemple</b> : 432 Hz à gauche + 433.2 Hz à droite = battement de <b>1.2 Hz</b><br><br>🎧 <b>Casque indispensable !</b> Sans casque, chaque oreille entend les deux sons et l'effet ne fonctionne pas.<br><br>🎯 <b>Fréquence de base</b> = celle que tu choisis (ex: 432 Hz).<br>⚡ <b>Battement</b> = la différence entre les deux oreilles (ex: 1.2 Hz pour Delta)."},
  {t:"🎵 Onglet Binaural 🎛️",k:["binaural"],c:"<b>① Choisis ta fréquence</b> 🎚️ avec le slider (← glisser →) ou tape la valeur directement.<br><br><b>② Préréglages rapides</b> ⚡ :<br>🌙 Delta (sommeil profond)<br>🧘 Thêta (méditation)<br>😌 Alpha (relaxation)<br><br><b>③ Minuteur</b> ⏱️ : choisis une durée ou 'inf' pour illimité.<br><br><b>④ Lance</b> ▶️ avec le bouton et mets ton casque !"},
  {t:"⬡ Onglet Minéraux 💎",k:["mineraux"],c:"<b>Parcours les catégories</b> 📂 : Élément, Minéral, Neuro, Organe...<br><br><b>➕ <span style='color:var(--amber)'>+M</span></b> = ajoute la fréquence à la Playlist Matin ☀️<br><b>➕ <span style='color:var(--purple)'>+S</span></b> = ajoute à la Playlist Soir 🌙<br><br><b>⭐</b> = met en favori pour la retrouver dans l'onglet Favoris<br><br>👆 Clique sur une fréquence pour la charger et l'écouter."},
  {t:"♫ Onglet Perso 📋",k:["perso"],c:"<b>☀️ Playlist Matin</b> et <b>🌙 Playlist Soir</b><br><br>Ajoute des fréquences depuis Minéraux avec +M ou +S.<br><br>⭐ <b>☆</b> = mettre la playlist en favori<br>🗑️ <b>Vider</b> = supprimer toutes les fréquences<br>▶️ <b>Lancer</b> = écouter toute la playlist<br><br>💾 Tu peux <b>sauvegarder</b> une playlist avec un nom personnalisé."},
  {t:"⊞ Protocoles / ✦ Symptômes / 🦠 Pathogènes / ✧ Éveil 📚",k:["protocoles","symptomes","pathogenes","eveil"],c:"<b>⊞ Protocoles</b> : fréquences organisées par thème (Détox 🧪, Immunité 🛡️...).<br><br><b>✦ Symptômes</b> : choisis un symptôme 🤒 → 2 séquences :<br>• S1 = 🧹 Nettoyage<br>• S2 = 🔧 Réparation<br><br><b>🦠 Pathogènes</b> : virus, bactéries, parasites et champignons avec leurs fréquences spécifiques.<br><br><b>✧ Éveil</b> : les 9 chakras 🔮 avec leurs fréquences. Clique sur un chakra pour le charger.<br><br>▶️ Utilise <b>Lancer</b> pour écouter directement une séquence."},
  {t:"⭐ Favoris et Partage 📤",k:["favs"],c:"<b>⭐ Favoris</b> : retrouve toutes tes playlists et fréquences sauvegardées. Clique sur ★ pour retirer un favori.<br><br><b>📤 Partager</b> :<br>• Le bouton <span style='color:var(--green)'>📤 vert</span> à côté d'une playlist = partager seulement celle-ci ➡️ idéal pour envoyer à un ami<br>• Le bouton <b>📤 Partager mes favoris</b> en bas = tout partager<br><br>🔗 Quand tu partages, le <b>lien cliquable</b> généré permet à tes amis de :<br>1️⃣ Cliquer sur le lien<br>2️⃣ Ouvrir l'appli<br>3️⃣ Voir les fréquences chargées automatiquement ✨<br><br>📱 Compatible WhatsApp, SMS, Email, Messenger..."},
  {t:"⏸ Pause et Reprendre",k:[],c:"Pendant l ecoute, tu peux <b>mettre en pause</b> avec le bouton.<br><br>La session est sauvegardee <b>automatiquement</b> dans ton telephone.<br><br>Quand tu reviens, une barre en haut te propose de <b>reprendre</b> la ou tu t es arrete.<br><br><b>Utile</b> si tu dois interrompre ta seance et la continuer plus tard !"}
];

const CHAKRAS=[
  {nom:"Racine",hz:432,duree:14},{nom:"Sacral",hz:468,duree:13},{nom:"Plexus solaire",hz:504,duree:12},
  {nom:"Coeur bas",hz:540,duree:11},{nom:"Coeur",hz:576,duree:10},{nom:"Haut-coeur",hz:612,duree:10},
  {nom:"Gorge",hz:648,duree:10},{nom:"3eme oeil",hz:684,duree:10},{nom:"Couronne",hz:756,duree:10}
];

const ONDES=[
  {nom:"D 1.2",diff:1.2,label:"Delta 1.2 Hz"},{nom:"D 3",diff:3,label:"Delta 3 Hz"},
  {nom:"T 4",diff:4,label:"Theta 4 Hz"},{nom:"T 6",diff:6,label:"Theta 6 Hz"},
  {nom:"T 8",diff:8,label:"Theta 8 Hz"},{nom:"A 10",diff:10,label:"Alpha 10 Hz"},
  {nom:"A 12",diff:12,label:"Alpha 12 Hz"}
];

const TIMERS=[{l:"inf",v:0},{l:"10",v:10},{l:"13",v:13},{l:"18",v:18},{l:"22",v:22},{l:"30",v:30}];

const MINERAUX=[
{nom:"Acétylcholine",hz:3486.758535,duree:10,cat:"Neuro",action:"Mémoire et concentration"},
{nom:"Acide aspartique", hz:6348.232818, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 133.1 g/mol", hz2:396.764584},
{nom:"Acide glutamique", hz:7017.396660, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 147.13 g/mol", hz2:438.587327},
{nom:"Adrénaline",hz:8737.953759,duree:10,cat:"Neuro",action:"Énergie urgence, vigilance"},
{nom:"Alanine", hz:4249.166508, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 89.09 g/mol", hz2:265.572928},
{nom:"Aluminium",hz:1286.890245,duree:10,cat:"Element",action:"Structure cellulaire"},
{nom:"Argent",hz:5144.796756,duree:10,cat:"Oligo",action:"Antimicrobien naturel"},
{nom:"Arginine", hz:8308.506069, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 174.2 g/mol", hz2:519.281672},
{nom:"Argon",hz:1905.328368,duree:10,cat:"Element",action:"Équilibre vibratoire"},
{nom:"Asparagine", hz:6301.491516, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 132.12 g/mol", hz2:393.843252},
{nom:"Azote",hz:668.052531,duree:10,cat:"Element",action:"Synthèse protéique"},
{nom:"Babesia", hz:570.6, duree:15, cat:"Pathogene", action:"Parasite - co-infection Lyme"},
{nom:"Baryum",hz:6549.840486,duree:10,cat:"Mineral",action:"Système nerveux"},
{nom:"Bore",hz:515.632941,duree:10,cat:"Mineral",action:"Os et articulations"},
{nom:"Borrelia burgdorferi", hz:432, duree:15, cat:"Pathogene", action:"Maladie de Lyme - souche principale"},
{nom:"Calcium",hz:3024.000000,duree:10,cat:"Mineral",action:"Os et muscles"},
{nom:"Candida albicans", hz:465.3, duree:15, cat:"Pathogene", action:"Candidose - levure intestinale"},
{nom:"Carbone",hz:572.852898,duree:10,cat:"Element",action:"Régénération cellulaire"},
{nom:"Cesium",hz:6338.953809,duree:10,cat:"Mineral",action:"Équilibre cellulaire"},
{nom:"Chlamydia", hz:430.2, duree:15, cat:"Pathogene", action:"Chlamydia trachomatis - IST"},
{nom:"Chlore",hz:1690.924077,duree:10,cat:"Element",action:"Immunité intestinale"},
{nom:"Chrome",hz:2479.965057,duree:10,cat:"Mineral",action:"Glycémie et insuline"},
{nom:"Cœur", hz:81, duree:10, cat:"Organe", action:"Rythme cardiaque - circulation"},
{nom:"CoQ10",hz:2573.574066,duree:10,cat:"Vitamine",action:"Énergie mitochondriale"},
{nom:"Cortisol",hz:17287.606827,duree:10,cat:"Neuro",action:"Stress, inflammation"},
{nom:"Cuivre",hz:3030.839991,duree:10,cat:"Mineral",action:"Antiviral et collagène"},
{nom:"Cystéine",hz:5778.465813,duree:10,cat:"AA",action:"Antioxydant, détox"},
{nom:"Deutérium",hz:768.465216,duree:10,cat:"Element",action:"Isotope hydrogène"},
{nom:"Dopamine",hz:3652.976349,duree:10,cat:"Neuro",action:"Motivation et plaisir"},
{nom:"Duodénum", hz:223.2, duree:10, cat:"Organe", action:"Absorption - digestion initiale"},
{nom:"Eau H2O",hz:1388.000007,duree:10,cat:"Molecule",action:"Hydratation cellulaire Lavoie"},
{nom:"EBV (Epstein-Barr)", hz:744.3, duree:15, cat:"Pathogene", action:"Mononucléose - fatigue chronique"},
{nom:"Estomac", hz:664.2, duree:10, cat:"Organe", action:"Digestion - acidité gastrique"},
{nom:"Etain",hz:5661.898713,duree:10,cat:"Oligo",action:"Croissance, vitalité"},
{nom:"Fer",hz:2663.539155,duree:10,cat:"Mineral",action:"Transport oxygène"},
{nom:"Fluor",hz:906.132870,duree:10,cat:"Element",action:"Renforcement os et dents"},
{nom:"Foie",hz:832.000005,duree:10,cat:"Organe",action:"Détox et filtration"},
{nom:"GABA",hz:4918.330341,duree:10,cat:"Neuro",action:"Calme et sommeil"},
{nom:"Gallium",hz:3325.453317,duree:10,cat:"Mineral",action:"Antimicrobien, os"},
{nom:"Germanium",hz:3464.103303,duree:10,cat:"Mineral",action:"Oxygénation cellulaire"},
{nom:"Glande pinéale",hz:1296,duree:10,cat:"Organe",action:"Mélatonine et cycles"},
{nom:"Globe oculaire",hz:1472.000004,duree:10,cat:"Organe",action:"Soutien vision"},
{nom:"Glutamine", hz:6970.655349, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 146.15 g/mol", hz2:435.665995},
{nom:"Glutathion",hz:3664.423197,duree:10,cat:"Vitamine",action:"Antioxydant majeur"},
{nom:"Glycine", hz:3580.341309, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 75.03 g/mol", hz2:223.660757},
{nom:"Grippe Influenza A", hz:776.7, duree:15, cat:"Pathogene", action:"Grippe saisonnière A"},
{nom:"Grippe Influenza B", hz:468, duree:15, cat:"Pathogene", action:"Grippe saisonnière B"},
{nom:"Gros intestin", hz:802.8, duree:10, cat:"Organe", action:"Élimination - flore intestinale"},
{nom:"Helicobacter pylori", hz:880.2, duree:15, cat:"Pathogene", action:"Ulcère gastrique - digestion"},
{nom:"Hélium",hz:763.619832,duree:10,cat:"Element",action:"Relaxation profonde"},
{nom:"Herpès HSV1", hz:657, duree:15, cat:"Pathogene", action:"Herpès labial - bouton de fièvre"},
{nom:"Herpès HSV2", hz:556.2, duree:15, cat:"Pathogene", action:"Herpès génital"},
{nom:"Herpès Zona", hz:664.2, duree:15, cat:"Pathogene", action:"Zona - varicelle"},
{nom:"Histamine",hz:5301.322902,duree:10,cat:"Neuro",action:"Réaction allergique"},
{nom:"Histidine", hz:7400.389212, duree:10, cat:"AA", action:"Acide amine Essentiel - PM 155.16 g/mol", hz2:462.524364},
{nom:"Hydrogène",hz:769.095360,duree:10,cat:"Element",action:"Équilibre énergétique"},
{nom:"Hypothalamus",hz:999,duree:10,cat:"Organe",action:"Chef orchestre hormonal"},
{nom:"Indium",hz:5476.268943,duree:10,cat:"Oligo",action:"Absorption minéraux, hormones"},
{nom:"Intestin grêle", hz:440.1, duree:10, cat:"Organe", action:"Absorption des nutriments"},
{nom:"Iode",hz:6052.735701,duree:10,cat:"Mineral",action:"Thyroïde T3 et T4"},
{nom:"Isoleucine", hz:6256.181061, duree:10, cat:"AA", action:"Acide amine Essentiel - PM 131.17 g/mol", hz2:391.011348},
{nom:"Lanthane",hz:6625.125945,duree:10,cat:"Mineral",action:"Soutien cognitif"},
{nom:"Leucine", hz:6256.400463, duree:10, cat:"AA", action:"Acide amine Essentiel - PM 131.17 g/mol", hz2:391.011348},
{nom:"Lithium",hz:662.124024,duree:10,cat:"Element",action:"Stabilisation humeur"},
{nom:"Lyme complexe", hz:864, duree:15, cat:"Pathogene", action:"Lyme - co-infection"},
{nom:"Lysine", hz:6972.52977, duree:10, cat:"AA", action:"Acide amine Essentiel - PM 146.19 g/mol", hz2:435.785233},
{nom:"Magnésium",hz:1159.232148,duree:10,cat:"Mineral",action:"Anti-stress et énergie"},
{nom:"Manganèse",hz:2620.281744,duree:10,cat:"Mineral",action:"Antioxydant osseux"},
{nom:"Mélatonine",hz:2769.661008,duree:10,cat:"Neuro",action:"Hormone du sommeil"},
{nom:"Méthionine",hz:7116.497766,duree:10,cat:"AA",action:"Détox, foie"},
{nom:"Molybdène",hz:4576.355667,duree:10,cat:"Mineral",action:"Détox hépatique"},
{nom:"Néon",hz:962.475084,duree:10,cat:"Element",action:"Équilibre électromagnétique"},
{nom:"Nickel",hz:2799.341730,duree:10,cat:"Mineral",action:"Soutien enzymatique"},
{nom:"Noradrénaline",hz:4034.538045,duree:10,cat:"Neuro",action:"Vigilance et focus"},
{nom:"Or",hz:4697.181234,duree:10,cat:"Oligo",action:"Fonctions cognitives"},
{nom:"Oxygène",hz:763.094781,duree:10,cat:"Element",action:"Respiration cellulaire"},
{nom:"Palladium",hz:5075.724546,duree:10,cat:"Oligo",action:"Détox, foie"},
{nom:"Pancréas",hz:3724.000002,duree:10,cat:"Organe",action:"Insuline et digestion"},
{nom:"Parasites intestinaux", hz:690.3, duree:15, cat:"Pathogene", action:"Parasitose - nettoyage"},
{nom:"Phénylalanine",hz:7878.858048,duree:10,cat:"AA",action:"Neurotransmetteurs"},
{nom:"Phosphore",hz:1477.300140,duree:10,cat:"Element",action:"Mémoire et ATP"},
{nom:"Platine",hz:4652.286444,duree:10,cat:"Oligo",action:"Soutien oncologie"},
{nom:"Potassium",hz:1864.751742,duree:10,cat:"Mineral",action:"Rythme cardiaque"},
{nom:"Poumons", hz:9, duree:10, cat:"Organe", action:"Respiration - oxygénation"},
{nom:"Proline", hz:5491.24047, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 115.13 g/mol", hz2:343.196894},
{nom:"Radium",hz:10779.118092,duree:10,cat:"Mineral",action:"Régénération tissulaire"},
{nom:"Rate", hz:20.7, duree:10, cat:"Organe", action:"Immunité - globules rouges"},
{nom:"Reins", hz:20.7, duree:10, cat:"Organe", action:"Filtration sanguine - détox"},
{nom:"Rhodium",hz:4908.099717,duree:10,cat:"Oligo",action:"Soutien ADN, anticancer"},
{nom:"Rubidium",hz:4076.404911,duree:10,cat:"Mineral",action:"Système nerveux, humeur"},
{nom:"Scandium",hz:2144.181600,duree:10,cat:"Mineral",action:"Soutien osseux, immunité"},
{nom:"Sélénium",hz:3766.014000,duree:10,cat:"Mineral",action:"Antioxydant profond"},
{nom:"Sérine",hz:5012.452071,duree:10,cat:"AA",action:"Membranes, cerveau"},
{nom:"Sérotonine",hz:4202.186724,duree:10,cat:"Neuro",action:"Humeur et bien-être"},
{nom:"Silicium",hz:1339.543899,duree:10,cat:"Element",action:"Cartilage et muqueuses"},
{nom:"Sodium",hz:1096.501932,duree:10,cat:"Element",action:"Équilibre osmotique"},
{nom:"Soufre",hz:1529.346996,duree:10,cat:"Element",action:"Détox et glutathion"},
{nom:"Staphylocoque doré", hz:728.1, duree:15, cat:"Pathogene", action:"Staphylococcus aureus - infections"},
{nom:"Streptocoque", hz:880.2, duree:15, cat:"Pathogene", action:"Streptococcus - infections gorge"},
{nom:"Strontium",hz:4179.054546,duree:10,cat:"Mineral",action:"Densité osseuse"},
{nom:"Tellure",hz:6085.909152,duree:10,cat:"Oligo",action:"Détox auto-immune"},
{nom:"Thréonine",hz:5681.468052,duree:10,cat:"AA",action:"Système immunitaire"},
{nom:"Thymus",hz:2442.000006,duree:10,cat:"Organe",action:"Immunité lymphocytes T"},
{nom:"Titane",hz:2283.026751,duree:10,cat:"Mineral",action:"Solidité osseuse"},
{nom:"Tryptophane", hz:9740.716992, duree:10, cat:"AA", action:"Acide amine Essentiel - PM 204.23 g/mol", hz2:608.799632},
{nom:"Tyrosine", hz:8641.952838, duree:10, cat:"AA", action:"Acide amine Non-essentiel - PM 181.19 g/mol", hz2:540.118519},
{nom:"Valine", hz:5587.389252, duree:10, cat:"AA", action:"Acide amine Essentiel - PM 117.15 g/mol", hz2:349.218415},
{nom:"Vanadium",hz:2429.665686,duree:10,cat:"Mineral",action:"Tension artérielle"},
{nom:"Vésicule biliaire", hz:727.2, duree:10, cat:"Organe", action:"Digestion des graisses"},
{nom:"Vessie", hz:880.2, duree:10, cat:"Organe", action:"Élimination urinaire"},
{nom:"Vitamine C",hz:4200.040431,duree:10,cat:"Vitamine",action:"Immunité et collagène"},
{nom:"Vitamine D",hz:4586.371668,duree:10,cat:"Vitamine",action:"Calcium et immunité"},
{nom:"Vitamine A (rétinol)", hz:13662.293706,duree:10,cat:"Vitamine",action:"PM 286.45 g/mol",hz2:853.893426},
{nom:"Vitamine B1 (thiamine)", hz:12655.924713,duree:10,cat:"Vitamine",action:"PM 265.35 g/mol",hz2:790.995359},
{nom:"Vitamine B2 (riboflavine)", hz:17950.570281,duree:10,cat:"Vitamine",action:"PM 376.36 g/mol",hz2:1121.910735},
{nom:"Vitamine B3 (niacine)", hz:5871.757644,duree:10,cat:"Vitamine",action:"PM 123.11 g/mol",hz2:366.984883},
{nom:"Vitamine B5 (pantothénique)", hz:10456.221501,duree:10,cat:"Vitamine",action:"PM 219.23 g/mol",hz2:653.513897},
{nom:"Vitamine B6 (pyridoxine)",hz:8069.076099,duree:10,cat:"Vitamine",action:"PM 169.18 g/mol",hz2:504.317297},
{nom:"Vitamine B7 (biotine)", hz:11652.417432,duree:10,cat:"Vitamine",action:"PM 244.31 g/mol",hz2:728.276149},
{nom:"Vitamine B9 (folique)", hz:21052.666926,duree:10,cat:"Vitamine",action:"PM 441.4 g/mol",hz2:1315.79179},
{nom:"Vitamine B12 (cobalamine)", hz:64644.660549,duree:10,cat:"Vitamine",action:"PM 1355.37 g/mol",hz2:4040.291615},
{nom:"Vitamine D3 (cholécalciférol)", hz:18345.486645,duree:10,cat:"Vitamine",action:"PM 384.64 g/mol",hz2:1146.593009},
{nom:"Vitamine E (tocophérol)", hz:20542.805100,duree:10,cat:"Vitamine",action:"PM 430.71 g/mol",hz2:1283.925424},
{nom:"Vitamine K1 (phylloquinone)", hz:21496.232403,duree:10,cat:"Vitamine",action:"PM 450.7 g/mol",hz2:1343.514635},
{nom:"Vitamine K2 (ménaquinone)",hz:21207.676365,duree:10,cat:"Vitamine",action:"PM 444.65 g/mol",hz2:1325.479881},
{nom:"Xénon",hz:6262.047576,duree:10,cat:"Neuro",action:"Relaxation profonde"},
{nom:"Zinc",hz:3118.313016,duree:10,cat:"Mineral",action:"Immunité cellulaire"},
{nom:"Taurine", hz:5969.055879,duree:10,cat:"Acide",action:"Cœur, foie, yeux, système nerveux — PM 125.15 g/mol",hz2:373.066023},
{nom:"Citrulline", hz:8355.724326,duree:10,cat:"Acide",action:"Circulation, performance, NO — PM 175.19 g/mol",hz2:522.232813},
{nom:"Ac. alpha-lipoïque", hz:9840.953250,duree:10,cat:"Acide",action:"Antioxydant puissant, détox — PM 206.33 g/mol",hz2:615.059629},
{nom:"Ac. hyaluronique", hz:19140.088887,duree:10,cat:"Acide",action:"Articulations, peau, hydratation — PM 401.3 g/mol",hz2:1196.255654},
{nom:"EPA (Oméga-3)",hz:14425.417107,duree:10,cat:"Acide",action:"Cardio, anti-inflammatoire — PM 302.45 g/mol",hz2:901.588643},
{nom:"DHA (Oméga-3)",hz:15667.400448,duree:10,cat:"Acide",action:"Cerveau, rétine, anti-inflammatoire — PM 328.49 g/mol",hz2:979.212608},
{nom:"Oméga-6 (linoléique)", hz:13376.122425,duree:10,cat:"Acide",action:"Peau, hormones, inflammation — PM 280.45 g/mol",hz2:836.00772},
{nom:"Carnitine", hz:7688.468304,duree:10,cat:"Acide",action:"Énergie mitochondriale, muscles — PM 161.2 g/mol",hz2:480.529308},
{nom:"NAC (N-acétyl cystéine)", hz:7783.858728,duree:10,cat:"Acide",action:"Poumons, foie, antioxydant — PM 163.2 g/mol",hz2:486.49121},
{nom:"Resvératrol", hz:10885.955364,duree:10,cat:"Molecule",action:"Antioxydant, cardio, anti-âge — PM 228.24 g/mol",hz2:680.372266},
{nom:"Quercétine", hz:14415.401115,duree:10,cat:"Molecule",action:"Anti-inflammatoire, immunité — PM 302.24 g/mol",hz2:900.962643},
{nom:"Inositol", hz:8592.769539,duree:10,cat:"Molecule",action:"Cerveau, fertilité, métabolisme — PM 180.16 g/mol",hz2:537.04814},
];

const PROTOCOLES=[
{nom:"Anti-stress biochimique",s1:[{n:"Lithium",hz:662.124024,d:10},{n:"Magnesium",hz:1159.232148,d:10},{n:"GABA",hz:4918.330341,d:10}],s2:[{n:"Serotonine",hz:4202.186724,d:10},{n:"Helium",hz:763.619832,d:10}],note:"Source Lavoie / Systeme nerveux"},
{nom:"Anxiété / Burn-out",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Helium",hz:763.619832,d:10}],s2:[{n:"Fer",hz:2663.539155,d:10},{n:"Magnésium",hz:1159.232148,d:10},{n:"GABA",hz:4918.330341,d:10},{n:"Serotonine",hz:4202.186724,d:10}]},
{nom:"Anxiété Burn-out THQV",s1:[{n:"Lithium",hz:331.062012,d:18},{n:"Magnesium",hz:1159.232148,d:10},{n:"GABA",hz:4918.330341,d:10}],s2:[{n:"Helium",hz:763.619832,d:10},{n:"Serotonine",hz:4202.186724,d:10}],note:"Source THQV"},
{nom:"Anxiété Stress",s1:[{n:"Apaisement",hz:1.8,d:10},{n:"Calme",hz:3.6,d:10},{n:"Equilibre",hz:6.3,d:10},{n:"Schumann",hz:7.83,d:10}],s2:[{n:"Detente",hz:35.1,d:10},{n:"Ancrage",hz:72.9,d:10},{n:"Harmonisation",hz:787.5,d:10}],note:"Source CAFL / Systeme nerveux"},
{nom:"Arthrite général",s1:[{n:"Principal",hz:120.6,d:20},{n:"Tonus",hz:727.2,d:10},{n:"Harmonisation",hz:787.5,d:10},{n:"Respiration",hz:880.2,d:10},{n:"Soutien",hz:1551.6,d:10},{n:"Equilibre",hz:801.9,d:10},{n:"Regeneration",hz:1664.1,d:10},{n:"Circulation",hz:79.2,d:10},{n:"Ancrage",hz:58.5,d:10},{n:"Detente",hz:39.6,d:10}],s2:[{n:"Calme",hz:29.7,d:10},{n:"Vitalite",hz:25.2,d:10},{n:"Energie",hz:26.1,d:10},{n:"Nettoyage",hz:19.8,d:10},{n:"Focus",hz:10.8,d:10},{n:"Mental",hz:2500.2,d:10},{n:"Schumann",hz:7.83,d:10},{n:"Apaisement",hz:3.6,d:10},{n:"Douceur",hz:1.8,d:10},{n:"Ancrage",hz:27.9,d:3}],note:"Source CAFL / Articulations"},
{nom:"Arthrose",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Histamine",hz:5301.322902,d:10}],s2:[{n:"Bore",hz:515.632941,d:12},{n:"Calcium",hz:3024.000000,d:10},{n:"Magnésium",hz:1159.232148,d:10},{n:"Silicium",hz:1339.543899,d:10}]},
{nom:"Arthrose THQV",s1:[{n:"Bore",hz:515.632941,d:12},{n:"Calcium",hz:3024.000000,d:10},{n:"Magnesium",hz:1159.232148,d:10}],s2:[{n:"Soufre",hz:1529.346996,d:10},{n:"Silicium",hz:1339.543899,d:10}],note:"Source THQV"},
{nom:"Asthme / Allergies",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Histamine",hz:5301.322902,d:10},{n:"Foie",hz:831.6,d:10}],s2:[{n:"Cuivre",hz:3030.839991,d:10},{n:"Zinc",hz:3118.313016,d:10},{n:"Selenium",hz:3766.014000,d:10},{n:"Silicium",hz:1339.543899,d:10}]},
{nom:"Asthme Allergies THQV",s1:[{n:"Cuivre",hz:3030.839991,d:10},{n:"Histamine",hz:5301.322902,d:10},{n:"Zinc",hz:3118.313016,d:10}],s2:[{n:"Silicium",hz:1339.543899,d:10},{n:"Selenium",hz:3766.014000,d:10}],note:"Source THQV"},
{nom:"Cancer soutien THQV",s1:[{n:"Platine",hz:9304.572897,d:10},{n:"Glutathion",hz:3664.423197,d:10},{n:"Selenium",hz:3766.014000,d:10}],s2:[{n:"Soufre",hz:1529.346996,d:10},{n:"Or",hz:9394.362477,d:10}],note:"Source THQV"},
{nom:"Candida - Nettoyage",
   s1:[{n:"Candida albicans",hz:465.3,d:15},{n:"Candida profond",hz:3176.1,d:10}],
   s2:[{n:"Régénération flore",hz:880.2,d:10},{n:"Soutien immunitaire",hz:3118.313016,d:10}],
   note:"Source CAFL / Candida"},
{nom:"Chevelure / Alopécie",s1:[{n:"Stimulation racine",hz:727.2,d:10},{n:"Circulation cuir",hz:465.3,d:13}],s2:[{n:"Nutrition follicule",hz:146.300004,d:41},{n:"Croissance",hz:799.2,d:10}],note:"Source CAFL Rife"},
{nom:"Cicatrisation",s1:[{n:"Anti-infectieux",hz:2720.7,d:10},{n:"Réparation tissus",hz:880.2,d:10},{n:"Stimulation",hz:787.5,d:10}],s2:[{n:"Regeneration",hz:727.2,d:10},{n:"Consolidation",hz:220.5,d:27}],note:"Source CAFL Rife"},
{nom:"Circulation / Thrombose",s1:[{n:"Fluidification",hz:684.600003,d:10},{n:"Circulation",hz:775.500003,d:10}],s2:[{n:"Drainage veineux",hz:1500.3,d:10}],note:"Source CAFL Rife"},
{nom:"Circulation biochimique Lavoie",s1:[{n:"Eau H2O",hz:1388.000007,d:10},{n:"Fer",hz:2663.539155,d:10},{n:"Cuivre",hz:3030.839991,d:10}],s2:[{n:"Vanadium",hz:2429.665686,d:10},{n:"Potassium",hz:1864.751742,d:10},{n:"Vitamine C",hz:4200.040431,d:10}],note:"Source Lavoie / Cardiovasculaire"},
{nom:"Circulation pelvienne",s1:[{n:"Equilibre",hz:9.45,d:10},{n:"Nettoyage",hz:19.8,d:10},{n:"Ancrage",hz:39.6,d:10},{n:"Tonus",hz:72,d:10},{n:"Soutien",hz:72.9,d:10},{n:"Recuperation",hz:94.5,d:10},{n:"Regulation",hz:123.3,d:10}],s2:[{n:"Energie",hz:599.4,d:10},{n:"Equilibre2",hz:624.6,d:10},{n:"Circulation",hz:649.8,d:10},{n:"Harmonisation",hz:666,d:10},{n:"Drainage",hz:689.4,d:10},{n:"Ancrage2",hz:727.2,d:10},{n:"Soutien2",hz:787.5,d:10},{n:"Detente",hz:801.9,d:10},{n:"Principal",hz:880.2,d:10},{n:"Reparation",hz:2007.9,d:10},{n:"Stase",hz:2111.4,d:10},{n:"Profond",hz:2127.6,d:10},{n:"Vitalite",hz:2144.7,d:10},{n:"Regeneration",hz:2489.4,d:10},{n:"Guerison",hz:2720.7,d:10}],note:"Source CAFL / Corps physique"},
{nom:"Circulation sanguine",s1:[{n:"Equilibre",hz:9.45,d:10},{n:"Ancrage",hz:39.6,d:10},{n:"Tonus",hz:2111.4,d:10}],s2:[{n:"Soutien",hz:2144.7,d:10},{n:"Harmonisation",hz:2489.4,d:10},{n:"Regeneration",hz:2720.7,d:10}],note:"Source CAFL / Corps physique"},
{nom:"Cognitif Alzheimer THQV",s1:[{n:"Phosphore",hz:1477.300140,d:10},{n:"Acetylcholine",hz:3486.758535,d:10},{n:"Cuivre",hz:3030.839991,d:10}],s2:[{n:"Oxygene",hz:763.094781,d:10},{n:"Or",hz:9394.362477,d:10}],note:"Source THQV"},
{nom:"Concentration mentale CAFL",s1:[{n:"Focus",hz:2500.2,d:10}],s2:[{n:"Schumann",hz:7.83,d:10}],note:"Source CAFL / Bien-etre"},
{nom:"Cure Immunité Express",s1:[{n:"Eau H2O",hz:1388.000007,d:10},{n:"Vitamine C",hz:4200.040431,d:10}],s2:[{n:"Zinc",hz:3118.313016,d:10},{n:"Selenium",hz:3766.014000,d:10}],note:"Routine Cure / Vitamine+Mineral - synergie immunite documentee"},
{nom:"Cure Peau Os Réparation",s1:[{n:"Eau H2O",hz:1388.000007,d:10},{n:"Vitamine D",hz:4586.371668,d:10},{n:"Glutathion",hz:3664.423197,d:10}],s2:[{n:"Lysine",hz:6972.529770,d:10},{n:"Zinc",hz:3118.313016,d:10},{n:"Or",hz:4697.181234,d:10}],note:"Routine Cure / Vitamine+AA+Mineral+Oligo - collagene et reparation"},
{nom:"Cure Thyroïde Énergie",s1:[{n:"Eau H2O",hz:1388.000007,d:10},{n:"Vitamine C",hz:4200.040431,d:10}],s2:[{n:"Tyrosine",hz:8641.952838,d:10},{n:"Selenium",hz:3766.014000,d:10}],note:"Routine Cure / Vitamine+AA+Mineral - precurseurs thyroidiens"},
{nom:"Défenses naturelles Immunité",s1:[{n:"Zinc",hz:3118.313016,d:10},{n:"Selenium",hz:3766.014000,d:10},{n:"Thymus",hz:2442.000006,d:10}],s2:[{n:"Vitamine C",hz:4200.040431,d:10},{n:"Vitamine D",hz:4586.371668,d:10}],note:"Source Lavoie / Bien-etre quotidien"},
{nom:"Dentaire",s1:[{n:"Anti-bacterien",hz:2720.7,d:10}],s2:[{n:"Apaisement dentaire",hz:2720.7,d:10}],note:"Source Rife Sevigny"},
{nom:"Dépression",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Phosphore",hz:1477.300140,d:10}],s2:[{n:"Dopamine",hz:3652.976349,d:10},{n:"Serotonine",hz:4202.186724,d:10},{n:"Zinc",hz:3118.313016,d:10},{n:"Or",hz:4697.181234,d:10}]},
{nom:"Dépression légère",s1:[{n:"Apaisement",hz:1.8,d:10},{n:"Calme",hz:3.6,d:10},{n:"Equilibre",hz:35.1,d:10}],s2:[{n:"Ancrage",hz:72.9,d:10},{n:"Harmonisation",hz:787.5,d:10},{n:"Tonus",hz:799.2,d:10}],note:"Source CAFL / Systeme nerveux"},
{nom:"Dépression THQV",s1:[{n:"Dopamine",hz:3652.976349,d:10},{n:"Serotonine",hz:4202.186724,d:10},{n:"Zinc",hz:3118.313016,d:10}],s2:[{n:"Phosphore",hz:1477.300140,d:10},{n:"Or",hz:9394.362477,d:10}],note:"Source THQV"},
{nom:"Détox assist",s1:[{n:"Nettoyage",hz:2500.2,d:10}],s2:[{n:"Drainage",hz:3177,d:10}],note:"Source CAFL / Bien-etre"},
{nom:"Détox générale",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Chlore",hz:1690.924077,d:10}],s2:[{n:"Selenium",hz:3766.014000,d:10},{n:"Zinc",hz:3118.313016,d:10},{n:"Magnésium",hz:1159.232148,d:10},{n:"Carbone",hz:572.852898,d:10}]},
{nom:"Détox profonde Lavoie",s1:[{n:"Eau H2O",hz:1388.000007,d:10},{n:"Soufre",hz:1529.346996,d:10},{n:"Glutathion",hz:3664.423197,d:10}],s2:[{n:"Molybdene",hz:4576.355667,d:10},{n:"Methionine",hz:7116.497766,d:10},{n:"Carbone",hz:572.852898,d:10}],note:"Source Lavoie / Bien-etre quotidien"},
{nom:"Diabète type 2",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Molybdene",hz:4576.355667,d:10}],s2:[{n:"Chrome",hz:2479.965057,d:10},{n:"Zinc",hz:3118.313016,d:10},{n:"Pancréas",hz:3724.2,d:10},{n:"Magnésium",hz:1159.232148,d:10}]},
{nom:"Diabète type 2 THQV",s1:[{n:"Chrome",hz:2479.965057,d:10},{n:"Molybdene",hz:4576.355667,d:10},{n:"Zinc",hz:3118.313016,d:10}],s2:[{n:"Pancreas",hz:3724.000002,d:10}],note:"Source THQV"},
{nom:"Digestion Colon",s1:[{n:"Equilibre",hz:4.5,d:10},{n:"Nettoyage",hz:19.8,d:10},{n:"Ancrage",hz:72,d:10},{n:"Recuperation",hz:94.5,d:10},{n:"Soutien",hz:125.1,d:10},{n:"Tonus",hz:440.1,d:10},{n:"Calme",hz:444.6,d:10},{n:"Energie",hz:465.3,d:10}],s2:[{n:"Harmonisation",hz:727.2,d:10},{n:"Circulation",hz:787.5,d:10},{n:"Regulation",hz:799.2,d:10},{n:"Equilibre2",hz:801.9,d:10},{n:"Detente",hz:831.6,d:10},{n:"Principal",hz:880.2,d:10},{n:"Soutien2",hz:1551.6,d:10}],note:"Source CAFL / Corps physique"},
{nom:"Dos Lombaires",s1:[{n:"Apaisement",hz:0.9,d:10},{n:"Calme",hz:3.6,d:10},{n:"Schumann",hz:7.83,d:10},{n:"Equilibre",hz:9.45,d:10},{n:"Tonus",hz:9.9,d:10}],s2:[{n:"Ancrage",hz:432,d:10},{n:"Soutien",hz:465.3,d:10},{n:"Harmonisation",hz:727.2,d:10},{n:"Circulation",hz:774.9,d:10},{n:"Detente",hz:787.5,d:10}],note:"Source CAFL / Corps physique"},
{nom:"EBV - Fatigue chronique",
   s1:[{n:"EBV (Epstein-Barr)",hz:744.3,d:15},{n:"Drainage viral",hz:660.6,d:15}],
   s2:[{n:"Régénération",hz:787.5,d:10},{n:"Soutien immunitaire",hz:3766.014000,d:10}],
   note:"Source CAFL / EBV"},
{nom:"Énergie Performance physique",s1:[{n:"Fer",hz:2663.539155,d:10},{n:"CoQ10",hz:2573.574066,d:10},{n:"Chrome",hz:2479.965057,d:10}],s2:[{n:"Leucine",hz:6256.400463,d:10},{n:"Valine",hz:5587.389252,d:10}],note:"Source Lavoie / Recuperation"},
{nom:"Fatigue CAFL",s1:[{n:"Revitalisation",hz:427.5,d:10},{n:"Energie",hz:423.9,d:10},{n:"Tonus",hz:664.2,d:10}],s2:[{n:"Circulation",hz:660.6,d:10},{n:"Oxygenation",hz:464.4,d:10},{n:"Recuperation",hz:125.1,d:10},{n:"Equilibre",hz:120.6,d:10},{n:"Vitalite",hz:94.5,d:10},{n:"Ancrage",hz:72,d:10},{n:"Nettoyage",hz:19.8,d:10},{n:"Soutien",hz:444.6,d:10},{n:"Regeneration",hz:1866.6,d:10},{n:"Focus",hz:2500.2,d:10}],note:"Source CAFL / Bien-etre"},
{nom:"Fatigue chronique",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Fer",hz:2663.539155,d:10}],s2:[{n:"Magnésium",hz:1159.232148,d:10},{n:"Phosphore",hz:1477.300140,d:10},{n:"Oxygene",hz:763.094781,d:10},{n:"CoQ10",hz:2573.574066,d:10}]},
{nom:"Fatigue Fibromyalgie THQV",s1:[{n:"Magnesium",hz:1159.232148,d:10},{n:"Fer",hz:2663.539155,d:10},{n:"Phosphore",hz:1477.300140,d:10}],s2:[{n:"CoQ10",hz:2573.574066,d:10},{n:"Oxygene",hz:763.094781,d:10}],note:"Source THQV"},
{nom:"Foie support CAFL",s1:[{n:"Equilibrage",hz:33.3,d:10},{n:"Soutien",hz:1551.6,d:10}],s2:[{n:"Drainage",hz:801.9,d:10}],note:"Source CAFL / Bien-etre"},
{nom:"Globules blancs",s1:[{n:"Thymus",hz:2442.6,d:10},{n:"Soufre",hz:1529.346996,d:10}],s2:[{n:"Stimulation immune",hz:1434.6,d:10}],note:"Source XTRA"},
{nom:"Grippe - Soulagement",
   s1:[{n:"Influenza A",hz:776.7,d:15},{n:"Influenza B",hz:468,d:15}],
   s2:[{n:"Soutien immunitaire",hz:3118.313016,d:10},{n:"Récupération",hz:2663.539155,d:10}],
   note:"Source CAFL / Influenza"},
{nom:"Herpès - Protocole",
   s1:[{n:"HSV1",hz:657,d:15},{n:"HSV2",hz:556.2,d:15}],
   s2:[{n:"Régénération tissus",hz:787.5,d:10}],
   note:"Source CAFL / Herpes"},
{nom:"Hypertension",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Sodium",hz:1096.501932,d:10}],s2:[{n:"Potassium",hz:1864.751742,d:10},{n:"Magnésium",hz:1159.232148,d:10},{n:"Vanadium",hz:2429.665686,d:10},{n:"CoQ10",hz:2573.574066,d:10}]},
{nom:"Hypertension THQV",s1:[{n:"Potassium",hz:1864.751742,d:10},{n:"Magnesium",hz:1159.232148,d:10},{n:"Sodium",hz:1096.501932,d:10}],s2:[{n:"Vanadium",hz:2429.665686,d:10},{n:"CoQ10",hz:2573.574066,d:10}],note:"Source THQV"},
{nom:"Immunité faible",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Thymus",hz:2442.6,d:10},{n:"Foie",hz:831.6,d:10}],s2:[{n:"Zinc",hz:3118.313016,d:10},{n:"Cuivre",hz:3030.839991,d:10},{n:"Selenium",hz:3766.014000,d:10},{n:"Or",hz:4697.181234,d:10}]},
{nom:"Infection bactérienne",
   s1:[{n:"Staphylocoque",hz:728.1,d:15},{n:"Streptocoque",hz:880.2,d:15},{n:"Helicobacter pylori",hz:880.2,d:15}],
   s2:[{n:"Soutien immunitaire",hz:3118.313016,d:10},{n:"Régénération",hz:2663.539155,d:10}],
   note:"Source CAFL / Bactéries"},
{nom:"Inflammation chronique",s1:[{n:"Anti-inflammatoire",hz:2720.7,d:10},{n:"Apaisement",hz:2489.4,d:10}],s2:[{n:"Drainage",hz:2170.8,d:10},{n:"Recuperation",hz:1866.6,d:10}],note:"Source CAFL Rife"},
{nom:"Insomnie",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Iode",hz:6052.735701,d:10}],s2:[{n:"Magnésium",hz:1159.232148,d:10},{n:"GABA",hz:4918.330341,d:10},{n:"Melatonine",hz:2769.661008,d:10},{n:"Xénon",hz:6262.047576,d:10}]},
{nom:"Insomnie CAFL",s1:[{n:"Apaisement",hz:3.6,d:10},{n:"Calme nerveux",hz:10.8,d:10},{n:"Detente",hz:1551.6,d:10}],s2:[{n:"Relaxation",hz:1500.3,d:10},{n:"Respiration",hz:880.2,d:10},{n:"Equilibre",hz:801.9,d:10},{n:"Schumann",hz:7.83,d:10},{n:"Ancrage",hz:304.2,d:10}],note:"Source CAFL / Bien-etre"},
{nom:"Insomnie THQV",s1:[{n:"Magnesium",hz:1159.232148,d:10},{n:"Melatonine",hz:2769.661008,d:10},{n:"GABA",hz:4918.330341,d:10}],s2:[{n:"Xenon",hz:6262.047576,d:10},{n:"Iode",hz:6052.735701,d:10}],note:"Source THQV"},
{nom:"Lombalgie / Bas du dos",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Histamine",hz:5301.322902,d:10}],s2:[{n:"Silicium",hz:1339.543899,d:10},{n:"Magnésium",hz:1159.232148,d:10},{n:"Calcium",hz:3024.000000,d:10},{n:"Bore",hz:515.632941,d:12}]},
{nom:"Lyme - Protocole complet",
   s1:[{n:"Borrelia burgdorferi",hz:432,d:15},{n:"Lyme complexe",hz:864,d:15},{n:"Babesia",hz:570.6,d:15}],
   s2:[{n:"Drainage Lyme",hz:625.5,d:15},{n:"Régénération",hz:787.5,d:10}],
   note:"Source CAFL / Lyme Disease"},
{nom:"Lymphe drainage",s1:[{n:"Apaisement",hz:2.7,d:10},{n:"Equilibre",hz:6.3,d:10},{n:"Ancrage",hz:10.8,d:10},{n:"Tonus",hz:15.3,d:10},{n:"Drainage",hz:146.7,d:10},{n:"Soutien",hz:148.5,d:10}],s2:[{n:"Respiration",hz:440.1,d:10},{n:"Calme",hz:444.6,d:10},{n:"Vitalite",hz:465.3,d:10},{n:"Nettoyage",hz:522,d:10},{n:"Harmonisation",hz:727.2,d:10},{n:"Circulation",hz:787.5,d:10},{n:"Principal",hz:880.2,d:10},{n:"Regeneration",hz:3177,d:10}],note:"Source CAFL / Corps physique"},
{nom:"Mémoire / Cognitif",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Oxygene",hz:763.094781,d:10}],s2:[{n:"Phosphore",hz:1477.300140,d:10},{n:"Acetylcholine",hz:3486.758535,d:10},{n:"Cuivre",hz:3030.839991,d:10},{n:"Or",hz:4697.181234,d:10}]},
{nom:"Mémoire biochimique",s1:[{n:"Acetylcholine",hz:3486.758535,d:10},{n:"Phosphore",hz:1477.300140,d:10}],s2:[{n:"Or",hz:4697.181234,d:10},{n:"Lanthane",hz:6625.125945,d:10},{n:"Ac. glutamique",hz:7017.406200,d:10}],note:"Source Lavoie / Bien-etre quotidien"},
{nom:"Mémoire Concentration",s1:[{n:"Focus",hz:2500.2,d:10},{n:"Schumann",hz:7.83,d:10}],s2:[{n:"Ancrage",hz:19.8,d:10}],note:"Source CAFL / Systeme nerveux"},
{nom:"Ostéoporose",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10}],s2:[{n:"Strontium",hz:4179.054546,d:10},{n:"Calcium",hz:3024.000000,d:10},{n:"Bore",hz:515.632941,d:12},{n:"Fluor",hz:906.132870,d:10},{n:"Vit D",hz:4851,d:10}]},
{nom:"Ostéoporose THQV",s1:[{n:"Strontium",hz:4179.054546,d:10},{n:"Calcium",hz:3024.000000,d:10},{n:"Bore",hz:515.632941,d:12}],s2:[{n:"Fluor",hz:906.132870,d:10},{n:"Vitamine D",hz:4586.371668,d:10}],note:"Source THQV"},
{nom:"Parasites - Nettoyage",
   s1:[{n:"Parasites intestinaux",hz:690.3,d:15},{n:"Drainage profond",hz:802.8,d:10}],
   s2:[{n:"Régénération intestinale",hz:880.2,d:10},{n:"Soutien immunitaire",hz:3766.014000,d:10}],
   note:"Source CAFL / Parasites"},
{nom:"Prostate général",s1:[{n:"Equilibre",hz:2720.7,d:10},{n:"Regulation",hz:2007.9,d:10},{n:"Tonus",hz:664.2,d:10},{n:"Drainage",hz:690.000003,d:10},{n:"Equilibre",hz:666,d:10}],s2:[{n:"Soutien",hz:465.3,d:10},{n:"Respiration",hz:880.2,d:10},{n:"Ancrage",hz:787.5,d:10},{n:"Circulation",hz:727.2,d:10},{n:"Nettoyage",hz:72,d:10},{n:"Regeneration",hz:19.8,d:10}],note:"Source CAFL / Prostate"},
{nom:"Prostate hyperplasie",s1:[{n:"Regulation",hz:919.8,d:10},{n:"Equilibre",hz:2127.6,d:10}],s2:[{n:"Soutien",hz:2007.9,d:10},{n:"Drainage",hz:690.000003,d:10},{n:"Harmonisation",hz:666,d:10}],note:"Source CAFL / Prostate"},
{nom:"Prostatite",s1:[{n:"Apaisement",hz:99.9,d:10},{n:"Regulation",hz:409.5,d:10},{n:"Nettoyage",hz:522,d:10},{n:"Drainage",hz:146.300004,d:10},{n:"Equilibre",hz:2720.7,d:10}],s2:[{n:"Soutien",hz:2489.4,d:10},{n:"Harmonisation",hz:2170.8,d:10},{n:"Ancrage",hz:787.5,d:10},{n:"Circulation",hz:775.500003,d:10},{n:"Tonus",hz:727.2,d:10},{n:"Regeneration",hz:690.000003,d:10},{n:"Equilibre",hz:666,d:10},{n:"Vitalite",hz:465.3,d:10},{n:"Recuperation",hz:125.1,d:10},{n:"Nettoyage",hz:94.5,d:10},{n:"Ancrage",hz:72,d:10},{n:"Detente",hz:19.8,d:10},{n:"Soutien",hz:444.6,d:10}],note:"Source CAFL / Prostate"},
{nom:"Récupération musculaire Crampes",s1:[{n:"Eau H2O",hz:1388.000007,d:10},{n:"Magnesium",hz:1159.232148,d:10},{n:"Potassium",hz:1864.751742,d:10}],s2:[{n:"Calcium",hz:3024.000000,d:10},{n:"GABA",hz:4918.330341,d:10}],note:"Source Lavoie / Colonne Dos"},
{nom:"Récupération post-effort",s1:[{n:"Nettoyage",hz:19.8,d:10},{n:"Ancrage",hz:39.6,d:10},{n:"Regeneration",hz:47.7,d:10},{n:"Tonus",hz:120.6,d:10},{n:"Drainage",hz:189.9,d:10},{n:"Equilibre",hz:220.5,d:10},{n:"Souplesse",hz:239.4,d:10}],s2:[{n:"Stabilisation",hz:300.6,d:10},{n:"Detente",hz:304.2,d:10},{n:"Relaxation",hz:327.6,d:10},{n:"Harmonisation",hz:727.2,d:10},{n:"Soutien",hz:787.5,d:10},{n:"Principal",hz:880.2,d:10},{n:"Profond",hz:2720.7,d:10},{n:"Focus",hz:2500.2,d:10}],note:"Source CAFL / Corps physique"},
{nom:"Régénération CAFL",s1:[{n:"Regeneration",hz:47.7,d:10}],s2:[{n:"Guerison",hz:2721.6,d:10}],note:"Source CAFL / Bien-etre"},
{nom:"Régénération tissulaire",s1:[{n:"Regeneration",hz:47.7,d:10},{n:"DNA",hz:527.4,d:10},{n:"Reparation",hz:730.8,d:10},{n:"Tissus",hz:731.7,d:10}],s2:[{n:"Profond",hz:2500.2,d:10},{n:"Guerison",hz:2720.7,d:10}],note:"Source CAFL / Corps physique"},
{nom:"Reins support",s1:[{n:"Equilibre",hz:8.1,d:10},{n:"Ancrage",hz:9.45,d:10},{n:"Tonus",hz:10.8,d:10},{n:"Nettoyage",hz:19.8,d:10},{n:"Detente",hz:39.6,d:10},{n:"Vitalite",hz:72,d:10},{n:"Recuperation",hz:94.5,d:10},{n:"Soutien",hz:125.1,d:10},{n:"Drainage",hz:146.7,d:10},{n:"Harmonisation",hz:247.5,d:10},{n:"Circulation",hz:249.3,d:10}],s2:[{n:"Respiration",hz:440.1,d:10},{n:"Calme",hz:444.6,d:10},{n:"Energie",hz:599.4,d:10},{n:"Focus",hz:624.6,d:10},{n:"Ancrage2",hz:649.8,d:10},{n:"Regulation",hz:799.2,d:10},{n:"Principal",hz:880.2,d:10},{n:"Equilibre2",hz:801.9,d:10},{n:"Relaxation",hz:1500.3,d:10},{n:"Soutien2",hz:1551.6,d:10},{n:"Tonus2",hz:1599.3,d:10},{n:"Regeneration",hz:1866.6,d:10},{n:"Detox",hz:3000.6,d:10}],note:"Source CAFL / Corps physique"},
{nom:"Relaxation",s1:[{n:"Apaisement",hz:1500.3,d:10},{n:"Ancrage",hz:10.8,d:10}],s2:[{n:"Schumann",hz:7.83,d:10}],note:"Source CAFL / Bien-etre"},
{nom:"Respiration Poumons",s1:[{n:"Oxygene",hz:763.094781,d:10},{n:"Fer",hz:2663.539155,d:10}],s2:[{n:"Cuivre",hz:3030.839991,d:10},{n:"Selenium",hz:3766.014000,d:10},{n:"Helium",hz:763.619832,d:10}],note:"Source Lavoie / Organes"},
{nom:"Réveil Vitalité matinale",s1:[{n:"Hypothalamus",hz:999,d:10},{n:"Dopamine",hz:3652.976349,d:10},{n:"Noradrenaline",hz:4034.538045,d:10}],s2:[{n:"Tyrosine",hz:8641.952838,d:10},{n:"Phosphore",hz:1477.300140,d:10}],note:"Source Lavoie / Systeme nerveux"},
{nom:"Sommeil biochimique Lavoie",s1:[{n:"GABA",hz:4918.330341,d:10},{n:"Melatonine",hz:2769.661008,d:10}],s2:[{n:"Magnesium",hz:1159.232148,d:10},{n:"Tryptophane",hz:9740.716992,d:10}],note:"Source Lavoie / Systeme nerveux"},
{nom:"Sommeil profond",s1:[{n:"Apaisement",hz:3.6,d:10},{n:"Schumann",hz:7.83,d:10},{n:"Ancrage",hz:10.8,d:10},{n:"Detente",hz:1551.6,d:10}],s2:[{n:"Relaxation",hz:1500.3,d:10},{n:"Respiration",hz:880.2,d:10},{n:"Equilibre",hz:801.9,d:10},{n:"Nettoyage",hz:304.2,d:10}],note:"Source CAFL / Systeme nerveux"},
{nom:"Soutien cancer",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10},{n:"Thymus",hz:2442.6,d:10}],s2:[{n:"Platine",hz:4652.286444,d:10},{n:"Glutathion",hz:3664.423197,d:10},{n:"Selenium",hz:3766.014000,d:10},{n:"Or",hz:4697.181234,d:10}]},
{nom:"Thyroïde",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Foie",hz:831.6,d:10}],s2:[{n:"Iode",hz:6052.735701,d:10},{n:"Selenium",hz:3766.014000,d:10},{n:"Zinc",hz:3118.313016,d:10},{n:"Manganese",hz:2620.281744,d:10},{n:"Hypothalamus",hz:999,d:10}]},
{nom:"Thyroïde THQV",s1:[{n:"Iode",hz:6052.735701,d:10},{n:"Zinc",hz:3118.313016,d:10},{n:"Selenium",hz:3766.014000,d:10}],s2:[{n:"Manganese",hz:2620.281744,d:10},{n:"Hypothalamus",hz:999,d:10}],note:"Source THQV"},
{nom:"Trauma émotionnel",s1:[{n:"Liberation",hz:95.4,d:45},{n:"Apaisement",hz:192.6,d:31},{n:"Equilibrage",hz:300.6,d:20}],s2:[{n:"Integration",hz:759.6,d:10},{n:"Ancrage",hz:3000.6,d:10}],note:"Source CAFL Rife"},
{nom:"Traumatologie Fracture Entorse",s1:[{n:"Calcium",hz:3024.000000,d:10},{n:"Bore",hz:515.632941,d:12},{n:"Strontium",hz:4179.054546,d:10}],s2:[{n:"Proline",hz:5491.240470,d:10},{n:"Lysine",hz:6972.529770,d:10},{n:"Vitamine D",hz:4586.371668,d:10}],note:"Source Lavoie / Articulations"},
{nom:"Vitalité générale",s1:[{n:"Soufre",hz:1529.346996,d:10},{n:"Carbone",hz:572.852898,d:10}],s2:[{n:"Magnésium",hz:1159.232148,d:10},{n:"Zinc",hz:3118.313016,d:10},{n:"Fer",hz:2663.539155,d:10},{n:"Or",hz:4697.181234,d:10}]},
{nom:"Vitalité générale",s1:[{n:"Bien-etre",hz:6.3,d:10},{n:"Schumann",hz:7.83,d:10},{n:"Nettoyage",hz:19.8,d:10},{n:"Ancrage",hz:72,d:10},{n:"Recuperation",hz:94.5,d:10},{n:"Tonus",hz:120.6,d:10},{n:"Soutien",hz:125.1,d:10},{n:"Energie",hz:423.9,d:10}],s2:[{n:"Revitalisation",hz:427.5,d:10},{n:"Calme",hz:444.6,d:10},{n:"Oxygenation",hz:464.4,d:10},{n:"Circulation",hz:660.6,d:10},{n:"Harmonisation",hz:664.2,d:10},{n:"Regeneration",hz:1866.6,d:10},{n:"Focus",hz:2500.2,d:10}],note:"Source CAFL / Vitalite"},
{nom:"Yeux Vision",s1:[{n:"Nettoyage",hz:19.8,d:10},{n:"Lumiere",hz:159.3,d:10},{n:"Vision",hz:349.2,d:10},{n:"Equilibre",hz:360,d:10},{n:"Harmonisation",hz:727.2,d:10}],s2:[{n:"Tonus",hz:783.9,d:10},{n:"Soutien",hz:787.5,d:10},{n:"Regulation",hz:799.2,d:10},{n:"Principal",hz:880.2,d:10},{n:"Regeneration",hz:1551.6,d:10},{n:"Ancrage",hz:1599.3,d:10},{n:"Profond",hz:1829.7,d:10}],note:"Source CAFL / Yeux"}
];

const SYMPTOMES={
  "Douleurs":[{s:"Genou douloureux",s1:[{hz:1529.346996,d:10}],s2:[]},
    {s:"Dos / Lombaires",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:5301.322902,d:10}],s2:[{hz:1339.543899,d:10},{hz:1159.232148,d:10},{hz:3024.000000,d:10}]},
    {s:"Douleurs musculaires",s1:[{hz:1529.346996,d:10},{hz:832.000005,d:10}],s2:[{hz:1159.232148,d:10},{hz:2663.539155,d:10},{hz:763.094781,d:10}]},
    {s:"Migraine",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:1096.501932,d:10}],s2:[{hz:1159.232148,d:10},{hz:1864.751742,d:10},{hz:4202.186724,d:10}]},
    {s:"Sciatique",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:5301.322902,d:10}],s2:[{hz:1339.543899,d:10},{hz:1159.232148,d:10},{hz:3024.000000,d:10}]},
    {s:"Entorse / Foulure",s1:[{hz:515.632941,d:12},{hz:3024.000000,d:10},{hz:1339.543899,d:10}],s2:[{hz:1529.346996,d:10},{hz:5491.240470,d:10}]},
    {s:"Fracture consolidation",s1:[{hz:3024.000000,d:10},{hz:515.632941,d:12},{hz:4179.054546,d:10}],s2:[{hz:1477.300140,d:10},{hz:4586.371668,d:10}]},
    {s:"Tendinite",s1:[{hz:1529.346996,d:10},{hz:1339.543899,d:10}],s2:[{hz:3030.839991,d:10},{hz:3766.014000,d:10}]}
  ],
  "Fatigue":[{s:"Fatigue générale",s1:[{hz:1529.346996,d:10}],s2:[]},
    {s:"Fatigue matinale",s1:[{hz:1529.346996,d:10},{hz:832.000005,d:10}],s2:[{hz:1159.232148,d:10},{hz:999,d:10},{hz:6052.735701,d:10}]},
    {s:"Épuisement nerveux",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:763.619832,d:10}],s2:[{hz:2663.539155,d:10},{hz:1159.232148,d:10},{hz:4918.330341,d:10},{hz:4202.186724,d:10}]},
    {s:"Burn-out",s1:[{hz:1529.346996,d:10},{hz:832.000005,d:10}],s2:[{hz:2663.539155,d:10},{hz:1159.232148,d:10},{hz:4918.330341,d:10},{hz:3652.976349,d:10}]},
    {s:"Fatigue musculaire post-effort",s1:[{hz:1388.000007,d:10},{hz:6256.400463,d:10}],s2:[{hz:5587.389252,d:10},{hz:2663.539155,d:10},{hz:2573.574066,d:10}]}
  ],
  "Sommeil":[{s:"Endormissement difficile",s1:[{hz:1529.346996,d:10}],s2:[]},
    {s:"Réveils nocturnes",s1:[{hz:1529.346996,d:10},{hz:832.000005,d:10}],s2:[{hz:1159.232148,d:10},{hz:4918.330341,d:10},{hz:999,d:10},{hz:763.094781,d:10}]},
    {s:"Sommeil non réparateur",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:2663.539155,d:10}],s2:[{hz:1159.232148,d:10},{hz:2573.574066,d:10},{hz:763.094781,d:10},{hz:4918.330341,d:10}]},
    {s:"Décalage horaire Jet lag",s1:[{hz:2769.661008,d:10},{hz:1296,d:10}],s2:[{hz:4918.330341,d:10},{hz:999,d:10}]}
  ],
  "Mental":[{s:"Stress chronique",s1:[{hz:1529.346996,d:10}],s2:[]},
    {s:"Anxiété / Angoisse",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:763.619832,d:10}],s2:[{hz:2663.539155,d:10},{hz:4918.330341,d:10},{hz:1159.232148,d:10},{hz:4202.186724,d:10}]},
    {s:"Déprime passagère",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:1477.300140,d:10}],s2:[{hz:3652.976349,d:10},{hz:4202.186724,d:10},{hz:3118.313016,d:10},{hz:4697.181234,d:10}]},
    {s:"Manque concentration",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:763.094781,d:10}],s2:[{hz:1477.300140,d:10},{hz:3486.758535,d:10},{hz:4697.181234,d:10}]},
    {s:"Irritabilité",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:763.619832,d:10}],s2:[{hz:1159.232148,d:10},{hz:2663.539155,d:10},{hz:4918.330341,d:10},{hz:4202.186724,d:10}]},
    {s:"Choc émotionnel Trauma léger",s1:[{hz:662.124024,d:10},{hz:4918.330341,d:10}],s2:[{hz:763.619832,d:10},{hz:4202.186724,d:10}]}
  ],
  "Immunite":[{s:"Rhume / Grippe",s1:[{hz:1529.346996,d:10}],s2:[]},
    {s:"Fatigue post-virale",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:2663.539155,d:10}],s2:[{hz:763.094781,d:10},{hz:1159.232148,d:10},{hz:2573.574066,d:10},{hz:3766.014000,d:10}]},
    {s:"Allergies saisonnières",s1:[{hz:1529.346996,d:10},{hz:5301.322902,d:10},{hz:832.000005,d:10}],s2:[{hz:3030.839991,d:10},{hz:3118.313016,d:10},{hz:3766.014000,d:10},{hz:1339.543899,d:10}]},
    {s:"Cicatrisation lente",s1:[{hz:4200.040431,d:10},{hz:3118.313016,d:10}],s2:[{hz:3030.839991,d:10},{hz:5491.240470,d:10},{hz:6972.529770,d:10}]},
    {s:"Inflammation chronique légère",s1:[{hz:1529.346996,d:10},{hz:3766.014000,d:10}],s2:[{hz:3030.839991,d:10},{hz:1339.543899,d:10}]}
  ],
  "Cognitif":[{s:"Perte de mémoire",s1:[{hz:1529.346996,d:10}],s2:[]},
    {s:"Brouillard mental",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:763.094781,d:10}],s2:[{hz:1477.300140,d:10},{hz:3486.758535,d:10},{hz:1159.232148,d:10}]},
    {s:"TDAH",s1:[{hz:1529.346996,d:10},{hz:831.6,d:10},{hz:763.619832,d:10}],s2:[{hz:3652.976349,d:10},{hz:1159.232148,d:10},{hz:4918.330341,d:10},{hz:1477.300140,d:10}]},
    {s:"Surcharge mentale Surmenage",s1:[{hz:3486.758535,d:10},{hz:1477.300140,d:10}],s2:[{hz:1159.232148,d:10},{hz:4918.330341,d:10}]}
  ],
  "ORL":[{s:"Acouphènes",s1:[{hz:1529.346996,d:10}],s2:[]}
  ]
};

const SUGGESTED_PROTOCOLS=[
  {slot:"matin",nom:"Énergie & Focus",desc:"Relance la dopamine et la neurotransmission cognitive au réveil.",freqs:[
    {hz:999,d:10,nom:"Hypothalamus",action:"Chef d'orchestre hormonal"},
    {hz:3652.976349,d:10,nom:"Dopamine",action:"Motivation, plaisir"},
    {hz:8641.952838,d:10,nom:"Tyrosine",action:"Thyroïde, dopamine"},
    {hz:7878.858048,d:10,nom:"Phenylalanine",action:"Neurotransmetteurs"},
    {hz:1477.300140,d:10,nom:"Phosphore",action:"Mémoire et ATP"}
  ]},
  {slot:"matin",nom:"Immunité journalière",desc:"Stimule les défenses immunitaires pour la journée.",freqs:[
    {hz:2442.000006,d:10,nom:"Thymus",action:"Immunité lymphocytes T"},
    {hz:3118.313016,d:10,nom:"Zinc",action:"Immunité, réparation cellulaire"},
    {hz:3766.014000,d:10,nom:"Selenium",action:"Antioxydant, immunité"},
    {hz:3030.839991,d:10,nom:"Cuivre",action:"Antiviral, immunité"},
    {hz:4200.040431,d:10,nom:"Vitamine C",action:"Antioxydant, immunité"}
  ]},
  {slot:"matin",nom:"Détox matinale",desc:"Active les voies de détoxification hépatique après le jeûne nocturne.",freqs:[
    {hz:832.000005,d:10,nom:"Foie",action:"Détox et filtration"},
    {hz:1529.346996,d:10,nom:"Soufre",action:"Détox et glutathion"},
    {hz:3664.423197,d:10,nom:"Glutathion",action:"Antioxydant majeur"},
    {hz:4576.355667,d:10,nom:"Molybdene",action:"Détox hépatique"},
    {hz:1690.924077,d:10,nom:"Chlore",action:"Immunité intestinale"}
  ]},
  {slot:"matin",nom:"Performance physique",desc:"Optimise l'énergie mitochondriale et l'oxygénation musculaire.",freqs:[
    {hz:2663.539155,d:10,nom:"Fer",action:"Transport oxygène, vitalité"},
    {hz:1159.232148,d:10,nom:"Magnesium",action:"Relaxation musculaire"},
    {hz:2573.574066,d:10,nom:"CoQ10",action:"Énergie mitochondriale"},
    {hz:763.094781,d:10,nom:"Oxygene",action:"Respiration cellulaire"},
    {hz:6256.400463,d:10,nom:"Leucine",action:"Muscles, protéines"}
  ]},
  {slot:"matin",nom:"Équilibre hormonal",desc:"Relance l'axe thyroïde et surrénales au réveil.",freqs:[
    {hz:999,d:10,nom:"Hypothalamus",action:"Chef d'orchestre hormonal"},
    {hz:6052.735701,d:10,nom:"Iode",action:"Thyroïde, métabolisme"},
    {hz:3118.313016,d:10,nom:"Zinc",action:"Immunité, réparation cellulaire"},
    {hz:3766.014000,d:10,nom:"Selenium",action:"Antioxydant, immunité"},
    {hz:17287.606827,d:10,nom:"Cortisol",action:"Stress, inflammation"}
  ]},
  {slot:"matin",nom:"Anti-inflammatoire matinal",desc:"Calme l'inflammation nocturne résiduelle et prépare le terrain.",freqs:[
    {hz:1529.346996,d:10,nom:"Soufre",action:"Détox et glutathion"},
    {hz:3030.839991,d:10,nom:"Cuivre",action:"Antiviral, immunité"},
    {hz:5301.322902,d:10,nom:"Histamine",action:"Modulation allergies"},
    {hz:1159.232148,d:10,nom:"Magnesium",action:"Relaxation musculaire"},
    {hz:2429.665686,d:10,nom:"Vanadium",action:"Régulation tension artérielle"}
  ]},
  {slot:"matin",nom:"Clarté mentale",desc:"Active la neurotransmission et la mémoire de travail.",freqs:[
    {hz:1477.300140,d:10,nom:"Phosphore",action:"Mémoire et ATP"},
    {hz:3486.758535,d:10,nom:"Acetylcholine",action:"Mémoire, motricité fine"},
    {hz:9394.362477,d:10,nom:"Or",action:"Amplificateur vibratoire"},
    {hz:7878.858048,d:10,nom:"Phenylalanine",action:"Neurotransmetteurs"},
    {hz:7017.406200,d:10,nom:"Ac. glutamique",action:"Cerveau, mémoire"}
  ]},
  {slot:"soir",nom:"Sommeil profond",desc:"Induit le sommeil en activant GABA et mélatonine.",freqs:[
    {hz:4918.330341,d:10,nom:"GABA",action:"Apaisement neuronal, sommeil"},
    {hz:2769.661008,d:10,nom:"Melatonine",action:"Induction du sommeil"},
    {hz:1159.232148,d:10,nom:"Magnesium",action:"Relaxation musculaire"},
    {hz:6262.047576,d:10,nom:"Xenon",action:"Relaxation profonde, sommeil"},
    {hz:9740.716992,d:10,nom:"Tryptophane",action:"Sérotonine, sommeil"}
  ]},
  {slot:"soir",nom:"Récupération cellulaire",desc:"Renforce les défenses antioxydantes pour la régénération nocturne.",freqs:[
    {hz:3664.423197,d:10,nom:"Glutathion",action:"Antioxydant majeur"},
    {hz:3766.014000,d:10,nom:"Selenium",action:"Antioxydant, immunité"},
    {hz:3118.313016,d:10,nom:"Zinc",action:"Immunité, réparation cellulaire"},
    {hz:9394.362477,d:10,nom:"Or",action:"Renforcement cellulaire"},
    {hz:9304.572897,d:10,nom:"Platine",action:"Soutien anticancer"}
  ]},
  {slot:"soir",nom:"Système nerveux",desc:"Descente progressive du système nerveux vers le repos.",freqs:[
    {hz:3580.341309,d:10,nom:"Glycine",action:"Collagène, sommeil"},
    {hz:331.062012,d:18,nom:"Lithium",action:"Stabilisation humeur"},
    {hz:763.619832,d:10,nom:"Helium",action:"Apaisement, relaxation"},
    {hz:3486.758535,d:10,nom:"Acetylcholine",action:"Mémoire, motricité fine"},
    {hz:4202.186724,d:10,nom:"Serotonine",action:"Humeur, anti-dépression"}
  ]},
  {slot:"soir",nom:"Régénération tissulaire",desc:"Soutient la réparation du collagène et des tissus pendant le sommeil.",freqs:[
    {hz:1339.543899,d:10,nom:"Silicium",action:"Cartilage et muqueuses"},
    {hz:515.632941,d:12,nom:"Bore",action:"Soutien osseux, hormones"},
    {hz:3024.000000,d:10,nom:"Calcium",action:"Solidité osseuse"},
    {hz:5491.240470,d:10,nom:"Proline",action:"Collagène, cicatrisation"},
    {hz:6972.529770,d:10,nom:"Lysine",action:"Collagène, calcium"}
  ]},
  {slot:"soir",nom:"Détox hépatique nocturne",desc:"Le foie détoxifie principalement la nuit — soutien optimal.",freqs:[
    {hz:832.000005,d:10,nom:"Foie",action:"Détox et filtration"},
    {hz:1529.346996,d:10,nom:"Soufre",action:"Détox et glutathion"},
    {hz:4576.355667,d:10,nom:"Molybdene",action:"Détox hépatique"},
    {hz:3664.423197,d:10,nom:"Glutathion",action:"Antioxydant majeur"},
    {hz:7116.497766,d:10,nom:"Methionine",action:"Détox, foie"}
  ]},
  {slot:"soir",nom:"Anti-stress profond",desc:"Descente progressive du cortisol et du stress de la journée.",freqs:[
    {hz:331.062012,d:18,nom:"Lithium",action:"Stabilisation humeur"},
    {hz:4918.330341,d:10,nom:"GABA",action:"Apaisement neuronal, sommeil"},
    {hz:3580.341309,d:10,nom:"Glycine",action:"Collagène, sommeil"},
    {hz:763.619832,d:10,nom:"Helium",action:"Apaisement, relaxation"},
    {hz:1159.232148,d:10,nom:"Magnesium",action:"Relaxation musculaire"}
  ]},
  {slot:"soir",nom:"Réparation ADN",desc:"La réplication cellulaire est maximale entre 23h et 2h.",freqs:[
    {hz:9394.362477,d:10,nom:"Or",action:"Renforcement cellulaire"},
    {hz:9304.572897,d:10,nom:"Platine",action:"Soutien anticancer"},
    {hz:3766.014000,d:10,nom:"Selenium",action:"Antioxydant, immunité"},
    {hz:3464.103303,d:10,nom:"Germanium",action:"Oxygénation cellulaire"},
    {hz:4908.099717,d:10,nom:"Rhodium",action:"Soutien ADN, anticancer"}
  ]}
];

// ============================================================
// DONNÉES ENRICHIES (depuis data-enrichi.js)
// ============================================================

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

// ============================================================
// FUSION: Ajoute PROTOCOLES_PATHOGENES à PROTOCOLES au chargement
// ============================================================
// Note : NOUVEAUX_ORGANES n'est PAS fusionné dans MINERAUX car les 10 organes
// (Cœur, Poumons, Reins, Rate, Vésicule biliaire, Intestin grêle, Gros intestin,
// Vessie, Estomac, Duodénum) sont déjà présents dans MINERAUX original avec les
// mêmes fréquences. La fusion créait des doublons dans l'accordéon.
if (typeof PROTOCOLES_PATHOGENES !== "undefined" && typeof PROTOCOLES !== "undefined") {
  PROTOCOLES_PATHOGENES.forEach(function(p){ PROTOCOLES.push(p); });
}
