
function fetchPosts() {
    const fetchPromise = fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            throw new Error('Error fetching posts: ' + error);
        });

    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Operation timed out.")), 5000)
    );

    return Promise.race([fetchPromise, timeoutPromise]);
}

function displayPosts(posts) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '';
    let postTitles = 'Fetched Post Titles:\n';
    posts.forEach(post => {
        postTitles += `${post.title}\n`;
    });

    messageDiv.innerText = postTitles;
}

// Function to handle the Promise
function handleFetchPosts() {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = 'Loading...';
    messageDiv.style.display = 'block';

    fetchPosts()
        .then(data => {
            messageDiv.style.display = 'block';
            displayPosts(data.posts);
        })
        .catch(error => {
            messageDiv.innerText = error.message;
            console.error('Error:', error);
        });
}

document.getElementById('startButton').addEventListener('click', handleFetchPosts);