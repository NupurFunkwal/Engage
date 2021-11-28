import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "../../lib/firebase";
import "./style.css";
const Announcement = ({ classData }) => {
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    if (classData) {
      let unsubscribe = db
        .collection("announcements")
        .doc("courses")
        .collection(classData.id)
        .onSnapshot((snap) => {
          setAnnouncement(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData]);

  return (
    <div>
      {announcement.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{item.sender}</div>
            </div>
            <p className="amt__txt">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;