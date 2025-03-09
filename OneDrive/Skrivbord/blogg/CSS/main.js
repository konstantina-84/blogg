document.addEventListener('DOMContentLoaded', function () {
    const postsList = document.getElementById('posts-list');
    const createPostForm = document.getElementById('create-post-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('create-content');
    const nameInput = document.getElementById('name');
    const imageInput = document.getElementById('images');

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    function renderPosts() {
        postsList.innerHTML = '';

        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h4>${post.title}</h4>
                <p><em>Av ${post.name} | ${post.date}</em></p>
                <p>${post.content}</p>
                <img src="${post.image}" alt="Bild för inlägg" class="post-image">
                 <button class="delete-post" data-index="${index}">Ta bort</button> 
                <div class="comments-section">
                    <div class="comments-list">
                        <h4>Kommentarer:</h4>
                        <textarea class="comment-input" placeholder="Lägg till en kommentar..."></textarea> 
                        <button class="add-comment" data-index="${index}">Kommentera</button> 
                        <ul class="comments-display"></ul>   
                </div>
            </div>
            `;


            const deleteButton = postElement.querySelector('.delete-post');
            deleteButton.addEventListener('click', () => {
                posts.splice(index, 1);
                updateLocalStorage();
                renderPosts();
            });


            const addCommentButton = postElement.querySelector('.add-comment');
            addCommentButton.addEventListener('click', () => {
                const commentInput = postElement.querySelector('.comment-input');
                const commentText = commentInput.value;
                if (commentText) {
                    post.comments.push(commentText);
                    commentInput.value = '';
                    renderPosts();
                }
            });


            const commentsList = postElement.querySelector('.comments-display');
            post.comments.forEach(comment => {
                const commentElement = document.createElement('li');
                commentElement.textContent = comment;
                commentsList.appendChild(commentElement);
            });

            postsList.appendChild(postElement);
        });
    }


    createPostForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = titleInput.value;
        const content = contentInput.value;
        const name = nameInput.value || "Anonym";
        const date = new Date().toLocaleDateString();
        const imageFile = imageInput.files[0];

        let imageUrl = '';
        if (imageFile) {
            imageUrl = URL.createObjectURL(imageFile);
        }

        const newPost = {
            title,
            content,
            date,
            name,
            comments: [],
            image: imageUrl
        };

        posts.unshift(newPost);
        updateLocalStorage();
        renderPosts();


        setTimeout(() => {
            const latestPost = postsList.querySelector('.post');
            latestPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);


        titleInput.value = '';
        contentInput.value = '';
        nameInput.value = '';
        imageInput.value = '';
    });


    function updateLocalStorage() {
        localStorage.setItem('posts', JSON.stringify(posts));
    }


    renderPosts();
});


