const url = "http://127.0.0.1:8000/api";
const signOut = document.querySelector("#signOut");

signOut.addEventListener("click", async () => {
  localStorage.removeItem("token");
  window.location.href = "http://127.0.0.1:5500/frontend/SignIn/signIn.html";
});