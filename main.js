document.addEventListener('DOMContentLoaded', function () {
    const postsList = document.getElementById('posts-list');
    const createPostForm = document.getElementById('create-post-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('create-content');
    const nameInput = document.getElementById('name');
    const imageInput = document.getElementById('images');

    let posts = []; // Lista för att hålla alla blogginlägg

    // Funktion för att visa alla inlägg
    function renderPosts() {
        postsList.innerHTML = '';

        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h4>${post.title}</h4>
                <p><em>Av ${post.name} | ${post.date}</em></p>
                <p>${post.content}</p>
                <button class="delete-post" data-index="${index}">Ta bort</button> <img src="${post.image}" alt="Bild för inlägg" class="post-image">
                <div class="comments-section">
                    <div class="comments-list">
                        <h4>Kommentarer:</h4>
                        <textarea class="comment-input" placeholder="Lägg till en kommentar..."></textarea>
                        <button class="add-comment" data-index="${index}">Kommentera</button>
                        <ul class="comments-display"></ul>   
                </div>
            </div>
            `;



            // Lägg till eventlyssnare för att ta bort inlägg
            const deleteButton = postElement.querySelector('.delete-post');
            deleteButton.addEventListener('click', () => {
                posts.splice(index, 1); // Ta bort inlägget från arrayen
                renderPosts(); // Rendera om alla inlägg
            });

            // Lägg till funktionalitet för att lägga till kommentarer
            const addCommentButton = postElement.querySelector('.add-comment');
            addCommentButton.addEventListener('click', () => {
                const commentInput = postElement.querySelector('.comment-input');
                const commentText = commentInput.value;
                if (commentText) {
                    post.comments.push(commentText); // Lägg till kommentaren
                    commentInput.value = ''; // Töm textfältet
                    renderPosts(); // Rendera om inlägget och visa nya kommentarer
                }
            });

            // Visa kommentarer
            const commentsList = postElement.querySelector('.comments-list');
            post.comments.forEach(comment => {
                const commentElement = document.createElement('li');
                commentElement.textContent = comment;
                commentsList.appendChild(commentElement);
            });
            //Lägg till inlägget till post-listan
            postsList.appendChild(postElement);
        });
    }

    // Event för att skapa ett nytt inlägg
    createPostForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Förhindra standardformulärbeteende

        const title = titleInput.value;
        const content = contentInput.value;
        const name = nameInput.value || "Anonym";
        const date = new Date().toLocaleDateString();
        const imageFile = imageInput.files[0];
        const imageUrl = imageFile ? URL.createObjectURL(imageFile) : 'images/default.jpg';

        const newPost = {
            title,
            content,
            date,
            name,
            comments: [], // En array för kommentarer
            image: imageUrl
        };

        posts.push(newPost); // Lägg till det nya inlägget i arrayen
        renderPosts(); // Rendera om inläggen

        // Töm formuläret
        titleInput.value = '';
        contentInput.value = '';
        nameInput.value = '';
        imageInput.value = '';
    });

    // Rendera alla inlägg initialt
    renderPosts();
});




