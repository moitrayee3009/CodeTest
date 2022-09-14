import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import styles from './AddNote.module.css'

const AddNote = ({ setFetchNotes }) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const hiddenFileInput = useRef(null)

  const url = 'http://localhost:3001/getnotes'

  const processImage = (e) => {
    let imageFile = e.target.files[0]
    let imageUrl = URL.createObjectURL(imageFile)
    setPreviewImage(imageUrl)
    setImage(imageFile)
  }

  const handleHiddenInput = (e) => {
    hiddenFileInput.current.click(e)
  }

  const validateName = (name) => {
    if (name) {
      name = name.trim()
    }
    return name && name.length >= 3 && name.length <= 64
  }

  const validateContent = (content) => {
    if (content) {
      content = content.trim()
    }
    return content && content.length >= 50 && content.length <= 500
  }

  const handleName = (event) => {
    setName(event.target.value)
    // const valid = validateName(event.target.value)
    // if (valid) {
    //   setName(event.target.value)
    // }
  }

  const handleContent = (event) => {
    setContent(event.target.value)
    // const valid = validateContent(event.target.value)
    // if (valid) {
    //   setContent(event.target.value)
    // }
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

    // let valid = true

    // valid =
    //   valid &&
    //   previewImage != null &&
    //   (previewImage.type === 'image/jpeg' || previewImage.type === 'image/png')

    axios.post(url, formData).then((response) => {
      // console.log(response)
    })
    setFetchNotes(true)
    setContent('')
    setName('')
    setPreviewImage('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imgContainer}>
        <input
          type='file'
          accept='image/jpg, image/jpeg, image/png'
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
          value={name}
          onChange={handleName}
        />
        <textarea
          placeholder='Enter your note...'
          name='content'
          value={content}
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
