const targetForm = document.getElementById("loginForm");
const loginButton = document.getElementById("LoginButton");
const newLoginButton = document.getElementById("newLoginButton");

//【TODO】formからデータを取得する
//【TODO】DBにデータがあればログインを許可する
//【TODO】許可されたらindex.htmlに遷移させる

const tryNewLogin = async (e) => {
  e.preventDefault();
  //formの取得
  const targetButton = e.target;
  const form = new FormData(targetButton.parentNode);

  //HTTP通信用、JSON作成
  const loginData = {};
  form.forEach((value, key) => {
    loginData[key] = value;
  });

  try {
    axios
      .post("http://localhost:5002/api/v1/login/new", loginData)
      .then((window.location.href = "http://localhost:5501/login.html"));
  } catch (error) {
    console.log(error);
  }
};

const tryLogin = async (e) => {
  e.preventDefault();
  //formの取得
  const targetButton = e.target;
  const form = new FormData(targetButton.parentNode);

  //HTTP通信用、JSON作成
  const loginData = {};
  form.forEach((value, key) => {
    loginData[key] = value;
  });

  try {
    axios
      .post("http://localhost:5002/api/v1/login/exist", loginData)
      .then((window.location.href = "http://localhost:5501/index.html"));
  } catch (error) {
    console.log(error);
  }
};

newLoginButton.addEventListener("click", tryNewLogin);
LoginButton.addEventListener("click", tryLogin);
