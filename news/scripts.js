document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '97b03ab867f04310bf04d8e6912f151f';
    const newsFeed = document.getElementById('news-feed');
    const searchInput = document.getElementById('search');
    const autocompleteList = document.getElementById('autocomplete-list');
    const defaultQuery = 'latest'; // Default query to load initial news

    const suggestions = [
        'Technology',
        'Sports',
        'Politics',
        'Business',
        'Entertainment',
        'Health',
        'Science',
        'World',
        'Travel'
    ];

    async function fetchNews(query = '') {
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);  // Log the data to check the response
            return data.articles;
        } catch (error) {
            console.error('Failed to fetch news:', error);
            return [];
        }
    }

    function displayNews(articles) {
        newsFeed.innerHTML = '';
        if (articles.length === 0) {
            newsFeed.innerHTML = '<p>No articles found.</p>';
        } else {
            articles.forEach(article => {
                const newsArticle = document.createElement('article');
                newsArticle.innerHTML = `
                    <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="Article Image">
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsFeed.appendChild(newsArticle);
            });
        }
    }

    async function loadNews(query = '') {
        const articles = await fetchNews(query);
        displayNews(articles);
    }

    function autocompleteMatch(input) {
        if (input === '') {
            return [];
        }
        const reg = new RegExp(input, 'i');
        return suggestions.filter(term => term.match(reg));
    }

    function displayAutocomplete(suggestions) {
        autocompleteList.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
                searchInput.value = suggestion;
                loadNews(suggestion);
                autocompleteList.innerHTML = ''; // Clear suggestions
            });
            autocompleteList.appendChild(suggestionItem);
        });
    }

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        const matches = autocompleteMatch(query);
        displayAutocomplete(matches);
        if (query.trim() === '') {
            loadNews(defaultQuery);
        } else {
            loadNews(query);
        }
    });

    loadNews(defaultQuery); // Load initial news feed with default query
});
