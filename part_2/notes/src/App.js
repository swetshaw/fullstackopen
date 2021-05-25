import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import LoginForm from './components//LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, created by Sweta Shaw under the Department of Computer
        Science, University of Helsinki 2021
      </em>
    </div>
  );
};

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const noteFormRef = useRef();

  const noteForm = () => (
    <Togglable buttonLabel='Create Note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  // console.log('render', notes.length, 'notes');

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
    .create(noteObject)
    .then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be changed`);
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMsg(`Note ${note.content} was already removed from the server`);
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);

        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMsg('Wrong Credentials');
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }

    console.log('Logging in with', username, password);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg}></Notification>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
