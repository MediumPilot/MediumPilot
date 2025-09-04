// userActions.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { store } from '../store';

export const setUser = (user) => ({ type: 'SET_USER', user });
export const clearUser = () => ({ type: 'CLEAR_USER' });
export const setCheckingAuth = (value) => ({
  type: 'SET_CHECKING_AUTH',
  value,
});

let unsubscribeAuth = null;

export function initAuthListener() {
  store.dispatch(setCheckingAuth(true));

  if (unsubscribeAuth) unsubscribeAuth();

  unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      store.dispatch(
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email,
          email: firebaseUser.email,
        })
      );
    } else {
      store.dispatch(clearUser());
    }
  });
}

export async function logout() {
  if (unsubscribeAuth) {
    unsubscribeAuth();
    unsubscribeAuth = null;
  }
  await signOut(auth);
  store.dispatch(clearUser());
}
