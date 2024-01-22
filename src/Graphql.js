// src/App.js

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!) {
    addUser(username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String, $email: String) {
    updateUser(id: $id, username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
      email
    }
  }
`;

function Graphql() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
  });

  const handleAddUser = async () => {
    try {
      await addUser({ variables: { ...newUser } });
      setNewUser({ username: '', email: '' }); // Clear the form after adding user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (id, username, email) => {
    try {
      await updateUser({ variables: { id, username, email } });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser({ variables: { id } });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>MERN GraphQL App</h1>
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <h2>Users</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => handleUpdateUser(user.id, 'UpdatedUsername', 'updated@example.com')}>
              Update
            </button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Graphql;
