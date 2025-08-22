import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "./FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
const provider = new GoogleAuthProvider();

// Sign In

export async function signInUser() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const checkUser = await getUserById(user.uid);
    if (!checkUser.data) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
    return { data: user };
  } catch (error) {
    return { error: error.message };
  }
}

// Get User By ID
export async function getUserById(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { data: userSnap.data() };
    } else {
      return { data: null };
    }
  } catch (error) {
    return { error: error.message };
  }
}

// Sign Out
export async function signOutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPic");
    return { data: "Signed Out Successfully" };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error: error.message };
  }
}
