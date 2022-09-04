// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    projectId: 'movies-app-50836',
    appId: '1:667831996485:web:04279cc7e3f4ecf60c932c',
    storageBucket: 'movies-app-50836.appspot.com',
    apiKey: 'AIzaSyAEMs_bVwsYByrwBbNnY5Hn3LnfigiUNg0',
    authDomain: 'movies-app-50836.firebaseapp.com',
    messagingSenderId: '667831996485',
    measurementId: 'G-SCKHL6E0S4',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
messaging = firebase.messaging();