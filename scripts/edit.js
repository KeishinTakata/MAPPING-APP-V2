//遷移後のURLを取得し、パラメーターを抽出する
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const URL = "http://localhost:5002/api/v1/places";
const body = document.getElementById("body");

//修正後のデータを送信する
const SubmitForm = async (e) => {
  // フォームからデータを取得する
  const reqBody = {};
  const button = e.target;
  const form = new FormData(button.parentNode);
  //FormDataっていうクラスをしようしているんだから、メソッドがあって当たり前。
  // FormDataの内容を確認する
  form.forEach((value, key) => {
    reqBody[key] = value;
  });

  try {
    const res = await axios
      .put(`http://localhost:5002/api/v1/places/${id}`, reqBody)
      .then(alert("更新が完了しました"));
  } catch (err) {
    console.log(err);
  }
};
// formの型の作成
//タグの作成
const form = document.createElement("form");
const title = document.createElement("h4");
const dateHeader = document.createElement("p");
const placeHeader = document.createElement("p");
const urlHeader = document.createElement("p");
const inputDate = document.createElement("input");
const inputPlace = document.createElement("input");
const inputUrl = document.createElement("input");
const submitButton = document.createElement("button");
const returnButton = document.createElement("a");
//属性の追加
form.setAttribute("id", "submitForm");
inputDate.setAttribute("type", "date");
inputDate.setAttribute("name", "date");
inputPlace.setAttribute("type", "text");
inputPlace.setAttribute("name", "name");
inputUrl.setAttribute("type", "text");
inputUrl.setAttribute("name", "url");
submitButton.setAttribute("type", "button");
submitButton.setAttribute("id", "submitFormButton");
submitButton.addEventListener("click", SubmitForm);
//値の追加
dateHeader.textContent = "日付";
placeHeader.textContent = "場所の名前";
urlHeader.textContent = "URL";
submitButton.textContent = "変更";
//formの作成
form.appendChild(title);
form.appendChild(dateHeader);
form.appendChild(inputDate);
form.appendChild(placeHeader);
form.appendChild(inputPlace);
form.appendChild(urlHeader);
form.appendChild(inputUrl);
form.appendChild(submitButton);
body.prepend(form);
// </form>
//idでデータを取得してきて、画面に表示する
const showItem = async () => {
  try {
    //サーバからデータを取得
    const item = await axios
      .get(`http://localhost:5002/api/v1/places/${id}`)
      .then((res) => {
        return res.data;
      });
    //データを変数に入れる
    inputDate.setAttribute("value", `${item.date}`);
    inputPlace.setAttribute("value", `${item.name}`);
    inputUrl.setAttribute("value", `${item.url}`);
    //返り値を設定
  } catch (err) {
    console.log(err);
    console.log(id);
  }
};

showItem();
