const AmiMessage = document.getElementById("ami");
const Img_Udon = document.getElementById("Img_Udon");
AmiMessage.textContent = "Hello World!";

const Alert = () => {
  const PATH = Img_Udon.getAttribute("src");
  if (PATH === "/images/IMG_2742.jpg") {
    Img_Udon.setAttribute("src", "/images/IMG_2784.JPG");
  } else {
    Img_Udon.setAttribute("src", "/images/IMG_2742.jpg");
  }
};

const submitFormButton = document.getElementById("submitFormButton");
submitFormButton.addEventListener("click", Alert);
