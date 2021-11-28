import React from 'react'
import { Avatar } from "@material-ui/core"
import { FolderOpen, PermContactCalendar } from "@material-ui/icons"
import { Link } from "react-router-dom"
import "./style.css"

const JoinedCourses = ({classData}) => {
    return (
        <li className="joined__list">
        <div className="joined__wrapper">
          <div className="joined__container">
            <div className="joined__imgWrapper" />
            <div className="joined__image" />
            <div className="joined__content">
              <Link className="joined__title" to={`/${classData.id}`}>
                <h2>{classData.courseName}</h2>
              </Link>
              <p className="joined__owner">{classData.owner}</p>
            </div>
          </div>
        </div>
      </li>
    )
}

export default JoinedCourses
