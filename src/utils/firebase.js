import {initializeApp} from "firebase/app";
import {getFirestore, doc, getDoc, setDoc, addDoc, deleteDoc, serverTimestamp, collection, collectionGroup, query, where, limit, getDocs, orderBy, updateDoc, documentId, increment, onSnapshot, startAfter} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  signInAnonymously,
  linkWithCredential,
  linkWithPopup,
  EmailAuthProvider,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
  reload,
  multiFactor,
  TotpMultiFactorGenerator,
  TotpSecret,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  getMultiFactorResolver,
} from "firebase/auth";
import {getStorage, ref, uploadBytes, getDownloadURL, getMetadata} from "firebase/storage";
import {getFunctions, httpsCallable} from "firebase/functions";
import {loadStripe} from "@stripe/stripe-js";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl3sLwTzMTc8x_fM7HV1FT880FK-N4pms",
  authDomain: "devatdeakin-65013.firebaseapp.com",
  projectId: "devatdeakin-65013",
  storageBucket: "devatdeakin-65013.firebasestorage.app",
  messagingSenderId: "381024319616",
  appId: "1:381024319616:web:0dfc6498f78ea0959d4e65",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// if (import.meta.env.DEV && import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN) {
//   self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;
// }

// initializeAppCheck(firebaseApp, {
//   provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
//   isTokenAutoRefreshEnabled: true,
// });

// Services (Auth, Firestore)
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export const functions = getFunctions(firebaseApp, "us-central1");

// Google Provider Config
const google = new GoogleAuthProvider();
google.setCustomParameters({prompt: "select_account"});

// Persistence
export const authReady = setPersistence(auth, browserLocalPersistence);

// Auth Helpers
// Anon auth on mount
export const anonAuth = async () => {
  const {user} = await signInAnonymously(auth);
  return user;
};

// Google sign in/signup / link
export const linkGoogle = async () => {
  const u = auth.currentUser;
  const {user} = await linkWithPopup(u, google);
  await createUser(user);
  return user;
};

export const continueWithGoogle = async () => {
  const u = auth.currentUser;

  try {
    if (u) {
      // Link Google to current user
      const {user} = await linkWithPopup(u, google);
      await createUser(user);
      return {user};
    } else {
      // Sign in with google
      const {user} = await signInWithPopup(auth, google);
      await createUser(user);
      return {user};
    }
  } catch (err) {
    console.log("util err", err.message);
    if (err.code === "auth/credential-already-in-use") {
      const cred = GoogleAuthProvider.credentialFromError(err);
      try {
        const {user} = await signInWithCredential(auth, cred);
        await createUser(user);
        return {user};
      } catch (err2) {
        if (err2.code === "auth/multi-factor-auth-required") {
          const mfaResolver = getMultiFactorResolver(auth, err2);
          return {mfaResolver};
        }
        throw err2;
      }
    }
    if (err.code === "auth/multi-factor-auth-required") {
      const mfaResolver = getMultiFactorResolver(auth, err);
      return {mfaResolver};
    }
    return {err};
  }
};

// Email/password sign in/signup
export const continueWithEmailPassword = async (email, password) => {
  const u = auth.currentUser;
  const cred = EmailAuthProvider.credential(email, password);

  if (u) {
    try {
      const {user} = await linkWithCredential(u, cred);
      await createUser(user);
      return user;
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        const {user} = await signInWithCredential(auth, cred);
        await createUser(user);
        return user;
      }
      throw err;
    }
  } else {
    const {user} = await signInWithCredential(auth, cred);
    await createUser(user);
    return user;
  }
};

// Email/password Password Reset
export const sendPasswordReset = async (email) => {
  if (!email) return;
  return sendPasswordResetEmail(auth, email);
};

// Email/password verification
export const sendVerification = async () => {
  const u = auth.currentUser;
  if (!u) return;
  return sendEmailVerification(u);
};

// Logout
export const logout = () => signOut(auth);

// Firestore Helpers
// Create user and store
export const createUser = async (user) => {
  if (!user?.uid) return;

  const userDocRef = doc(db, "users", user.uid);
  const snap = await getDoc(userDocRef);

  let payload = {
    displayName: user.displayName ?? null,
    email: user.email ?? null,
    photoURL: user.photoURL ?? null,
    phoneNumber: user.phoneNumber ?? null,
    updatedAt: serverTimestamp(),
    plan: "free",
    planId: null,
    subscriptionStatus: "inactive",
  };

  try {
    if (!snap.exists()) payload = {...payload, createdAt: serverTimestamp()}; // First creation add createdAt prop
    await setDoc(userDocRef, payload, {merge: true});
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return userDocRef;
};

export const createPost = async (post) => {
  const u = auth.currentUser;
  if (!u) return;

  const postsCol = collection(db, "users", u.uid, "posts");

  let payload = {
    postType: post.postType,
    title: post.title,
    question: post.question ?? null,
    tags: post.tags,
    abstract: post.abstract ?? null,
    article: post.article ?? null,
    imageUrl: post.imageUrl ?? null,
    videoUrl: post.videoUrl ?? null,
    likeCount: post.likeCount,
    viewCount: post.viewCount,
    authorId: post.authorId,
  };

  try {
    await addDoc(postsCol, {...payload, createdAt: serverTimestamp(), userId: u.uid});
  } catch (err) {
    console.log(err);
  }
};

export const updateDisplayName = async (newDisplayName) => {
  const u = auth.currentUser;
  if (!u || !u.uid) return null;
  const userDocRef = doc(db, "users", u.uid);

  let name = newDisplayName.trim();

  await setDoc(userDocRef, {displayName: name, updatedAt: serverTimestamp()}, {merge: true});
  await updateProfile(u, {displayName: name});
  await reload(u);
  return name;
};

export const updateDisplayPicture = async (imageUrl) => {
  const u = auth.currentUser;
  if (!u || !u.uid) return null;

  const userDocRef = doc(db, "users", u.uid);

  await setDoc(userDocRef, {photoURL: imageUrl}, {merge: true});
  await updateProfile(u, {photoURL: imageUrl});
  await reload(u);
};

export const fetchUser = async (u) => {
  if (!u || !u.uid) return null;
  const userDocRef = doc(db, "users", u.uid);
  const snap = await getDoc(userDocRef);

  if (snap.exists()) {
    return snap.data();
  } else {
    console.log("No doc found for userID");
    return null;
  }
};

export const reloadUser = async (u) => {
  await reload(u);
};

export async function fetchFeaturedPosts() {
  const q = query(collectionGroup(db, "posts"), orderBy("likeCount", "desc"), limit(3));
  const snap = await getDocs(q);
  let posts = snap.docs.map((d) => ({id: d.id, ...d.data()}));
  const ids = [...new Set(posts.map((p) => p.userId).filter(Boolean))];

  // Fetch user docs of authors to get their displayName
  const userSnaps = await Promise.all(ids.map((id) => getDoc(doc(db, "users", id))));
  const userById = Object.fromEntries(userSnaps.filter((s) => s.exists()).map((s) => [s.id, s.data()]));

  // Combine posts with displayName and photoURL
  return posts.map((p) => ({
    ...p,
    authorName: userById[p.userId]?.displayName ?? "Anonymous",
    authorPhoto: userById[p.userId]?.photoURL ?? null,
  }));
}

export async function fetchAllPosts({pageSize = 100, uid, random = false, postId, after}) {
  // Posts query
  let q;

  if (postId && uid) {
    q = query(collectionGroup(db, "posts"), where(documentId(), "==", doc(db, `users/${uid}/posts/${postId}`)));
  } else if (uid) {
    q = query(collection(db, `users/${uid}/posts`), orderBy("createdAt", "desc"), orderBy(documentId()), limit(pageSize));
  } else {
    // Fetch all
    q = query(collectionGroup(db, "posts"), orderBy("createdAt", "desc"), orderBy(documentId()), limit(pageSize));
  }

  let snap = await getDocs(q);

  if (after) {
    const next = query(collectionGroup(db, "posts"), orderBy("createdAt", "desc"), orderBy(documentId()), startAfter(after), limit(pageSize));

    snap = await getDocs(next);
  }
  let posts = snap.docs.map((d) => ({id: d.id, ...d.data()}));

  if (random) {
    const shuffled = [...posts];
    let currentIndex = shuffled.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    posts = shuffled;
  }

  // Create a set of all posts userIds (authors)
  const ids = [...new Set(posts.map((p) => p.userId).filter(Boolean))];

  // Fetch user docs of authors to get their displayName
  const userSnaps = await Promise.all(ids.map((id) => getDoc(doc(db, "users", id))));
  const userById = Object.fromEntries(userSnaps.filter((s) => s.exists()).map((s) => [s.id, s.data()]));

  // Add last visible
  const lastVisible = snap.docs[snap.docs.length - 1];
  const hasMore = !(snap.empty || snap.size < pageSize);

  // Combine posts with displayName and photoURL
  posts = posts.map((p) => ({
    ...p,
    authorName: userById[p.userId]?.displayName ?? "Anonymous",
    authorPhoto: userById[p.userId]?.photoURL ?? null,
  }));

  return {posts, lastVisible, hasMore};
}

// Firebase Cloud Storage
export async function uploadImage(file) {
  const fileName = file.name;

  const uploadRef = ref(storage, `images/${fileName}`);

  const snap = await uploadBytes(uploadRef, file);
  const url = await getDownloadURL(snap.ref);
  return url;
}

export async function uploadVideo(file) {
  const fileName = file.name;

  const uploadRef = ref(storage, `videos/${fileName}`);

  const snap = await uploadBytes(uploadRef, file);
  const url = await getDownloadURL(snap.ref);
  return url;
}

// Delete Posts

export const deletePosts = async (posts) => {
  const u = auth.currentUser;
  if (!u) return;

  try {
    const postsCol = collection(db, `users/${u.uid}/posts`);

    for (const postId of posts) {
      const postRef = doc(postsCol, postId);
      await deleteDoc(postRef);
    }

    console.log("Deleted posts:", posts);
  } catch (err) {
    console.error(err);
  }
};

export const doLike = async (authorId, postId) => {
  const u = auth.currentUser;
  if (!u) return;

  const likeRef = doc(db, `users/${authorId}/posts/${postId}/likes/${u.uid}`);
  const postRef = doc(db, `users/${authorId}/posts/${postId}`);
  const snap = await getDoc(likeRef);
  if (snap.exists()) return;
  try {
    await setDoc(likeRef, {createdAt: serverTimestamp()});
    await updateDoc(postRef, {likeCount: increment(1)});
  } catch (err) {
    console.error(err);
  }
};

export const createComment = async (comment) => {
  const u = auth.currentUser;
  if (!u) return;
  const commentCol = collection(db, `users/${comment.ownerId}/posts/${comment.postId}/comments`);
  const postRef = doc(db, `users/${comment.ownerId}/posts/${comment.postId}`);

  let payload = {
    text: comment.text.trim(),
    authorId: u.uid,
    authorName: u.displayName,
    authorPhoto: u.photoURL,
    postId: comment.postId,
    ownerId: comment.ownerId,
  };

  try {
    await addDoc(commentCol, {...payload, createdAt: serverTimestamp()});
    await updateDoc(postRef, {commentCount: increment(1)});
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (comment) => {
  const u = auth.currentUser;
  if (!u) return;

  const postRef = doc(db, `users/${comment.ownerId}/posts/${comment.postId}`);
  try {
    const commentsCol = collection(db, `users/${comment.ownerId}/posts/${comment.postId}/comments`);

    const commentRef = doc(commentsCol, comment.id);
    await deleteDoc(commentRef);
    await updateDoc(postRef, {commentCount: increment(-1)});
  } catch (err) {
    console.error(err);
  }
};

export const subscribeToComments = (postId, ownerId, onChange, onError = console.log) => {
  const commentsCol = collection(db, `users/${ownerId}/posts/${postId}/comments`);
  const q = query(commentsCol, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => ({id: d.id, ...d.data()}));
      onChange(list);
    },
    onError,
  );
};

export const subscribeToPost = (ownerId, postId, onChange, onError = console.log) => {
  const ref = doc(db, `users/${ownerId}/posts/${postId}`);
  return onSnapshot(ref, (snap) => onChange({id: snap.id, ...snap.data()}), onError);
};

export const updateSolution = async (comment) => {
  const u = auth.currentUser;
  if (!u) return;
  if (u.uid != comment.ownerId) return;

  const postsCol = collection(db, `users/${u.uid}/posts`);

  try {
    const postRef = doc(postsCol, comment.postId);
    setDoc(postRef, {solutionCommentId: comment.id}, {merge: true});
    setDoc(
      postRef,
      {
        solution: {
          text: comment.text,
          authorId: comment.authorId,
          authorName: comment.authorName,
          authorPhoto: comment.authorPhoto,
        },
      },
      {merge: true},
    );
  } catch (err) {
    console.log(err);
  }
};

// Add one view
export const addViewCount = async (post) => {
  const u = auth.currentUser;
  if (!u) return;

  try {
    const postRef = doc(db, `users/${post.authorId}/posts/${post.id}`);
    await setDoc(postRef, {viewCount: increment(1)}, {merge: true});
  } catch (err) {
    console.log(err);
  }
};

// MFA ---- TOTP
export const genTOTPSecret = async () => {
  const u = auth?.currentUser;
  if (!u) return;

  const multiFactorSession = await multiFactor(u).getSession();
  const totpSecret = await TotpMultiFactorGenerator.generateSecret(multiFactorSession);
  const uri = totpSecret.generateQrCodeUrl(u.email || u.uid, "DEV@Deakin");
  return {totpSecret: totpSecret, totpUri: uri};
};

export const enrollTOTP = async (totpSecret, verificationCode) => {
  const u = auth?.currentUser;
  if (!u) return;

  const a = TotpMultiFactorGenerator.assertionForEnrollment(totpSecret, verificationCode);
  await multiFactor(u).enroll(a, "Authenticator App");

  await u.reload();
};

export const getFactors = () => {
  const factors = multiFactor(auth.currentUser).enrolledFactors;
  return factors;
};

export const reauthWithPopup = async () => {
  const u = auth?.currentUser;
  await reauthenticateWithPopup(u, google);
};

export const reauthWithCredential = async (password) => {
  const u = auth?.currentUser;
  const cred = EmailAuthProvider.credential(u.email, password);
  await reauthenticateWithCredential(u, cred);
};

export const resolveTotp = async (mfaResolver, verificationCode) => {
  if (!mfaResolver) return;

  const code = verificationCode.trim();
  const hint = mfaResolver.hints[0];

  const assertion = TotpMultiFactorGenerator.assertionForSignIn(hint.uid, code);

  const userCred = await mfaResolver.resolveSignIn(assertion);
  return userCred;
};

// Stripe
export const callCreateCheckoutSession = httpsCallable(functions, "createCheckoutSession");
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// Newsletter
export const callSubscribeToNewsletter = (payload) => httpsCallable(functions, "subscribeToNewsletter")(payload);
// DEVBot
export const callSendToChat = httpsCallable(functions, "sendToChat");
