import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../lib/firebase";

const AddContext = createContext();

export function useLocalContext(){
    return useContext(AddContext);
}

export function ContextProvider({children}){
    const [createCourseDialog, setCreateCourseDialog] = useState(false);
    const [joinCourseDialog, setJoinCourseDialog] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loggedInMail, setLoggedInMail] = useState(null);

    const login = () => auth.signInWithPopup(provider);
    const logout = () => auth.signOut();

    //checking if user exists or not
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            setLoggedInUser(authUser);
            setLoggedInMail(authUser.email);
          } else {
            setLoggedInUser(null);
            setLoggedInMail(null);
          }
        });
    
        return () => unsubscribe();
      }, []);

    
    const value = {
        createCourseDialog, 
        setCreateCourseDialog, 
        joinCourseDialog,
        setJoinCourseDialog,
        login,
        logout,
        loggedInUser,
        loggedInMail,
    };
    return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
}