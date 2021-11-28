import { Avatar, Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import db, { storage } from "../../lib/firebase"
import "./style.css"
import firebase from "firebase"
import { useLocalContext } from "../../context/context"
import { Announcement } from ".."
import { AttachFile } from "@material-ui/icons"


const Main = ({ classData }) => {
  const { loggedInMail } = useLocalContext();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState(null);

  const handleUpload = () => {
    if(setInput){
          db.collection("announcements")
            .doc("courses")
            .collection(classData.id)
            .add({
              timstamp: firebase.firestore.FieldValue.serverTimestamp(),
              text: inputValue,
              sender: loggedInMail,
            });
    }
    setShowInput(false);
  };
  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classData.courseName}
              </h1>
              <div className="main__section main__overflow">
                {classData.section}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Course Code :</em>
                <div className="main__id">{classData.id}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                {showInput ? (
                  <div className="main__form">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="main__buttons">
                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          onClick={handleUpload}
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div>Discuss something in the class</div>
                  </div>
                )}
              </div>
            </div>
            <Announcement classData={classData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;