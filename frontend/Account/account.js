const signInForm = document.querySelector("#signIn");
const signUpForm = document.querySelector("#signUp");
const errorBox = document.querySelector(".errorBox");
const url = "http://127.0.0.1:8000/api";

function toggleForm(formId) {
  const buttons = document.querySelectorAll(".toggle-btn");
  const formWrapper = document.querySelector(".form-wrapper");
  const tabIndicator = document.querySelector(".tab-indicator");

  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  if (formId === "signUp") {
    formWrapper.style.transform = "translateX(-50%)";
    tabIndicator.style.transform = "translateX(100%)";
  } else {
    formWrapper.style.transform = "translateX(0)";
    tabIndicator.style.transform = "translateX(0)";
  }
}

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form submit prevented.");

  let fullName = e.target[1].value + " " + e.target[2].value;
  let profilePic = e.target[0].files[0];
  let username = e.target[3].value;
  let password = e.target[4].value;
  let email = "";

  let formdata = new FormData();

  formdata.append("full_name", fullName);
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("email", email);
  formdata.append("profile_pic", profilePic);

  let res = await axios.post(`${url}/user/signup`, formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(res);

  localStorage.setItem("token", res.data.token);
});

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form submit prevented.");

  let username = e.target[0].value;
  let password = e.target[1].value;

  let res = await axios.post(
    `${url}/user/signin`,
    {
      username: username,
      password: password,
    },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  console.log(res.data);
  console.log(errorBox);

  if (res.data.success) {
    localStorage.setItem("token", res.data.token);
    window.location.href = "http://127.0.0.1:5500/frontend/Feed/feed.html";
  } else {
    errorBox.classList.add("ifError");
    errorBox.innerHTML = `<h2>${res.data.message}</h2>`;
  }
});
