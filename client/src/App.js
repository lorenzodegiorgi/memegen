import React from 'react';
import MemeGeneration from './memeGeneration';
import MemeList from './memeList';
import MemeShow from './memeShow';
import './App.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from './NavigationBar';
import LoginForm from './loginForm';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from './API';
import UserContext from './userContexts';

const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


function App() {
  const [memes, setMemes] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleError = (err) => {
    console.log(err);
    if(err.descr){
      setShowMessage(true)
      setMessage(err.descr);
    }else{
      setMessage('Impossible to perform the action');
    }
    setDirty(true);
  }


  //Update the context 
  useEffect(() => {
    const checkContext = async () =>{
      if(loggedIn){
        const user = await API.getUserInfo();
        setUserInfo(user);
        setShowMessage(false);
        setMessage('');
      }
    }
    checkContext();
  }, [loggedIn]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await API.getUserInfo();
        setLoggedIn(true);
      } catch (err) {
        console.error(err.error);
      }
    }
    checkAuthentication();
  }, []);

  useEffect(() => {
    API.loadAllMemes()
      .then(memes => {
        setMemes(memes);
        setLoading(false);
        setDirty(false);
      })
      .catch(err => handleError(err));
  }, [dirty, loggedIn]);

  const addMeme = (meme, selectedMeme) => {
    meme.status = 'added';
    setMemes((oldMemes) => [...oldMemes, meme]);

    API.addMeme(meme, selectedMeme)
      .then(() => {
        setDirty(true);
      })
      .catch(err => {handleError(err)});
  }

  const deleteMeme = (deletedMeme) => {
    setMemes(oldMemes => {
      return oldMemes.map(meme => {
        if (meme.id === deletedMeme.id) {
          return { ...meme, status: 'deleted' };
        } else {
          return meme;
        }
      })
    });

    API.deleteMeme(deletedMeme.id)
      .then(() => {
        setDirty(true);
      })
      .catch(err => handleError(err));
  }

  const doLogIn = async (credentials) => {
    try {
      await API.logIn(credentials);
      setLoggedIn(true);
    } catch (err) {
      handleError(err);
    }
  }

  const doLogOut = async () => {
    try {
      await API.logOut();
      setLoggedIn(false);
      // clean up
      setMessage('');
    } catch (err) {
      handleError({ ...err, descr: 'Impossible to do logout. Try again.' })
    }
  }

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={loggedIn ? userInfo : ''}>
          <header>
            <NavigationBar loggedIn={loggedIn} logOut={doLogOut} />
          </header>
          <main>
            <Container fluid className="App-main">
              <Col xs={12} md={{span:10, offset:1}}>
              {message && showMessage ? <Alert variant="danger" onClose={() => setShowMessage(false)} dismissible>{message}</Alert> : ''}
              <Switch>
                <Route exact path="/show" render={({ match }) => (<MemeShow />)}>
                </Route>
                <Route exact path="/login">
                  <> {loggedIn ? <Redirect to="/" /> : <LoginForm doLogIn={doLogIn}></LoginForm>}</>
                </Route>
                <Route path="/create">
               <MemeGeneration addOrCopy={addMeme}/>
                </Route>
                <Route path="/" render={() =>
                      <React.Fragment>
                        {loading ? <h2 className="Title">
                          Loading memes
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-clockwise loading-icon" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                        </h2> :
                          <MemeList memes={memes} deleteMeme={deleteMeme} />
                        } </React.Fragment> 
                } />
              </Switch>
              </Col>
            </Container>
          </main>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
