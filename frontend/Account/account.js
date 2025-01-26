const editProfileBtn = document.querySelector('.edit-profile-btn');
const editModal = document.getElementById('editModal');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const editUsername = document.getElementById('editUsername');
const editBio = document.getElementById('editBio');
const editProfilePicInput = document.getElementById('editProfilePicInput');
const profilePic = document.querySelector('.profile-pic');
const usernameDisplay = document.querySelector('.username');
const bioDisplay = document.querySelector('.profile-bio');
const signOut = document.querySelector("#signOut");
const postGird = document.querySelector(".post-grid");

const url = "http://127.0.0.1:8000";

signOut.addEventListener("click", async () => {
  localStorage.removeItem("token");
  // !TO RUN LOCALLY
  // window.location.href = "http://127.0.0.1:5500/frontend/SignIn/signIn.html";
  // !TO RUN ON PAGES
  window.location.href = "https://prathamtawar.github.io/LiveLifes/frontend/SignIn/signIn.html";
});

async function getProfile() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${url}/api/user/profile`, {headers: { Authorization: `Token ${token}` },});
  console.log(res.data);
  displayProfile(res.data);
  displayPosts(res.data);
}

getProfile();

function displayProfile(data){
  usernameDisplay.textContent = data.User.username;
  bioDisplay.textContent = data.User.profile.bio? 'data.User.profile.bio' : 'Bio...';
  // !TO RUN LOCALLY
  // profilePic.src = data.User.profile.profile_pic? url +'/'+ data.User.profile.profile_pic : "/frontend/assets/avatar.jpg";
  // !TO RUN ON PAGES
  profilePic.src = data.User.profile.profile_pic? url +'/'+ data.User.profile.profile_pic : "/LiveLifes/frontend/assets/avatar.jpg";
}

function displayPosts(data){

  posts = data.User.posts;
  console.log(posts);
  postGird.innerHTML = "";
  posts.forEach((post) => {
    if (post.content_image){
      postGird.innerHTML += `<div class="post-item"><img src="${url}${post.content_image}" alt="${post.caption}"></div>`;
    }
    else if(post.content_video){
      postGird.innerHTML += `<div class="post-item"><video src="${url}${post.content_video}" controls></video></div>`;
    }
    else{
      postGird.innerHTML += `
      <div class="post-item"><p>Caption: ${post.caption}</p> <p>Content: ${post.content_text}</p></div>
      `;
    }

  });



}







// Open Edit Modal
editProfileBtn.addEventListener('click', () => {
  editUsername.value = usernameDisplay.textContent;
  editBio.value = bioDisplay.textContent;
  editModal.style.display = 'flex';
});

// Close Edit Modal
cancelEditBtn.addEventListener('click', () => {
  editModal.style.display = 'none';
});

// Profile Picture Preview
editProfilePicInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();  
  reader.onload = (event) => {
      profilePic.src = event.target.result;
  };  
  reader.readAsDataURL(file);
});

// Save Profile Changes
saveProfileBtn.addEventListener('click', () => {
  // Update display
  usernameDisplay.textContent = editUsername.value;
  bioDisplay.textContent = editBio.value;
  // Close modal
  editModal.style.display = 'none';
});        

const moreOptions = document.getElementById('moreOptions');
const dropdownMenu = document.getElementById('dropdownMenu');

moreOptions.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

        // Close dropdown when clicking outside
document.addEventListener('click', () => {
  dropdownMenu.classList.remove('show');
});

        // Action Handlers
document.getElementById('settings').addEventListener('click', () => alert('Settings'));
document.getElementById('signOut').addEventListener('click', () => alert('Sign Out'));
document.getElementById('deleteAccount').addEventListener('click', () => alert('Delete Account'));