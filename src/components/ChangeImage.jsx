import { updateProfile } from '@/actions/users';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
const ChangeImageButton = ({ profile }) => {
  const myProfile = profile;
  const [profileImage, setProfileImage] = useState(myProfile.image);

  const handleImageChange = (event) => {
    setProfileImage(profileImage);
  };
  return (
    <div>
      <form action={updateProfile} className='flex w-full flex-col items-start gap-4'>
        <div className='flex w-full gap-4'>
          <label htmlFor='image' className='text-right'>
            Change Profile Image
          </label>
          <Input type='file' name='image' key='file' onChange={handleImageChange} />
          <Button type='submit'>change profile</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangeImageButton;

//* chat gpt code im desprate at this point

// import { updateProfile } from '@/actions/users';
// import React, { useState } from 'react';
// import { Button } from './ui/button';
// import { Input } from '@/components/ui/input';

// const ChangeImageButton = ({ profile }) => {
//   const [profileImage, setProfileImage] = useState(profile.image);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file); // Store the selected file
//       setProfileImage(URL.createObjectURL(file)); // Update the preview image
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('image', selectedFile);

//       try {
//         await updateProfile(formData); // Send formData to updateProfile
//         alert('Profile updated successfully');
//       } catch (error) {
//         console.error('Error updating profile:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className='flex w-full flex-col items-start gap-4'>
//         <div className='flex w-full gap-4'>
//           <label htmlFor='image' className='text-right'>
//             Change Profile Image
//           </label>
//           <Input type='file' name='image' onChange={handleImageChange} />
//           <Button type='submit'>Change Profile</Button>
//         </div>

//         {/* Image preview */}
//         {profileImage && (
//           <img
//             src={profileImage}
//             alt='Profile Preview'
//             style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px' }}
//           />
//         )}
//       </form>
//     </div>
//   );
// };

// export default ChangeImageButton;
