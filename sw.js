// ============================================================
// SW.JS — Service Worker Fréquences Thérapeutiques
// Stratégie hybride : network-first pour les fichiers critiques
// (HTML/JS/CSS), cache-first pour les fonts et assets statiques.
// ============================================================
//
// ⚠️  RÈGLE DE DÉPLOIEMENT :
// À chaque mise en production, bumper CACHE_VERSION ci-dessous
// (ex: 'v1' → 'v2') pour que les visiteurs déjà venus récupèrent
// la nouvelle version. Sans ça, le cache ancien reste actif.
// ============================================================

const CACHE_VERSION = 'v2';  // ← BUMPER à chaque déploiement !
const CACHE_NAME = 'ft-app-' + CACHE_VERSION;

// Fichiers critiques à précharger à l'installation
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data.js',
  './manifest.json'
];

// Extensions considérées comme "critiques" (toujours network-first)
const CRITICAL_EXTS = ['.html', '.css', '.js', '.json'];

// Install: precache les assets principaux + active immédiatement
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_ASSETS).catch(function(e) {
        console.warn('[SW] Erreur precache:', e);
      });
    })
  );
  self.skipWaiting();  // Active le nouveau SW immédiatement
});

// Activate: nettoie les anciens caches + prend le contrôle
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(k) { return k !== CACHE_NAME; })
          .map(function(k) {
            console.log('[SW] Suppression ancien cache:', k);
            return caches.delete(k);
          })
      );
    }).then(function() {
      return self.clients.claim();  // Prend le contrôle des onglets existants
    })
  );
});

// Fetch: stratégie hybride
self.addEventListener('fetch', function(event) {
  // Ignore les requêtes non-GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignore les requêtes cross-origin (fonts Google, etc. — gérées séparément)
  if (url.origin !== self.location.origin) {
    return;  // Laisse le navigateur gérer
  }

  // Détermine si c'est un fichier critique
  const isCritical = CRITICAL_EXTS.some(function(ext) {
    return url.pathname.endsWith(ext);
  });

  if (isCritical) {
    // NETWORK-FIRST pour HTML/JS/CSS/JSON
    // → L'utilisateur a toujours la dernière version si en ligne
    // → Fallback sur le cache si offline
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          // Cache la réponse fraîche
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(function() {
          // Offline: sert le cache
          return caches.match(event.request).then(function(cached) {
            if (cached) return cached;
            // Fallback ultime: index.html pour les navigations
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            return new Response('Offline et non en cache', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
        })
    );
  } else {
    // CACHE-FIRST pour les autres ressources (images, icônes SVG inline, etc.)
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        }).catch(function() {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
    );
  }
});

// Permet à la page de forcer la mise à jour du SW
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
