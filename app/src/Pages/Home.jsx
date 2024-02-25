import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Please login to continue</p>
      <Link to="/registeruser">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
