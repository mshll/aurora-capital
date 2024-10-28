'use client';
import { updateProfile } from '@/actions/users';
import React, { useState } from 'react';
import ChangeImageButton from './ChangeImage';

const ProfilePage = ({ profile }) => {
  const myProfileAccount = profile;
  const [profileImage, setProfileImage] = useState(myProfileAccount.image);

  const handleImageChange = (event) => {
    setProfileImage(profileImage);
  };
  //   const handleChange = () => {
  //     setProfileImage(profileImage);
  //   };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>{myProfileAccount.username}</h1>
      <h2>Balance: ${myProfileAccount.balance}</h2>
      <ChangeImageButton
        profile={myProfileAccount}
        //   onImageChange={handleImageChange}
      />
    </div>
  );
};

export default ProfilePage;
