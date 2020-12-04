import React, { useState, useEffect} from 'react'
import './App.css';
import Header from './components/Header'
import Post from './components/Post'
import { db, auth } from './components/firebase'

//Modal, Button and Input imports (Material UI)
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

//Image Upload 
import ImgUpload from './components/ImgUpload'

//Modal styling (Material UI)
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LogBtn = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginRight: '10px',
    fontFamily: [
      'Open Sans',
      
    ].join(','),
    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#fff',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      borderColor: '#fff',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const App = () => {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle);
  //useState to update posts
  const [posts, setPosts] = useState([])
  //useState for Modals
  const [open, setOpen] = useState(false)
  //Authentication useState
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //Login
  const [openLogin, setOpenLogin] = useState(false)

  //Authentication useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in already
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out 
        setUser(null)
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, userName])


  // useEffect linking Database
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));  
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      return auth.user.updateProfile({
        displayName: userName
      })
    })
    .catch((error) => alert(error.message))
  }

  const login = (event) => {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenLogin(false)
  }

  return (
    <div className="app">
      {/* Sign up Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
          {/* SIGN UP FORM */}
           <form className="form">
            <h2 className="modal__title">Social REACTion</h2> 
            <Input 
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
           </form>
          </div>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        >
          <div style={modalStyle} className={classes.paper}>
          {/* SIGN UP FORM */}
           <form className="form">
            <h2 className="modal__title">Social REACTion</h2> 
            <Input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={login}>Login</Button>
           </form>
          </div>
      </Modal>


        <header>
          <h1>Social REACTion</h1>
          {/* Sign Up & Sign Out */}
          <div className="header__logindetails">
          {user ? (
              <LogBtn onClick={() => auth.signOut()}>Logout</LogBtn>
          ) : (
            <div className="header__loginContainer">
              <LogBtn onClick={() => setOpenLogin(true)}>Login</LogBtn>
              <LogBtn onClick={() => setOpen(true)}>Sign Up</LogBtn>
            </div>
            
          )}
          </div>
        </header>


      {/* Img Uploader */}
      {user?.displayName ? (
        <ImgUpload userName={user.displayName} />
      ): (
        <div></div>
      )}
      
      
      {/* Posts */}
      {
        posts.map(({id, post}) => (
          <Post key={id} userName={post.userName} caption={post.caption} image={post.image} />
        ))
      }
    </div>
  )
}

export default App;
