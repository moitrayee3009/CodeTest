import React, { useState, useEffect } from 'react'
import axios from 'axios'
import classes from './GetNotes.module.css'

function GetNotes() {
  const [notes, setNotes] = useState([])
  const [error, setError] = useState({
    message: '',
    success: false
  })
  const url = 'http://localhost:3001/getnotes'

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setNotes(response.data)
        setError({
          message: '',
          success: true
        })
      })
      .catch((err) => {
        setError({
          message: err.err,
          success: false
        })
      })
  }, [notes])

  let filteredNotes = notes.filter(function (el) {
    return el != null
  })

  return (
    <div>
      {filteredNotes.map((note, i) => (
        <div key={i} className={classes.note}>
          <div className={classes.imgContainer}>
            <img
              src={note.user.img}
              className={classes.img}
              //style={{ height: '100px', width: '100px' }}
              alt=' img'
            />
          </div>
          <div className={classes.textContainer}>
            <p className={classes.name}>{note.user.name}</p>
            <p className={classes.content}>{note.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GetNotes
