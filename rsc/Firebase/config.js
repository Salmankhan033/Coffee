// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import * as firebase from 'firebase/app';
// export const firebaseAuth = firebaseApp.auth();

//   export const firebaseConfig = {
//     apiKey: "AIzaSyCya3Y0LzXUgbaM0jYJl5NzuMQduifRf38",
//     authDomain: "nockupscreen.firebaseapp.com",
//     projectId: "nockupscreen",
//     storageBucket: "nockupscreen.appspot.com",
//     messagingSenderId: "1082508191258",
//     appId: "1:1082508191258:web:6d48a8b57abda8a14653a3",
//     measurementId: "G-WXNLFTGGLL"
//   };
// //   // Initialize Firebase
//  const firebaseApp= firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
// </script>


import * as firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCya3Y0LzXUgbaM0jYJl5NzuMQduifRf38",
  authDomain: "nockupscreen.firebaseapp.com",
  projectId: "nockupscreen",
  storageBucket: "nockupscreen.appspot.com",
  messagingSenderId: "1082508191258",
  appId: "1:1082508191258:web:6d48a8b57abda8a14653a3",
  measurementId: "G-WXNLFTGGLL"
};
// firebase.firestore().settings({ experimentalForceLongPolling: true });
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true, merge: true });

export default firebase;
