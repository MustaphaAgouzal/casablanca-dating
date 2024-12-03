document.addEventListener('DOMContentLoaded', () => {
  // Main App Elements
  const profilePic = document.getElementById('profile-pic');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const likeBtn = document.getElementById('like-btn');
  const dislikeBtn = document.getElementById('dislike-btn');
  const chatSection = document.getElementById('chat-section');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const chatBox = document.getElementById('chat-box');
  const matchesList = document.getElementById('matches-list');

  // Modal Elements for Match Feedback
  const matchModal = document.createElement('div');
  matchModal.classList.add('modal');
  matchModal.style.display = 'none';
  document.body.appendChild(matchModal);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  matchModal.appendChild(modalContent);

  const matchMessage = document.createElement('h2');
  matchMessage.textContent = "🎉 It's a Match! 🎉";
  modalContent.appendChild(matchMessage);

  const matchName = document.createElement('p');
  modalContent.appendChild(matchName);

  const closeModalBtn = document.createElement('button');
  closeModalBtn.textContent = 'Close';
  modalContent.appendChild(closeModalBtn);

  // Match Sound
  const matchSound = new Audio('match-sound.mp3'); // Ensure this file exists in your project directory

  // Profiles for Matching
  const profiles = [
    {
      name: 'Ahmed',
      bio: 'Loves hiking and coffee.',
      pic: 'https://via.placeholder.com/150?text=Ahmed',
      likedByUser: false,
      likedBack: true,
    },
    {
      name: 'Sara',
      bio: 'Enjoys photography and cooking.',
      pic: 'https://via.placeholder.com/150?text=Sara',
      likedByUser: false,
      likedBack: false,
    },
    {
      name: 'Youssef',
      bio: 'Tech enthusiast and traveler.',
      pic: 'https://via.placeholder.com/150?text=Youssef',
      likedByUser: false,
      likedBack: true,
    },
  ];

  let currentProfileIndex = 0;
  let matches = JSON.parse(localStorage.getItem('matches')) || [];
  let activeChat = null;

  // Load User Profile
  const loadUserProfile = () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
      profileName.textContent = userProfile.name;
      profileBio.textContent = userProfile.bio;
      profilePic.src = userProfile.pic || 'https://via.placeholder.com/150?text=Default';
      document.getElementById('app-section').style.display = 'block';
    } else {
      window.location.href = 'profile.html';
    }
  };

  // Load Profiles for Matching
  const loadProfile = () => {
    if (currentProfileIndex < profiles.length) {
      const profile = profiles[currentProfileIndex];
      profilePic.src = profile.pic;
      profileName.textContent = profile.name;
      profileBio.textContent = profile.bio;
      document.getElementById('profile').classList.remove('swipe-left', 'swipe-right');
    } else {
      document.getElementById('profile-section').innerHTML = '<p>No more profiles to show!</p>';
      likeBtn.style.display = 'none';
      dislikeBtn.style.display = 'none';
    }
  };

  // Render Matches in List
  const renderMatches = () => {
    matchesList.innerHTML = '';
    matches.forEach((match) => {
      const matchItem = document.createElement('li');
      matchItem.textContent = match.name;
      matchItem.style.cursor = 'pointer';
      matchItem.addEventListener('click', () => loadChat(match.name));
      matchesList.appendChild(matchItem);
    });
  };

  // Check for Match
  const checkForMatch = (profile) => {
    if (profile.likedByUser && profile.likedBack) {
      matches.push(profile);
      localStorage.setItem('matches', JSON.stringify(matches));
      renderMatches();

      // Display Match Modal
      matchName.textContent = `You matched with ${profile.name}!`;
      matchModal.style.display = 'flex';

      // Play Match Sound
      matchSound.play();

      // Auto-close Modal
      setTimeout(() => {
        matchModal.style.display = 'none';
      }, 3000);
    }
  };

  // Handle Swipe Animations
  const handleSwipe = (direction) => {
    const profileCard = document.getElementById('profile');
    if (direction === 'left') {
      profileCard.classList.add('swipe-left');
    } else if (direction === 'right') {
      profileCard.classList.add('swipe-right');
    }
    setTimeout(() => {
      currentProfileIndex++;
      loadProfile();
    }, 500);
  };

  // Handle Like Button
  likeBtn.addEventListener('click', () => {
    if (currentProfileIndex < profiles.length) {
      const profile = profiles[currentProfileIndex];
      profile.likedByUser = true;
      checkForMatch(profile);
      handleSwipe('right');
    }
  });

  // Handle Dislike Button
  dislikeBtn.addEventListener('click', () => {
    if (currentProfileIndex < profiles.length) {
      handleSwipe('left');
    }
  });

  // Close Modal Button
  closeModalBtn.addEventListener('click', () => {
    matchModal.style.display = 'none';
  });

  // Initialize App
  chatSection.style.display = 'none';
  loadUserProfile();
  loadProfile();
  renderMatches();
});
