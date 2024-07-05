document.addEventListener('DOMContentLoaded', function() {
    updateHitCount();
    loadFavorites();
});

function addToFavorites(anime) {
    const favoriteList = document.getElementById('favorite-list');
    const listItem = document.createElement('li');
    listItem.textContent = anime;
    favoriteList.appendChild(listItem);

    saveFavoritesToLocalStorage(anime);
}

function saveFavorites() {
    const favoriteList = document.getElementById('favorite-list');
    const items = favoriteList.getElementsByTagName('li');
    const favorites = [];
    for (let i = 0; i < items.length; i++) {
        favorites.push(items[i].textContent);
    }

    fetch('save_favorites.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorites: favorites })
    })
    .then(response => response.text())
    .then(data => {
        alert('Favorites saved successfully!');

        favoriteList.innerHTML = '';
        localStorage.removeItem('favorites');
    })
    .catch(error => {
        console.error('Error saving favorites:', error);
    });
}

function saveFavoritesToLocalStorage(anime) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(anime);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteList = document.getElementById('favorite-list');
    favoriteList.innerHTML = ''; // Clear existing list
    favorites.forEach(anime => {
        const listItem = document.createElement('li');
        listItem.textContent = anime;
        favoriteList.appendChild(listItem);
    });
}

function updateHitCount() {
    fetch('hit_counter.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('hit-count').textContent = data;
        });
}
