import React from 'react';

import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from './screens/Home';
import CreatePost from './screens/CreatePost';
import ViewPost from './screens/ViewPost';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="post/:postId" element={<ViewPost />} />
      </Routes>
    </div>
  );
}

export default App;
