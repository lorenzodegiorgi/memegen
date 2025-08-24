'use strict';
const sqlite = require('sqlite3');
const express = require('express');
const dao = require('./dao');
const userDao = require('./user-dao');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

passport.use(new LocalStrategy(
  function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username and/or password.' });
      }

      return done(null, user);
    })
  }
));

//TODO: capire bene come funzionano
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); //available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// init express
const app = new express();
app.use(express.json());
const port = 3001;

/*
  MIDDLEWARES
*/

//Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'User not authenticated' });
}

//Middleware to check if the logged user is the creator of the meme
const creatorIsUser = (req, res, next) => {
  dao.getMemeById(req.params.id)
    .then(meme => {
      if (meme != undefined && meme.creator === req.user.username) {
        return next();
      } else {
        return res.status(401).json({ error: 'Unathorized action' });
      }
    }).catch(err => res.status(500).json(err));
}

//Middleware to check if the meme fits the constraints
const memeConstraints = (req, res, next) => {
  let meme = req.body.meme;
  let selectedMeme = req.body.selectedMeme;

  if(meme.title === '' || meme.background === '' || meme.font === '' || meme.creator === '' || meme.visibility === ''
  || meme.color === '' || meme.date === '')
    return res.status(500).json({error: 'Meme does not fit all constraints'});
    
  if (selectedMeme) {
    if (meme.background != selectedMeme.background) {
      return res.status(401).json({ error: 'Unauthorized action' });
    }
    if (meme.creator != selectedMeme.creator) {
      if (selectedMeme.visibility === 'protected' && meme.visibility === 'public') {
        return res.status(401).json({ error: 'Unauthorized action' });
      }
    }
  }

  if(meme.text1 === '' && meme.text2 === '' && meme.text3 === ''){
    return res.status(500).json({error: 'All texts are void'});
  }

  return next();
}

app.use(session({
  secret: 'Sentence used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/* 
  MEME API
*/

app.get('/api/memes', (req, res) => {
  if (req.user != undefined)
    dao.listMemes()
      .then((memes) => { res.json(memes) })
      .catch(err => res.status(500).json(err));
  else
    dao.listPublicMemes()
      .then((memes) => { res.json(memes) })
      .catch(err => res.status(500).json(err));

})

app.post('/api/meme/add', memeConstraints, (req, res) => {
  dao.addMeme(req.body.meme)
    .then((meme) => { res.json(meme) })
    .catch((error) => { res.status(500).json(error) });
})

app.delete('/api/meme/delete/:id', isAuthenticated, creatorIsUser, (req, res) => {
  dao.deleteMeme(req.params.id)
    .then(idMemes => res.status(200).json())
    .catch(err => res.status(500).json(err));
})

/* 
  USER API
*/
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (err) => {
      if (err)
        return next(err);

      return res.json(req.user);
    });
  })(req, res, next);
});

app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'User is not authenticated' });
});

app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
