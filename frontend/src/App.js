import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserView from './components/UserView';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/create" element={<UserForm/>} />
        <Route path="/edit/:id" element={<UserForm/>} />
        <Route path="/view/:id" element={<UserView/>} />
      </Routes>
    </Router>
  );
}

export default App;
