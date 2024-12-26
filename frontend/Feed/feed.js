const feed = document.querySelector('.feed');
const url = 'http://localhost:8000/api';
let allPosts = [];

async function getPosts() 
{

    allPosts = await axios.get(`${url}/getPost/0`);
    allPosts = allPosts.data;

    displayPosts(allPosts.reverse());
}

function timeCalc(date)
{
   
        // Parse the ISO date string into a Date object
    const inputDate = new Date(date);

    // Get the current time
    const now = new Date();

    // Calculate the time difference in milliseconds
    const diff = now.getTime() - inputDate.getTime();

    // Convert the time difference to different units
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // Return the appropriate "time ago" string
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
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
                <img src="https://placehold.co/600x600" alt="Profile" class="profile-pic">
                <div class="user-info">
                    <div class="username">Jane Smith</div>
                    <div class="timestamp">${date}</div>
                </div>
            </div>
            <button class="menu-btn">
                <i data-lucide="more-vertical"></i>
            </button>
            <div class="menu-content">
                <div class="menu-item">
                    <i data-lucide="edit"></i>
                    Edit
                </div>
                <div class="menu-item">
                    <i data-lucide="trash-2"></i>
                    Delete
                </div>
            </div>
            <div class="post-content">
                ${post.content_text? post.content_text : post.caption}
            </div>



            <img src="${url}${post.content_img}" alt="Sunset" class="post-image ${post.content_img? '' : 'none'}">

            <div class="video-container ${post.content_vid? '' : 'none'}">
                <video controls autoplay loop muted>
                    <source src="${url}${post.content_vid}" type="video/mp4">
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


getPosts()



// Handle menu toggles





