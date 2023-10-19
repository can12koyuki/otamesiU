//同期処理
//必要な引数を定義
const IDtext = document.getElementById('ID-text');               //任意のID
const IDnameOK = document.getElementById('IDname-ok');           //決定ボタン

const roomName = document.getElementById('room-name');             //ルーム名
const joinTrigger = document.getElementById('join-trigger');       //入室ボタン


const OKbtn = new Audio("game/BGM/OKbtn.mp3");
const NObtn = new Audio("game/BGM/NObtn.mp3");

const IDnameBGM = new Audio("game/BGM/IDnameBGM.mp3");

OKbtn.volume = 0.4;
NObtn.volume = 0.4;

IDnameBGM.play();
IDnameBGM.loop = true;
IDnameBGM.volume = 0.8;


// localStorage(cookieみたいなもの)対応判定
if(window.localStorage) {
  console.log('ローカルストレージに対応しています');
}else{
  console.log('ローカルストレージに対応していません');
}

// 別のファイルから関数呼び出し
const myName = localStorage.getItem("OKID");
const romagi = window.globalFunction.roma(localStorage.getItem("OKID"))
document.getElementById("my-id").innerHTML = myName
console.log('変換前 ' + myName + ', 変換後 ' + romagi)


//ID決定ボタン
IDnameOK.addEventListener('click', () => {
  OKbtn.play();

  //localStorageのOKIDキーに値を保存
  localStorage.setItem('OKID', IDtext.value);

  // 別のファイルから関数呼び出し
  const myName = localStorage.getItem("OKID");
  const romagi = window.globalFunction.roma(localStorage.getItem("OKID"))
  document.getElementById("my-id").innerHTML = myName
  console.log('変換前 ' + myName + ', 変換後 ' + romagi)

  // 自分のIDを表示
  document.getElementById("my-id").innerHTML = myName
  IDtext.value = "";
})

// ルーム名決定ボタン
joinTrigger.addEventListener('click', () => {
  const myName = localStorage.getItem("OKID");
  const romagi = window.globalFunction.roma(localStorage.getItem("OKID"))

  // IDがないときのアラート
  // IDとルーム名なし
  if(!IDtext.value && !roomName.value){
    NObtn.play();
    alert("名前が設定されていません。名前を設定してください");
    roomName.value = "";
    console.log("うぇい")
    return
  }
  // IDなしルーム名あり
  else if(roomName.value && !IDtext.value && !romagi){
    NObtn.play();
    alert("名前が設定されていません。名前を設定してください");
    roomName.value = "";
    console.log("はーい")
    return
  }
  // IDありルーム名あり（入室）
  else if(romagi && roomName.value){
    OKbtn.play();
    localStorage.setItem('OKRoom', roomName.value);
    roomName.value = "";
    location = "video/video.html"
  }
})

// エンター入力
document.addEventListener('keypress', OK);

// エンター入力用関数
function OK(e) {
	if(e.code === 'Enter'){
    // ID設定
    if(IDtext.value){
      OKbtn.play();

      //localStorageのOKIDキーに値を保存
      localStorage.setItem('OKID', IDtext.value);
      // 別のファイルから関数呼び出し
      const myName = localStorage.getItem("OKID");
      const romagi = window.globalFunction.roma(localStorage.getItem("OKID"))
      console.log('変換前 ' + myName + ', 変換後 ' + romagi)

      // 自分のIDを表示
      document.getElementById("my-id").innerHTML = myName
      IDtext.value = "";
    }
    // IDありルーム名あり（入室）
    else if(romagi && roomName.value){
      OKbtn.play();
      localStorage.setItem('OKRoom', roomName.value);
      roomName.value = "";
      location = "video/video.html"
    } 
    // IDがないときのアラート
    // IDとルーム名なし
    else if(!IDtext.value && !roomName.value){
      NObtn.play();
      alert("名前が設定されていません。名前を設定してください");
      console.log(romagi)
      roomName.value = "";
      return
    }
    // IDなしルーム名あり
    else if(roomName.value && !IDtext.value && !romagi){
      NObtn.play();
      alert("名前が設定されていません。名前を設定してください");
      console.log(romagi)
      roomName.value = "";
      return
    }
	}
	return false; 
}
