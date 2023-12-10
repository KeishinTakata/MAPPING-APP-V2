//遷移後のURLを取得し、パラメーターを抽出する
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const URL = "http://localhost:5002/api/v1/places";

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
    //返り値を設定
  } catch (err) {
    console.log(err);
    console.log(id);
  }
};
