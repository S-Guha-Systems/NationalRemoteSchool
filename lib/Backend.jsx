import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, storage } from "./FirebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, list, ref } from "firebase/storage";
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
        role: "student",
        registeredAt: serverTimestamp(),
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

// Fetch Single Book (from /public folder)
export async function fetchSingleBook(userClass, subject) {
  try {
    const fileName = `${subject}.pdf`; // Example: English → English.pdf
    const url = `/BOOKS/${userClass}/${fileName}`;

    return {
      data: [
        {
          name: fileName,
          url,
        },
      ],
    };
  } catch (error) {
    return { error: error.message };
  }
}

// Update User Data
export async function updateUserData(userId, userData, updaterId) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        ...userData,
        updatedBy: updaterId,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return { data: "User data updated successfully" };
  } catch (error) {
    return { error: error.message };
  }
}
