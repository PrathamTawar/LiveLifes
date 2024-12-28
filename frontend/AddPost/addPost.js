const form = document.querySelector('.form-card');
const fileInput = document.querySelector('#file-upload');
const url = 'http://localhost:8000/api';

fileInput.addEventListener('change', () => {
    const fileName = fileInput.files[0].name;
    document.getElementById('fileNameJS').textContent = fileName;
    document.querySelector('.file-upload-label').style.backgroundColor = 'var(--gray-100)';
});

function createPostJSON() 
{
    let formData = new FormData(form);

    let caption = formData.get('caption')
    let text = formData.get('content_text')
    let file = formData.get('file');
    let fileType = file.type;

    if (!caption && !text && file.size === 0) {
        alert('Please fill the fields');
        return 0;
    }
    
    if ((!caption && file.size > 0  && !text) || !caption && text && file.size > 0) {
        alert('Please add Caption');
        return 0;
    }
    
    if (caption && file.size === 0 && !text) {
        alert('Please add Image or Video or Text');
        return 0;
    }
    
    if (text && file.size === 0) {
        return {
            caption: caption,
            content_text: text
        };
    }
    
    if (caption && file.size > 0) {
        if (fileType.startsWith('image/')) {
            return {
                caption: caption,
                content_text: text,
                content_image: file
            };
        } else if (fileType.startsWith('video/')) {
            return {
                caption: caption,
                content_text: text,
                content_video: file
            };
        }

        alert('Please select an image or video file');
    }

       
}


async function addPost() {
    let post = createPostJSON();
    if(!post)
    {
        return;
    }

    let res = await axios.post(`${url}/createPost`, post);
    console.log(res);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addPost();
});



