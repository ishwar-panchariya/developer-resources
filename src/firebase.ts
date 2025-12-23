import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { environment } from "./environments/environment.development";

const firebaseConfig = {
  apiKey: environment.firebaseConfig.apiKey,
  authDomain: environment.firebaseConfig.authDomain,
  projectId: environment.firebaseConfig.projectId,
  storageBucket: environment.firebaseConfig.storageBucket,
  messagingSenderId: environment.firebaseConfig.messagingSenderId,
  appId: environment.firebaseConfig.appId,
  measurementId: environment.firebaseConfig.measurementId
};

console.log(firebaseConfig)
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
