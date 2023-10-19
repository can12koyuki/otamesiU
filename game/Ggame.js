
const colorgame = document.getElementById('colorgame');         // ゲームボタン

const Rulemodal = document.getElementById('ruleModal');         // ルール説明モーダル
const Rulevideo = document.getElementById('rule');
const gamestart = document.getElementById('gamestart');         // ゲームボタン

const ansermodal = document.getElementById('anserModal');       // 答えモーダル
const nextbtn = document.getElementById('nextbtn');             // 「次の問題」ボタン

const totalmodal = document.getElementById('totalModal');       // 総合成績モーダル
const totalbtn = document.getElementById('totalbtn');           // 「もどる」ボタン

const Quest = document.getElementById('Q');                     // 問題表示部分
const quest = document.getElementById("quest");                 // 問題の内容をランダム表示

// const easybtn = document.getElementById('gameeasy');            // 難易度「やさしい」ボタン
// const normalbtn = document.getElementById('gamenormal');        // 難易度「ふつう」ボタン
// const defbtn = document.getElementById('gamedef');              // 難易度「むずかしい」ボタン

const selbtn1 = document.getElementById('selbtn1');             // 選択肢「あか」ボタン
const selbtn2 = document.getElementById('selbtn2');             // 選択肢「あお」ボタン
const selbtn3 = document.getElementById('selbtn3');             // 選択肢「きいろ」ボタン
const selbtn4 = document.getElementById('selbtn4');             // 選択肢「みどり」ボタン


const OKbtn = new Audio("BGM/OKbtn.mp3");
const NObtn = new Audio("BGM/NObtn.mp3");

const gameBGM = new Audio("BGM/gameBGM.mp3");
const countDown = new Audio("BGM/countDown.mp3");
const Q = new Audio("BGM/Q.mp3");
const suc = new Audio("BGM/suc.mp3");
const loss = new Audio("BGM/loss.mp3");
const timeUP = new Audio("BGM/timeUP.mp3");
const totalscore = new Audio("BGM/totalscore.mp3");

window.globalFunction.gameBGM = gameBGM;


var totalSeconds;
var Timer;

// 💛カウントダウンタイマー
function GameStartTimerset(){
  totalSeconds = 15;
  document.getElementById("Vtimer").innerHTML = totalSeconds;

  Timer = setInterval(function(){
    --totalSeconds;
    document.getElementById("Vtimer").innerHTML = totalSeconds;
    countDown.play();


    if(totalSeconds <= 5){
      document.getElementById("Vtimer").style.color = "red";

      // カウントが0になったら時間切れ
      if(totalSeconds == 0){
        clearInterval(Timer);
        // 答えモーダル
        ansermodal.style.display = 'block';
        timeUP.play();

        document.getElementById("anser").innerHTML = "時間切れ..."
        document.getElementById("anser").style.color = "lightgreen";
      
        // 答えの文字の色
        document.getElementById("Sanser").style.color = rand;
        // 答えの文字
        if(rand == "red"){
          document.getElementById("Sanser").innerHTML = "あか";
        }else if(rand == "blue"){
          document.getElementById("Sanser").innerHTML = "あお";
        }else if(rand == "yellow"){
          document.getElementById("Sanser").innerHTML = "きいろ";
        }else if(rand == "green"){
          document.getElementById("Sanser").innerHTML = "みどり";
        }
      }
    }
  }, 1000);
}


var count = 1;
var total = 0;
var rand;

// 💛ランダムに問題を出題
function randomcolor(){
  // 文字
  const color = new Array("あか", "あお", "きいろ", "みどり");
  const colorNo = Math.floor(Math.random() * color.length);
  console.log(color[colorNo]);
  // 文字の表示
  quest.innerHTML = color[colorNo];

  // 色
  const fontcolor = new Array("red", "blue", "yellow", "green");
  const colorFo = Math.floor(Math.random() * fontcolor.length);
  console.log(fontcolor[colorFo]);
  const ans = fontcolor[colorFo];
  // 文字の色を指定
  quest.style.color = ans;

  // 色を返す
  return ans
}


// 🌟色当てゲームボタン
colorgame.addEventListener('click', () => {
  // ルール説明モーダル
  Rulemodal.style.display = 'block';
  colorgame.style.display = 'none';
  OKbtn.play();
  console.log("ゲーム")
})

Rulevideo.addEventListener('click', () => {
  if(Rulevideo.paused){
    Rulevideo.play();
    OKbtn.play();
    console.log(Rulevideo.paused)
  }else{
    Rulevideo.pause();
    NObtn.play();
    console.log(Rulevideo.paused)
  }
})


// 🌟ゲームスタートボタン
gamestart.addEventListener('click', () => {
  // １秒ごとにカウントダウンタイマーを起動し、0になったら問題を表示する
  // totalSeconds = 3;
  document.getElementById("Vtimer").innerHTML = totalSeconds;
  window.globalFunction.gameRoomBGM.pause();
  // countDown.play();

  gameBGM.play();
  gameBGM.loop = true;
  gameBGM.volume = 0.4;
  
  clearInterval(Timer);
  Q.play();

  // ルール説明モーダル
  Rulemodal.style.display = 'none';
  // 問題表示部分
  Quest.style.display = 'block';
  // 選択肢ボタン
  selbtn1.style.display = 'block';
  selbtn2.style.display = 'block';
  selbtn3.style.display = 'block';
  selbtn4.style.display = 'block';

  // ランダムで指定された色
  rand = randomcolor();
  GameStartTimerset();
  // 問題数と正解数
  console.log(count,total)

  // var Timer = setInterval(function(){
  //   --totalSeconds;
  //   document.getElementById("Vtimer").innerHTML = totalSeconds;
  //   countDown.play();

  //   if(totalSeconds == 0){
  //     gameBGM.play();
  //     gameBGM.loop = true;
  //     gameBGM.volume = 0.6;
      
  //     clearInterval(Timer);
  //     Q.play();

  //     // ルール説明モーダル
  //     Rulemodal.style.display = 'none';
  //     // 問題表示部分
  //     Quest.style.display = 'block';
  //     // 選択肢ボタン
  //     selbtn1.style.display = 'block';
  //     selbtn2.style.display = 'block';
  //     selbtn3.style.display = 'block';
  //     selbtn4.style.display = 'block';

  //     // ランダムで指定された色
  //     rand = randomcolor();
  //     GameStartTimerset();
  //     // 問題数と正解数
  //     console.log(count,total)
  //   }
  // }, 1000);
});


// 「やさしい」
// easybtn.addEventListener('click', () => {
// })


// 🌟ゲーム選択肢ボタン（あか）
selbtn1.addEventListener('click', () => {
  if(rand == "red"){
    suc.play();
    document.getElementById("anser").innerHTML = "正解！"
    document.getElementById("anser").style.color = "orange";
    // 正解の色の名前を表示
    document.getElementById("Sanser").innerHTML = "あか";
    // 正解したとき+1
    total += 1
  }else{
    loss.play();
    document.getElementById("anser").innerHTML = "不正解..."
    document.getElementById("anser").style.color = "skyblue";

    // ほかの色が正解だったとき
    if(rand == "blue"){
      document.getElementById("Sanser").innerHTML = "あお";
    }else if(rand == "yellow"){
      document.getElementById("Sanser").innerHTML = "きいろ";
    }else if(rand == "green"){
      document.getElementById("Sanser").innerHTML = "みどり";
    }
  }
  // 答えモーダル
  ansermodal.style.display = 'block';
  // 正解の色の名前に色をつける
  document.getElementById("Sanser").style.color = rand;
  // カウントダウンタイマー
  clearInterval(Timer);
})

// 🌟ゲーム選択肢ボタン（あお）
selbtn2.addEventListener('click', () => {
  if(rand == "blue"){
    suc.play();
    document.getElementById("anser").innerHTML = "正解！"
    document.getElementById("anser").style.color = "orange";
    document.getElementById("Sanser").innerHTML = "あお";
    total += 1
  }else{
    loss.play();
    document.getElementById("anser").innerHTML = "不正解..."
    document.getElementById("anser").style.color = "skyblue";

    if(rand == "red"){
      document.getElementById("Sanser").innerHTML = "あか";
    }else if(rand == "yellow"){
      document.getElementById("Sanser").innerHTML = "きいろ";
    }else if(rand == "green"){
      document.getElementById("Sanser").innerHTML = "みどり";
    }
  }
  ansermodal.style.display = 'block';
  document.getElementById("Sanser").style.color = rand;
  clearInterval(Timer);
})

// 🌟ゲーム選択肢ボタン（きいろ）
selbtn3.addEventListener('click', () => {
  if(rand == "yellow"){
    suc.play();
    document.getElementById("anser").innerHTML = "正解！"
    document.getElementById("anser").style.color = "orange";
    document.getElementById("Sanser").innerHTML = "きいろ";
    total += 1
  }else{
    loss.play();
    document.getElementById("anser").innerHTML = "不正解..."
    document.getElementById("anser").style.color = "skyblue";

    if(rand == "red"){
      document.getElementById("Sanser").innerHTML = "あか";
    }else if(rand == "blue"){
      document.getElementById("Sanser").innerHTML = "あお";
    }else if(rand == "green"){
      document.getElementById("Sanser").innerHTML = "みどり";
    }
  }
  ansermodal.style.display = 'block';
  document.getElementById("Sanser").style.color = rand;
  clearInterval(Timer);
})

// 🌟ゲーム選択肢ボタン（みどり）
selbtn4.addEventListener('click', () => {  
  if(rand == "green"){
    suc.play();
    document.getElementById("anser").innerHTML = "正解！"
    document.getElementById("anser").style.color = "orange";
    document.getElementById("Sanser").innerHTML = "みどり";
    total += 1
  }else{
    loss.play();
    document.getElementById("anser").innerHTML = "不正解..."
    document.getElementById("anser").style.color = "skyblue";

    if(rand == "red"){
      document.getElementById("Sanser").innerHTML = "あか";
    }else if(rand == "blue"){
      document.getElementById("Sanser").innerHTML = "あお";
    }else if(rand == "yellow"){
      document.getElementById("Sanser").innerHTML = "きいろ";
    }
  }
  ansermodal.style.display = 'block';
  document.getElementById("Sanser").style.color = rand;
  clearInterval(Timer);
});


// 🌟モーダル内「次の問題」ボタン
nextbtn.addEventListener('click', () => {
  console.log(count,total)
  if(count == 5){
    totalscore.play();
    ansermodal.style.display = 'none';
    // 総合成績モーダル
    totalmodal.style.display = 'block';

    // countとtotalを他ファイルでも使えるようにする
    window.globalFunction.count = count;
    window.globalFunction.total = total;

    // モーダル内に結果を表示
    document.getElementById("mytotal").innerHTML = count + "問中" + total + "問正解しました！";
    document.getElementById("Vtimer").innerHTML = "";
    
    // 初期化
    count = 1;
    total = 0;
  }else{
    // 「正解」「不正解」の文字を消す
    document.getElementById("anser").innerHTML = "";
    document.getElementById("Vtimer").style.color = "black";
    ansermodal.style.display = 'none';
    Q.play();

    // 次の問題
    rand = randomcolor();
    GameStartTimerset();
    // 問題数+1
    count += 1
  }
})

