const firebaseConfig = {
  apiKey: "4XS3nKXcEbE9YQTWReUQFgdzyqvIJgqshPvN0Uxj3Z8",
  authDomain: "kyzooxd.firebaseapp.com",
  projectId: "kyzooxd-a5c01",
  storageBucket: "kyzooxd.appspot.com",
  messagingSenderId: "19263532428",
  appId: "1:19263532428:android:c543e0ed318fa652f47aa9"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
