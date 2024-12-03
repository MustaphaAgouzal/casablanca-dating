document.addEventListener('DOMContentLoaded', () => {
  const editProfileForm = document.getElementById('edit-profile-form');
  const editUserNameInput = document.getElementById('edit-user-name');
  const editUserBioInput = document.getElementById('edit-user-bio');
  const editUserPicInput = document.getElementById('edit-user-pic');
  const currentProfilePic = document.getElementById('current-profile-pic');

  const loadProfile = () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
      editUserNameInput.value = userProfile.name;
      editUserBioInput.value = userProfile.bio;
      currentProfilePic.src = userProfile.pic || 'https://via.placeholder.com/150?text=Default';
    } else {
      alert('No profile found. Redirecting to profile creation.');
      window.location.href = 'profile.html';
    }
  };

  const saveProfile = (updatedProfile) => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      alert('Profile updated successfully!');
      window.location.href = 'index.html'; // Redirect to the main app
    } catch (error) {
      alert('Failed to save profile. Please try again.');
    }
  };

  editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedName = editUserNameInput.value.trim();
    const updatedBio = editUserBioInput.value.trim();
    const updatedPic = editUserPicInput.files[0];

    if (updatedName === '' || updatedBio === '') {
      alert('Please fill out all required fields.');
      return;
    }

    if (updatedPic) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const compressedPic = event.target.result; // Use compression logic if needed
        saveProfile({
          name: updatedName,
          bio: updatedBio,
          pic: compressedPic,
        });
      };
      reader.readAsDataURL(updatedPic);
    } else {
      const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
      saveProfile({
        name: updatedName,
        bio: updatedBio,
        pic: userProfile.pic || '',
      });
    }
  });

  loadProfile();
});
