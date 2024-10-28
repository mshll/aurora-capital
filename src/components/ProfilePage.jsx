'use client';
import React, { useState } from 'react';
import ChangeImageButton from './ChangeImage';

const ProfilePage = ({ profile }) => {
  const myProfileAccount = profile;
  const [profileImage, setProfileImage] = useState(myProfileAccount.image);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>{myProfileAccount.username}</h1>
      <h2>Balance: ${myProfileAccount.balance}</h2>

      <div style={{ marginBottom: '20px' }}>
        <img
          src={profileImage}
          alt='Profile'
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>

      <input type='file' accept='image/*' onChange={handleImageChange} />
      <button onClick={() => setProfileImage(profileImage)}>change</button>
      {/* <ChangeImageButton onclick={() => setProfileImage(profileImage)} /> */}
    </div>
  );
};

export default ProfilePage;
