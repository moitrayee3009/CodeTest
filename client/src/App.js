import React, { useState } from 'react'

import ReactPlayer from 'react-player'
import logo from './logo.png'
import './App.css'
import GetNotes from './components/GetNotes/GetNotes'
import AddNote from './components/AddNote/AddNote'

const App = () => {
  const [fetchNotes, setFetchNotes] = useState(true)

  return (
    <div className='App'>
      <div className='MainRow'>
        <div className='VideoContainer'>
          <div className='VideoCover' />
          <ReactPlayer
            className='ReactPlayer'
            width='100%'
            height='100%'
            url='https://www.youtube.com/watch?v=f1x9lgX8GaE&t=319s'
            playing
            loop
            muted
          />
          <img src={logo} className='AppLogo' alt='logo' />
        </div>
        <div className='NotesContainer'>
          <div className='NotesContainerSection'>
            <AddNote setFetchNotes={setFetchNotes} />
          </div>

          <div className='NotesContainerSection'>
            <GetNotes fetchNotes={fetchNotes} setFetchNotes={setFetchNotes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
