"use client";
import React, { useState } from 'react';
import { signUp, signIn, signOut, createUser, loginUser, getCurrentUserRole } from '../../actions/auth.js';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(email, password);
      setMessage('User signed up successfully!');
      console.log(response);
    } catch (error) {
      setMessage('Error signing up user.');
      console.error(error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(email, password);
      setMessage('User signed in successfully!');
      console.log(response);
    } catch (error) {
      setMessage('Error signing in user.');
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await signOut();
      setMessage('User signed out successfully!');
      console.log(response);
    } catch (error) {
      setMessage('Error signing out user.');
      console.error(error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(email, password, name, role);
      setMessage('User created successfully with role!');
      console.log(response);
    } catch (error) {
      setMessage('Error creating user.');
      console.error(error);
    }
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const { session, userRole } = await loginUser(email, password);
      setMessage(`User logged in successfully with role: ${userRole}`);
      console.log(session);
    } catch (error) {
      setMessage('Error logging in user.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Auth Form</h2>
      <form onSubmit={handleSignUp}>
        <h3>Sign Up</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <form onSubmit={handleLoginUser}>
        <h3>Sign In</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      <button onClick={handleSignOut}>Sign Out</button>

      <form onSubmit={handleCreateUser}>
        <h3>Create User with Role</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>

      <form onSubmit={handleLoginUser}>
        <h3>Login User</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default AuthForm;