// App.js
import React, { useState, useEffect } from 'react';
import './css/App.css'; 
import PostList from './containers/PostList';

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsAppLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="App">
      {isAppLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Post List</h1>
          <PostList />
        </div>
      )}
    </div>
  );
}

export default App;
