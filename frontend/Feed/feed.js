const feed = document.querySelector('.feed');
const accountBtn = document.querySelector('.account');
const signBtn = document.querySelector('.sign');
const addPost = document.querySelector('.addPost');
const url = 'http://127.0.0.1:8000';
const nav = document.querySelector('.nav-menu');
let allPosts = [];

window.onload = () => {
    let token  = localStorage.getItem('token');

    // !TO RUN LOCALLY
    // nav.innerHTML += `
    //     <a href="${token? '/frontend/Account/account.html' : '/frontend/SignIn/signIn.html'}" class="nav-item account">
    //             <i data-lucide="user"></i>
    //             ${token? 'Account' : 'Signin/Signup'}
    //     </a>
    // `

    // !TO RUN ON PAGES

    nav.innerHTML += `
        <a href="${token? '/LiveLifes/frontend/Account/account.html' : '/LiveLifes/frontend/SignIn/signIn.html'}" class="nav-item account">
                <i data-lucide="user"></i>
                ${token? 'Account' : 'Signin/Signup'}
        </a>
    `

    lucide.createIcons();
};

async function getPosts() 
{

    allPosts = await axios.get(`${url}/api/post/`);
    allPosts = allPosts.data;

    console.log(allPosts);
    displayPosts(allPosts.reverse());
}

function timeCalc(date)
{

    const inputDate = new Date(date);
    const now = new Date();
    const diff = now.getTime() - inputDate.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago•${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago•${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago•${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    return 'Just now';
    
    
}

function displayPosts(data)
{
    feed.innerHTML = '';
    data.forEach(post => {
        let date = timeCalc(post.created_at);
        feed.innerHTML += `
        <div class="post">
            <div class="post-header">
                <img src="${post.owner.profile.profile_pic? url + post.owner.profile.profile_pic : '/frontend/assets/avatar.jpg'}" alt="Profile" class="profile-pic">
                <div class="user-info">
                    <div class="username">${post.owner.username}</div>
                    <div class="timestamp">${date}</div>
                </div>
            </div>
            <button class="menu-btn">
                <i data-lucide="more-vertical"></i>
            </button>
            <div class="menu-content">
                <div data-id=${post.id} class="menu-item edit">
                    <i data-lucide="edit"></i>
                    Edit
                </div>
                <div data-id=${post.id} class="menu-item delete">
                    <i data-lucide="trash-2"></i>
                    Delete
                </div>
            </div>
            <div class="post-title">
                ${post.caption}
            </div>

            <div class="post-content">
                ${post.content_text}
            </div>

            <img src="${url}${post.content_image}" alt="Sunset" class="post-image ${post.content_image? '' : 'none'}">

            <div class="video-container ${post.content_video? '' : 'none'}">
                <video controls autoplay loop muted>
                    <source src="${url}${post.content_video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>

            </div>


            <div class="post-actions">
                <button class="action-btn">
                    <i data-id="${post.id}" data-lucide="heart"></i>
                    Like
                </button>
                <button class="action-btn">
                    <i data-id="${post.id}" data-lucide="message-circle"></i>
                    Comment
                </button>
                <button class="action-btn">
                    <i data-id="${post.id}" data-lucide="share"></i>
                    Share
                </button>
            </div>
        </div>
        `;
    });
    
    lucide.createIcons();


    handleDelete(document.querySelectorAll('.delete'));

    document.querySelectorAll('.menu-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const menu = e.target.closest('.post').querySelector('.menu-content');
            menu.classList.toggle('active');
            
            // Close other menus
            document.querySelectorAll('.menu-content.active').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('active');
                }
            });
            
            e.stopPropagation();
        });
    });
    
    // Close menus when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.menu-content.active').forEach(menu => {
            menu.classList.remove('active');
        });
    });

}


function handleDelete(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const postId = e.target.getAttribute('data-id');
            const res = await axios.delete(`${url}/post/${postId}`);
            // getPosts();
        });
    })
}


getPosts()
