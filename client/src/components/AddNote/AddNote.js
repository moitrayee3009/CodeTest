import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import styles from './AddNote.module.css'

const AddNote = () => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  // const [imageURLs, setImageURLs] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const hiddenFileInput = useRef(null)

  const url = 'http://localhost:3001/newnote'

  const handleName = (event) => {
    setName(event.target.value)
  }

  const processImage = (e) => {
    let imageFile = e.target.files[0]
    let imageUrl = URL.createObjectURL(imageFile)
    setPreviewImage(imageUrl)
    setImage(imageFile)
  }

  const handleContent = (event) => {
    setContent(event.target.value)
  }

  const handleHiddenInput = (e) => {
    hiddenFileInput.current.click(e)
  }

  // useEffect(() => {
  //   if (image.length < 1) return

  //   const newURLs = []
  //   newURLs.push(URL.createObjectURL(image))
  // }, [image])

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('content', content)
    formData.append('name', name)
    formData.append('img', previewImage)

    axios.post(url, formData).then((response) => {
      // console.log(response)
    })
    setContent(null)
    setName(null)
    setPreviewImage('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imgContainer}>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => processImage(e)}
          hidden={true}
          ref={hiddenFileInput}
        />
        <div type='file' onClick={(e) => handleHiddenInput(e)}>
          {previewImage.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <img src={previewImage} alt='img' className={styles.radius} />
            </div>
          ) : (
            <div className={styles.divImgSelection}>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
              >
                +
              </p>{' '}
            </div>
          )}
        </div>
      </div>

      <div className={styles.textContainer}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={handleName}
        />
        <textarea
          placeholder='Enter your note...'
          name='content'
          onChange={handleContent}
        />
        <div className={styles.btnContainer}>
          <button type='submit'>Add Note</button>
        </div>
      </div>
    </form>
  )
}

export default AddNote
