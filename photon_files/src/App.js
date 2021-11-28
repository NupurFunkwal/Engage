import React, { useEffect, useState } from "react";
import { Drawer, JoinedCourses, Login, Main} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";
import { useLocalContext } from "./context/context";
import db from "./lib/firebase";
function App() {
  const { loggedInMail } = useLocalContext();

  const [createdCourses, setCreatedCourses] = useState([]);
  const [joinedCourses, setJoinedCourses] = useState([]);

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("CreatedCourses")
        .doc(loggedInMail)
        .collection("courses")
        .onSnapshot((snapshot) => {
          setCreatedCourses(snapshot.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [loggedInMail]);

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("JoinedCourses")
        .doc(loggedInMail)
        .collection("courses")
        .onSnapshot((snapshot) => {
          setJoinedCourses(snapshot.docs.map((doc) => doc.data().joinedData));
        });

      return () => unsubscribe();
    }
  }, [loggedInMail]);
  return (
    <Router>
      <Switch>
        {createdCourses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        {joinedCourses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        <IsUserRedirect
          user={loggedInMail}
          loggedInPath="/"
          path="/signin"
          exact
        >
          <Login />
        </IsUserRedirect>

        <ProtectedRoute user={loggedInMail} path="/" exact>
          <Drawer />
          <ol className="joined">
            {createdCourses.map((item) => (
              <JoinedCourses classData={item} />
            ))}

            {joinedCourses.map((item) => (
              <JoinedCourses classData={item} />
            ))}
          </ol>
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;