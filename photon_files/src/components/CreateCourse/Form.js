import { Button, DialogActions, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";
import {v4 as uuidV4} from 'uuid'
import db from "../../lib/firebase";

const Form = () => {
  const [courseName, setCourseName] = useState("");
  const [Section, setSection] = useState("");
  const [Room, setRoom] = useState("");

  const { loggedInMail, setCreateCourseDialog } = useLocalContext();

  const addClass = (e) => {
    e.preventDefault();
    const id = uuidV4();    //for unique id

    db.collection("CreatedCourses")
      .doc(loggedInMail)
      .collection("courses")
      .doc(id)
      .set({
        owner: loggedInMail,
        courseName: courseName,
        section: Section,
        room: Room,
        id: id,
      })
      .then(() => {
        setCreateCourseDialog(false);
      });
  };

  return (
    <div className="form">
      <p className="course_title">Create Course</p>

      <div className="form_inputs">
        <TextField
          id="filled-basic"
          label="Course Name (required)"
          className="form_input"
          variant="filled"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Section"
          className="form_input"
          variant="filled"
          value={Section}
          onChange={(e) => setSection(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Room"
          className="form_input"
          variant="filled"
          value={Room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <DialogActions>
        <Button onClick={addClass}>
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;