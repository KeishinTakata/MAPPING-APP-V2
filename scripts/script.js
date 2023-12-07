const AmiMessage = document.getElementById("ami");
const Img_Udon = document.getElementById("Img_Udon");
const table = document.getElementById("table");
const submitForm = document.getElementById("submitForm");
const submitFormButton = document.getElementById("submitFormButton");
const URL = "http://localhost:5002/api/v1/places";

const Alert = () => {
  const PATH = Img_Udon.getAttribute("src");
  if (PATH === "/images/IMG_2742.jpg") {
    Img_Udon.setAttribute("src", "/images/IMG_2784.JPG");
  } else {
    Img_Udon.setAttribute("src", "/images/IMG_2742.jpg");
  }
};

{
  /* <tr>
<td>2023/12/05</td>
<td>田町駅</td>
<td><a href="https://docs.github.com/ja">URL</a></td>
</tr> */
}

// awaitは返されたプロミスが履行されるか拒否されるまで、実行を中断する
const showAllItems = async () => {
  try {
    const AllItems = await axios.get(URL).then((res) => {
      return res.data;
    });
    await AllItems.map(async (item) => {
      let new_tr = document.createElement("tr");
      let new_td1 = document.createElement("td");
      let new_td2 = document.createElement("td");
      let new_td3 = document.createElement("td");
      let new_a = document.createElement("a");
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      //TODO　deleteButton に削除メソッドを付与する
      // deleteButton.addEventListener("click");
      new_a.setAttribute("href", item.url);
      new_a.textContent = item.url;
      new_td1.textContent = item.date;
      new_td2.textContent = item.name;
      new_td3.appendChild(new_a);
      new_tr.appendChild(new_td1);
      new_tr.appendChild(new_td2);
      new_tr.appendChild(new_td3);
      new_tr.appendChild(deleteButton);
      table.appendChild(new_tr);
    });
  } catch (error) {
    console.log(error);
  }
};

showAllItems();

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

submitFormButton.addEventListener("click", createNewItem);
