import { environment } from "./environments/environment.dev";

// src/app/firebase-config.ts
export const firebaseConfig = {
    apiKey: environment.firebase.apiKey,
    authDomain: environment.firebase.authDomain,
    databaseURL: environment.firebase.databaseURL,
    projectId: environment.firebase.projectId,
    storageBucket: environment.firebase.storageBucket,
    messagingSenderId: environment.firebase.messagingSenderId,
    appId: environment.firebase.appId
};