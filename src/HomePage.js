import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import React from 'react';

function HomePage(props) {
  const { isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <h1>Home</h1>
  );
}

export default HomePage;
