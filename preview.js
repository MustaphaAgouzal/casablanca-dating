document.addEventListener('DOMContentLoaded', () => {
  const previewProfilePic = document.getElementById('preview-profile-pic');
  const previewProfileName = document.getElementById('preview-profile-name');
  const previewProfileBio = document.getElementById('preview-profile-bio');
  const backBtn = document.getElementById('back-btn');

  const loadProfile = () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
      previewProfilePic.src = userProfile.pic || 'https://via.placeholder.com/150?text=Default';
      previewProfileName.textContent = userProfile.name;
      previewProfileBio.textContent = userProfile.bio;
    } else {
      alert('No profile found. Redirecting to profile creation.');
      window.location.href = 'profile.html';
    }
  };

  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  loadProfile();
});
