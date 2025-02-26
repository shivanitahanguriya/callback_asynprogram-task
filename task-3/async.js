const fetchButton = document.getElementById('button');
const loadingMessage = document.getElementById('message');

// Function to fetch data with error handling
async function fetchData() {
    loadingMessage.textContent = 'Loading...'; // Show loading message initially
    loadingMessage.style.display = "block";  // Ensure loading message is visible

    // Set a timeout for the fetch request
    const timeout = 5000; // 5 seconds timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
        loadingMessage.textContent = 'Request timed out. Please try again later.'; // Show timeout message
    }, timeout);

    try {
        console.log('Making the fetch request'); // Log before fetch request
        const response = await fetch('https://dummyjson.com/posts', { signal: controller.signal });

        // Log the response status and body
        console.log('Response Status:', response.status);
        const data = await response.json();
        console.log('Response Body:', data);

        // Clear the timeout after a successful request
        clearTimeout(timeoutId);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if data.posts exists and is an array
        if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
            console.log('Posts received and being processed'); // Log when posts are available and processing starts
            loadingMessage.innerHTML = `<h3>Fetched Posts:</h3>`;
            data.posts.slice(0, 5).forEach(post => {
                loadingMessage.innerHTML += `
                    <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ccc;">
                        <h4>${post.title}</h4>
                        <p>${post.body}</p>
                    </div>
                `;
            });
            loadingMessage.style.display = "block";  // Show content once it's populated
        } else {
            console.log('No posts found'); // Log if no posts are found
            loadingMessage.innerHTML = `<p>No posts found.</p>`;
            loadingMessage.style.display = "block";  // Ensure content div is displayed even if there are no posts
        }
    } catch (error) {
        // Handle network errors or timeout errors
        if (error.name === 'AbortError') {
            console.log('Request aborted due to timeout'); // Log when request is aborted
            loadingMessage.innerHTML = `<p class="error">Request timed out. Please try again later.</p>`;
        } else {
            console.error('Error fetching data:', error); // Log error details
            loadingMessage.innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
        }
        loadingMessage.style.display = "block";  // Ensure content div is displayed when an error occurs
    } finally {
        // loadingMessage.textContent = '';  // Hide the loading message after fetch completion
        console.log('Fetch operation completed'); // Log when the fetch operation is finished
    }
}

// Event listener for the button
fetchButton.addEventListener('click', () => {
    console.log('Fetch button clicked'); // Log when the button is clicked
    fetchData();
});
