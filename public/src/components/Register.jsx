import React from 'react';

const propTypes = {
};

const Register = props => (
  <div>
    <h1>Create An Account</h1>
    <h2>Email:</h2>
    <input type="text" name="email" />
    <h2>Password:</h2>
    <input type="text" name="password" />
    <p>
      <input type="submit" value="Create" />
    </p>
  </div>
);

export default Register;
