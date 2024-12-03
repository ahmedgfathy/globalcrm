import React from 'react';

const Unauthorized = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Unauthorized</h1>
      <p>You do not have access to this page. Please log in to continue.</p>
    </div>
  );
};

export default Unauthorized;