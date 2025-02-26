const fetchButton = document.getElementById('button');
const loadingMessage = document.getElementById('message');

async function fetchData() {
    loadingMessage.textContent = 'Loading...';
    loadingMessage.style.display = "block";

    const timeout = 5000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
        loadingMessage.textContent = 'Request timed out. Please try again later.'; // Show timeout message
    }, timeout);

    try {
        const response = await fetch('https://dummyjson.com/posts', { signal: controller.signal });

        const data = await response.json();

        clearTimeout(timeoutId);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if data.posts exists
        if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
            loadingMessage.innerHTML = `Fetched Posts:`;
            data.posts.slice(0, 5).forEach(post => {
                loadingMessage.innerHTML += `
                    <div>
                        <h4>${post.title}</h4>
                        <p>${post.body}</p>
                    </div>
                `;
            });
            loadingMessage.style.display = "block";
        } else {
            loadingMessage.innerHTML = `<p>No posts found.</p>`;
            loadingMessage.style.display = "block";
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            loadingMessage.innerHTML = `<p class="error">Request timed out. Please try again later.</p>`;
        } else {
            loadingMessage.innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
        }
        loadingMessage.style.display = "block";
    } finally {
    }
}

// Event listener for the button
fetchButton.addEventListener('click', () => {
    fetchData();
});
