
        // Function to fetch data using a Promise with a timeout mechanism
        function fetchPosts() {
            const fetchPromise = fetch('https://dummyjson.com/posts')
                .then(response => response.json()) // Parse the JSON response
                .then(data => data) // Resolve the promise with the fetched data
                .catch(error => {
                    throw new Error('Error fetching posts: ' + error); // Reject on network errors
                });

            // Timeout Promise that rejects after 5 seconds
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error("Operation timed out.")), 5000)
            );

            // Return the first promise that resolves/rejects: fetch or timeout
            return Promise.race([fetchPromise, timeoutPromise]);
        }

        // Function to display data once the Promise is resolved
        function displayPosts(posts) {
            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML = ''; // Clear any previous content

            // Display the post titles directly in the message div
            let postTitles = 'Fetched Post Titles:\n';
            posts.forEach(post => {
                postTitles += `${post.title}\n`; // Add each title in a new line
            });

            messageDiv.innerText = postTitles; // Set the final text in the message div
        }

        // Function to handle the Promise and update the UI
        function handleFetchPosts() {
            const messageDiv = document.getElementById('message');
            messageDiv.innerText = 'Loading...'; // Show loading message
            messageDiv.style.display = 'block'; // Show the message box

            // Call fetchPosts and handle the Promise result
            fetchPosts()
                .then(data => {
                    messageDiv.style.display = 'block'; // Show the message div
                    displayPosts(data.posts); // Display the fetched posts in the same div
                })
                .catch(error => {
                    messageDiv.innerText = error.message; // Display error message
                    console.error('Error:', error); // Log the error to console
                });
        }

        // Adding event listener to the button
        document.getElementById('startButton').addEventListener('click', handleFetchPosts);