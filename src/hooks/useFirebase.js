import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInUsingGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };

  const signInUsingEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      console.log(result);
    });
  };
  // const createNewAccount = (email, password, name) => {
  //   createUserWithEmailAndPassword(auth, email, password).then((result) => {
  //     console.log(result);
  //     setUserName(name);
  //   });
  // };

  // const setUserName = (name) => {
  //   updateProfile(auth.currentUser, {
  //     displayName: name,
  //   }).then((result) => {
  //     console.log(result);
  //   });
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  return {
    user,
    signInUsingGoogle,
    logOut,
    signInUsingEmailAndPassword,
  };
};

export default useFirebase;
