
 // Function to fetch posts using Async/Await with error handling
 async function fetchPosts() {
    const messageDiv = document.getElementById('message');
    const postListDiv = document.getElementById('postList');

    // Show loading message
    messageDiv.style.display = 'block';
    messageDiv.innerText = 'Loading...';
    postListDiv.innerHTML = '';  // Clear any previous posts

    try {
        // Set a timeout for the fetch request (5 seconds)
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Request timed out")), 5000)
        );

        // Fetch data from the API, race it with timeout
        const response = await Promise.race([fetch('https://dummyjson.com/posts'), timeoutPromise]);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data: ' + response.statusText);
        }

        const data = await response.json();
        
        // Call function to display posts after data is fetched
        displayPosts(data.posts);

        // Hide loading message after fetch completes
        messageDiv.style.display = 'none'; 
    } catch (error) {
        // Display error message in case of failure
        messageDiv.style.display = 'block';
        messageDiv.innerText = 'Error loading posts: ' + error.message;
    }
}

// Function to display fetched posts
function displayPosts(posts) {
    const postListDiv = document.getElementById('postList');
    
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        
        const postTitle = document.createElement('h3');
        postTitle.innerText = post.title;

        const postContent = document.createElement('p');
        postContent.innerText = post.body;

        postItem.appendChild(postTitle);
        postItem.appendChild(postContent);
        
        postListDiv.appendChild(postItem);
    });
}

// Adding event listener to the button
document.getElementById('fetchButton').addEventListener('click', fetchPosts);