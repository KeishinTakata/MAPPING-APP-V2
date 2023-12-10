const table = document.getElementById("table");
const submitForm = document.getElementById("submitForm");
const submitFormButton = document.getElementById("submitFormButton");
const URL = "http://localhost:5002/api/v1/places";
const EditPage = "./edit.html";

//Formからデータを取得し、新しいデータを作成
const createNewItem = async (e) => {
  e.preventDefault();
  //フォームの取得
  const button = e.target;
  const form = new FormData(button.parentNode);

  //フォームデータの取得,格納
  const request = {};
  //FormDataっていうクラスをしようしているんだから、メソッドがあって当たり前。
  // FormDataの内容を確認する
  form.forEach((value, key) => {
    request[key] = value;
  });

  console.log(request);

  try {
    await axios.post(URL, request).then(await showAllItems);
  } catch (error) {
    console.log(error);
  }
};

const deleteItem = async (e) => {
  e.preventDefault();
  //該当のITEMのID取得
  const targetId = e.target.id;
  //axiosでDelete送信
  try {
    await axios
      .delete(`http://localhost:5002/api/v1/places/${targetId}`)
      .then(showAllItems());
  } catch (error) {
    console.log(error);
  }
};

const editItem = async (e) => {};

// awaitは返されたプロミスが履行されるか拒否されるまで、実行を中断する
const showAllItems = async () => {
  //テーブルの初期化
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  //THの作成
  const trOfTh = document.createElement("tr");
  const th_date = document.createElement("th");
  const th_place = document.createElement("th");
  const th_url = document.createElement("th");
  const th_delete = document.createElement("th");
  const th_edit = document.createElement("th");

  th_date.textContent = "日付";
  th_place.textContent = "場所";
  th_url.textContent = "URL";
  th_delete.textContent = "削除";
  th_edit.textContent = "修正";
  trOfTh.appendChild(th_date);
  trOfTh.appendChild(th_place);
  trOfTh.appendChild(th_url);
  trOfTh.appendChild(th_delete);
  trOfTh.appendChild(th_edit);
  table.appendChild(trOfTh);
  console.log();

  try {
    const AllItems = await axios.get(URL).then((res) => {
      return res.data;
    });
    if (AllItems.length < 1) {
      alert("データがありません");
      return;
    }
    await AllItems.map(async (item) => {
      let new_tr = document.createElement("tr");
      let new_td1 = document.createElement("td");
      let new_td2 = document.createElement("td");
      let new_td3 = document.createElement("td");
      // let new_td4 = document.createElement("td");
      let new_td5 = document.createElement("td");
      let new_td6 = document.createElement("td");
      let new_a = document.createElement("a");
      //削除ボタンの作成
      let deleteButton = document.createElement("button");
      deleteButton.setAttribute("id", item._id);
      deleteButton.textContent = "削除";
      //編集ボタンの作成
      let EditButton = document.createElement("a");
      EditButton.textContent = "編集";
      EditButton.setAttribute("href", `./edit.html?id=${item._id}`);
      //deleteButton に削除メソッドを付与する
      deleteButton.addEventListener("click", deleteItem);

      //各要素に必要な値を入れる
      new_a.setAttribute("href", item.url);
      new_a.textContent = item.url;
      new_td1.textContent = item.date;
      new_td2.textContent = item.name;
      new_td3.appendChild(new_a);
      // new_td4.textContent = item._id;
      new_td5.appendChild(deleteButton);
      new_td6.appendChild(EditButton);
      //<tr>にデータを入れる
      // new_tr.appendChild(new_td4);
      new_tr.appendChild(new_td1);
      new_tr.appendChild(new_td2);
      new_tr.appendChild(new_td3);
      new_tr.appendChild(new_td5);
      new_tr.appendChild(new_td6);
      //<table>に<tr>を入れる
      table.appendChild(new_tr);
    });
  } catch (error) {
    console.log(error);
  }
};

showAllItems();

submitFormButton.addEventListener("click", createNewItem);
