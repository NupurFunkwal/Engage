import { useState } from "react";
import { Avatar, Button, Dialog, Slide, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react'
import { useLocalContext } from '../../context/context'
import db from '../../lib/firebase';
import './style.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const JoinCourse = () => {
    const {joinCourseDialog, setJoinCourseDialog, loggedInUser} = useLocalContext();

    const [courseCode, setCourseCode] = useState("");
    const [email, setemail] = useState("");
    const [error, setError] = useState();
    const [joinedData, setJoinedData] = useState();
    const [courseExists, setCourseExists] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        db.collection("CreatedCourses")
          .doc(email)
          .collection("courses")
          .doc(courseCode)
          .get()
          .then((doc) => {
            if (doc.exists && doc.owner !== loggedInUser.email) {
                //course exists
              setCourseExists(true);
              setJoinedData(doc.data());
              setError(false);
            } else {
                //course doesnt exist
              setError(true);
              setCourseExists(false);
              return;
            }
          });
    
        if (courseExists === true) {
            //if course exists
          db.collection("JoinedCourses")
            .doc(loggedInUser.email)
            .collection("courses")
            .doc(courseCode)
            .set({
              joinedData,
            })
            .then(() => {
              setJoinCourseDialog(false);
            });
        }
      };

    return (
        <div>
            <Dialog
                fullScreen
                open={joinCourseDialog}
                onClose={() => setJoinCourseDialog(false)}
                TransitionComponent={Transition}
            >
                <div className="joinCourse">
                    <div className="joinCourse_wrapper">
                        <div
                            className="joinCourse_wrapper2"
                            onClick={() => setJoinCourseDialog(false)}
                        >
                            <Close className="joinCourse_svg" />
                            <div className="joinCourse_topHead">
                                Join Course
                            </div>
                        </div>

                        <Button
                            className="joinCourse_btn"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Join
                        </Button>
                    </div>

                    <div className="joinCourse_form">
                        <p className="joinCourse_formText">
                            You're currently signed in as {loggedInUser?.email}
                        </p>
                        <div className="joinCourse_loginInfo">
                            <div className="joinCourse_courseLeft">
                                <Avatar src={loggedInUser?.photoURL}/>
                                <div className="joinCourse_loginText">
                                    <div className="joinCourse_loginName">
                                        {loggedInUser?.displayName}
                                    </div>
                                    <div className="joinCourse_loginEmail">
                                        {loggedInUser?.email}
                                    </div>
                                </div>
                            </div>
                            <Button>
                                Logout
                            </Button>
                        </div>
                    </div>

                    <div className="joinCourse_form">
                        <div
                            style={{ fontSize: "1.25rem", color: "#3c4043" }}
                            className="joinCourse_formText"
                            >
                            Course Code
                        </div>
                        <div
                            style={{ color: "#3c4043", marginTop: "-5px" }}
                            className="joinCourse_formText"
                            >
                            Enter a valid course code here.
                        </div>
                        <div className="joinCourse_loginInfo">
                            <TextField
                                id="outlined-basic"
                                label="Course Code"
                                variant="outlined"
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)}
                                error={error}
                                helperText={error && "Course not found"}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Owner's email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default JoinCourse
