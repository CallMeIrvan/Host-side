import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA3jn9pp1gg_98AuDRGmCIQaUQVzbNKkCY",
  databaseURL: "https://kuis-fpk-kemahkris-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
