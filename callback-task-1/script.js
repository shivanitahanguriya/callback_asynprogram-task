function delayFunction(callback) {
    setTimeout(() => {
        callback();
    }, 5000);
}

// Function to fetch data from the API
function fetchPosts() {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML = '';
            data.posts.forEach(post => {
                const listItem = document.createElement('li');
                listItem.innerText = post.title;
                messageDiv.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML = '<li>Error loading posts. Please try again later.</li>';
        });
}

function updateMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = 'Fetching posts after 5 seconds...';
    messageDiv.style.display = 'block';

    fetchPosts();
}

document.getElementById('button').removeEventListener('click', updateMessage);
document.getElementById('button').addEventListener('click', () => {
    delayFunction(updateMessage);
});

