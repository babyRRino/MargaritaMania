self.addEventListener('install', event => {
	// fires when the browser installs the app
	// here we're just logging the event and the contents
	// of the object passed to the event.
	// the purpose of this event is to give the service worker
	// a place to setup the local environment after the installation completes.
	event.waitUntil(
		caches.open('margarita-mania').then(function (cache) {
			return cache.addAll([
				// '/./',
				'./index.html',
				'./index.js',
				'./createRecipe.js',
				'./createrecipe.html',
				'./style.css',
				'./images/drink.png',
				'./dynamoDB.js',
				'./db.js',
			]);
		})
	);
});

self.addEventListener('activate', event => {
	// fires after the service worker completes its installation.
	// It's a place for the service worker to clean up from previous
	// service worker versions
});

self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request).then(function (response) {
			return response || fetch(e.request);
		}).catch(function () {
			// If both fail, show a generic fallback:
			return caches.match('/offline.html');
		})
	);
});

