document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    performSearch(query);
});

function performSearch(query) {
    // Simulate search results
    const results = [
        'Result 1 for ' + query,
        'Result 2 for ' + query,
        'Result 3 for ' + query
    ];

    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.textContent = result;
        resultsContainer.appendChild(resultElement);
    });
}

document.getElementById('toggleButton').addEventListener('click', function() {
    var searchBarContainer = document.getElementById('searchBarContainer');
    if (searchBarContainer.style.display === 'none') {
        searchBarContainer.style.display = 'block';
    } else {
        searchBarContainer.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function() {
        searchInput.style.display = 'block';
        searchInput.focus();
    });

    searchInput.addEventListener('input', function() {
        if (searchInput.value.length > 0) {
            searchInput.classList.add('show-clear');
        } else {
            searchInput.classList.remove('show-clear');
        }
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchInput.style.display = 'none';
            searchInput.classList.remove('show-clear');
        }
    });

    searchInput.addEventListener('click', function(event) {
        if (event.target.tagName === 'DIV' && event.target.classList.contains('show-clear')) {
            searchInput.value = '';
            searchInput.classList.remove('show-clear');
        }
    });
});
