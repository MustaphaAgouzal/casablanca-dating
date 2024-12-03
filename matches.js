document.addEventListener('DOMContentLoaded', () => {
  const matchesList = document.getElementById('matches-list');

  // Default mockup profile pictures
  const defaultMalePic = 'https://randomuser.me/api/portraits/men/75.jpg';
  const defaultFemalePic = 'https://randomuser.me/api/portraits/women/65.jpg';

  // Load Matches from LocalStorage
  const loadMatches = () => {
    const matches = JSON.parse(localStorage.getItem('matches')) || [];
    matchesList.innerHTML = '';

    if (matches.length === 0) {
      matchesList.innerHTML = '<p>No matches yet. Start swiping to find matches!</p>';
      return;
    }

    matches.forEach((match, index) => {
      const matchItem = document.createElement('li');
      matchItem.classList.add('match-item');

      const matchImage = document.createElement('img');
      matchImage.src = match.pic || (match.gender === 'female' ? defaultFemalePic : defaultMalePic);
      matchImage.alt = match.name;
      matchImage.classList.add('match-image');

      const matchName = document.createElement('h2');
      matchName.textContent = match.name;

      const viewProfileButton = document.createElement('button');
      viewProfileButton.textContent = 'View Profile';
      viewProfileButton.addEventListener('click', () => {
        localStorage.setItem('profileToView', JSON.stringify(match));
        window.location.href = 'view-profile.html';
      });

      const unmatchButton = document.createElement('button');
      unmatchButton.textContent = 'Unmatch';
      unmatchButton.style.backgroundColor = '#dc3545';
      unmatchButton.style.color = 'white';
      unmatchButton.addEventListener('click', () => {
        handleUnmatch(index);
      });

      matchItem.appendChild(matchImage);
      matchItem.appendChild(matchName);
      matchItem.appendChild(viewProfileButton);
      matchItem.appendChild(unmatchButton);

      matchesList.appendChild(matchItem);
    });
  };

  // Handle Unmatch
  const handleUnmatch = (index) => {
    let matches = JSON.parse(localStorage.getItem('matches')) || [];
    const removedMatch = matches.splice(index, 1);
    localStorage.setItem('matches', JSON.stringify(matches));
    loadMatches();

    alert(`You have unmatched with ${removedMatch[0].name}.`);
  };

  loadMatches();
});
