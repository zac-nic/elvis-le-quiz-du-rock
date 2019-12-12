// Dans Chrome, il manque encore quelques méthodes utiles du cache,
// cette prothèse d'émulation (alias polyfill) les ajoute.
importScripts('serviceworker-cache-polyfill.js');

// Et voici l'événement 'install'!
// Il ne survient qu'une fois, lorsque le navigateur
// voit pour la première fois cette version du ServiceWorker.
self.addEventListener('install', function(event) {
    if (self.skipWaiting) {
    // Cette méthode permet au service worker de devenir le service worker actif sans attente
        self.skipWaiting();
    }
    // Nous passons une promesse à event.waitUntil pour signaler
    // combien de temps dure l'installation, et si elle échoue
    event.waitUntil(
        // Ouvrir le cache…
        caches.open('elvis-le-quiz-du-rock').then(function(cache) {
            // et lui ajouter des ressources
            return cache.addAll([
                './',
                'index.html',
                'quiz.html',
                'resultats.php',
                'logging.js',
                'liaisons/css/styles.css',
                'liaisons/js/main.js',
                'liaisons/js/objJSONquiz.json',
                'liaisons/js/Quiz.js',
                'node_modules/requirejs/bin/r.js',
                'node_modules/requirejs/package.json',
                'node_modules/requirejs/README.md',
                'node_modules/requirejs/require.js',
                'liaisons/images/background.jpg',
                'liaisons/images/background_mobile.jpg',
                'liaisons/images/background_tablette.jpg',
                'liaisons/images/blue_suede_shoes.jpg',
                'liaisons/images/dont_be_cruel.jpg',
                'liaisons/images/heartbreak_hotel.jpg',
                'liaisons/images/index.jpg',
                'liaisons/images/jailhouse_rock.jpg',
                'liaisons/images/question2.jpg',
                'liaisons/images/question3.jpg',
                'liaisons/images/resultat.jpg',
            ]);
        })
    );
});

// L'événement fetch survient pour les rquêtes des pages
// qui se trouve dans la portée du ServiceWorker,
// ainsi que pour les requêtes de toutes les ressources incluses
// dans ces pages
self.addEventListener('fetch', function(event) {
    // Appeler event.respondWith signifie
    // que nous prenons la responsabilité de fournir une réponse.
    // Nous passons une promesse
    // qui est résolue par un objet Response

    event.respondWith(
        // D'abord nous regardons s'il y a quelque chose dans le cache
        // qui correspond à la requête
        caches.match(event.request).then(function(response) {
            // Si on trouve quelque chose, on le retourne,
            // sinon, si c'est null,
            // on passe la requête à fetch, qui utilisera le réseau.
            return response || fetch(event.request);
        })
    );
});



