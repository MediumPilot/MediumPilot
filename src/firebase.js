// firebase.js (disabled version)

const auth = {
  currentUser: null,
  signOut: async () => Promise.resolve(),
};

// Fake providers
const googleProvider = {};
const githubProvider = {};

// Fake auth methods
const signInWithEmailAndPassword = async () => ({
  user: { uid: "mockUser", email: "mock@example.com" },
});

const createUserWithEmailAndPassword = async () => ({
  user: { uid: "mockUser", email: "mock@example.com" },
});

// Fake auth state listener
const onAuthStateChanged = (auth, callback) => {
  // Immediately call callback with null (no user signed in)
  callback(null);
  // Return unsubscribe function
  return () => {};
};

export {
  auth,
  googleProvider,
  githubProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
};
