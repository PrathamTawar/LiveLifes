const form = document.querySelector('.form-card');
const fileInput = document.querySelector('#file-upload');
const accountBtn = document.querySelector('.account');
const signBtn = document.querySelector('.sign');
const url = 'http://127.0.0.1:8000';


window.onload = () => {
    if(!localStorage.getItem('token')) {
        accountBtn.classList.add('none')
    }
    else{
        signBtn.classList.add('none')
    }
};

fileInput.addEventListener('change', () => {
    const fileName = fileInput.files[0].name;
    document.getElementById('fileNameJS').textContent = fileName;
    document.querySelector('.file-upload-label').style.backgroundColor = 'var(--gray-100)';
});

function createPostJSON(e) 
{
    let formData = new FormData();

    let caption = e.target[0].value;
    let text = e.target[1].value;
    let file = e.target[2].files[0];
    let fileType = 0;

    if(file){fileType = file.type;}
    console.log(caption, text, file, formData);

    if (!caption && !text && !file) {
        alert('Please fill the fields');
        return 0;
    }
    
    if ((!caption && file  && !text) || !caption && text && file) {
        alert('Please add Caption');
        return 0;
    }
    
    if (caption && !file && !text) {
        alert('Please add Image or Video or Text');
        return 0;
    }
    
    if (text && !file) {
        formData.append('caption', caption);
        formData.append('content_text', text); 
        return formData;
    }
    
    if (caption && file) {
        if (fileType.startsWith('image/')) {
            formData.append('caption', caption);
            formData.append('content_text', text);
            formData.append('content_image', file);
            return formData;
        } else if (fileType.startsWith('video/')) {
            formData.append('caption', caption);
            formData.append('content_text', text);
            formData.append('content_video', file);
            return formData;
        }

        alert('Please select an image or video file');
    }

       
}


async function addPost(post ={}) {
    if(!post)
    {
        return;
    }

    const token = localStorage.getItem('token');
    let res = await axios.post(`${url}/api/post/`, post, {headers: {Authorization: `token ${token}`}});
    console.log(res);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addPost(createPostJSON(e));
});



