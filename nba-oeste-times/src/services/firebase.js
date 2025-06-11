import app from '../../firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  getDocs
} from 'firebase/firestore';

const auth = getAuth(app);
const firestore = getFirestore(app);

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential;
};

export const logout = () => {
  return signOut(auth);
};

export const toggleFavorite = async (userId, teamId) => {
  const favoriteRef = doc(firestore, `users/${userId}/favorites`, teamId.toString());
  const favoriteSnapshot = await getDoc(favoriteRef);

  if (favoriteSnapshot.exists()) {
    await deleteDoc(favoriteRef);
    return false;
  } else {
    await setDoc(favoriteRef, { favoritedAt: new Date() });
    return true;
  }
};

export const getUserFavorites = async (userId) => {
  const favoritesRef = collection(firestore, `users/${userId}/favorites`);
  const querySnapshot = await getDocs(favoritesRef);
  return querySnapshot.docs.map(doc => doc.id);
};

export { auth, firestore };
