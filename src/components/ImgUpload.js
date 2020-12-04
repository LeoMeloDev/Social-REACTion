import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { storage, db } from './firebase'

const ImgUpload = (props) => {
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                //complete function
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post image in db
                    db.collection('posts').add({
               
                        caption: caption,
                        image: url,
                        userName: props.userName
                    });

                    setProgress(0)
                    setCaption('')
                    setImage(null)
                })
            }
        )
    }
    
    return (
        <div className="imgupload">
            <progress className="imgupload__progressbar" value={progress} max='100'/>
            <input className="imgupload__caption" type="text" placeholder='Caption your REACTion!' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input className="imgupload__file" type="file" onChange={handleChange} />
            <Button className="imgupload__btn" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImgUpload