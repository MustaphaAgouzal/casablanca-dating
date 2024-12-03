document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profile-form');
  const userNameInput = document.getElementById('user-name');
  const userBioInput = document.getElementById('user-bio');
  const userPicInput = document.getElementById('user-pic');

  // Function to compress the image
  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 300; // Set maximum width for compression
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert compressed image to Base64
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
        callback(compressedDataUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userName = userNameInput.value.trim();
    const userBio = userBioInput.value.trim();
    const userPic = userPicInput.files[0];

    if (userName === '' || userBio === '') {
      alert('Please fill out all required fields.');
      return;
    }

    if (userPic) {
      // Compress the image before storing
      compressImage(userPic, (compressedDataUrl) => {
        const userProfile = {
          name: userName,
          bio: userBio,
          pic: compressedDataUrl,
        };
        try {
          localStorage.setItem('userProfile', JSON.stringify(userProfile));
          window.location.href = 'index.html'; // Redirect to main app
        } catch (error) {
          alert('Failed to save profile. The image might still be too large.');
        }
      });
    } else {
      // Save profile without a picture
      const userProfile = {
        name: userName,
        bio: userBio,
        pic: '',
      };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      window.location.href = 'index.html'; // Redirect to main app
    }
  });
});
