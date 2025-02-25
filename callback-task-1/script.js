function delayFunction
    (callback) {
    setTimeout(() => {
        callback();
    }, 5000);
}

// Function to fetch data from the API
function fetch() {
    // Fetch data from the JSONPlaceholder API
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            const postsList = document.getElementById('message');
            message.innerHTML = '';
            data.posts.forEach(post => {
                const listItem = document.createElement('li');
                listItem.innerText = post.title;
                message.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            const message = document.getElementById('message');
            postsList.innerHTML = '<li>Error loading posts. Please try again later.</li>';
        });
}

// Function to update the div text and display the message box
function updateMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = 'Fetching posts after 5 seconds...';
    messageDiv.style.display = 'block';

    fetch();
}

document.getElementById('startButton').addEventListener('click', () => {
    delayFunction
        (updateMessage);
});








