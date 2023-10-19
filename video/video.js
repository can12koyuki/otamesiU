// 各種モジュールの取得
// SkyWayError, errors, tokenErrors, logLevelTypesは各情報(テキストなど)をそのまま出力するだけ
const { nowInSec, SkyWayAuthToken, SkyWayContext, SkyWayRoom, SkyWayStreamFactory, uuidV4, 
        SkyWayError, errors, tokenErrors, logLevelTypes } = skyway_room;

// skyway auth token　(skywayを利用するためのJWT形式のトークン。トークンごとに権限を設定できる。入室制限など)
const token = new SkyWayAuthToken({
  jti: uuidV4(),
  iat: nowInSec(),
  exp: nowInSec() + 60 * 60 * 24,

  //トークンに付与する権限を表すクレーム
  // channelで * 部分を任意の英数字にすると、指定した英数字にしか入室できない
  // 例）channlでname:'a'とすると、ルーム名にaと入力しないと入室できなくなる
  scope: {
    app: {
      id: '89176a39-262f-48e7-bc66-d912ffa96356',  //アプリケーションID
      turn: true,
      actions: ['read'],
      channels: [
        {
          // id: '*',    
          name: '*',
          actions: ['write'],

          //メンバー
          members: [
            {
              // id: '*',
              name: '*',
              actions: ['write'],

              publication: {
                actions: ['write'],
              },
              subscription: {
                actions: ['write'],
              },
            },
          ],
          sfuBots: [
            {
              actions: ['write'],
              forwardings: [
                {
                  actions: ['write'],
                },
              ],
            },
          ],
        },
      ],
    },
  },
}).encode('o0D26Nk8kUBRii3RNey1tkdVLYfCxcEZOPJHrq6u+vY=');  //シークレットキー

  

// 🌟：ボタンクリック動作、💎：SkyWay動作、💛：関数
(async () => {
  const localVideo = document.getElementById('local-stream');        // 自分のビデオ映像
  const leaveTrigger = document.getElementById('leave-trigger');     // 退室ボタン
  const remoteVideos = document.getElementById('remote-streams');    // 相手のビデオ映像

  const messages = document.getElementById('messages');              // チャットエリア
  const dataStreamInput = document.getElementById('data-stream');    // チャットボックス
  const writeButton = document.getElementById('write');              // 送信ボタン

  const chatlogbtn = document.getElementById('chatlog');             // チャットログボタン
  const chatlogmodal = document.getElementById('chatlogModal');      // チャットログモーダル
  const chatlogmessages = document.getElementById('logmessages');    // チャットログメッセージ
  const Relog = document.getElementById('chatlogRe');                // チャットログモーダルの戻るボタン

  const gamestart = document.getElementById('gamestart');            // ゲームボタン
  const mutebtn = document.getElementById('mutebtn');                // ミュートボタン  


  const OKbtn = new Audio("../game/BGM/OKbtn.mp3");
  const NObtn = new Audio("../game/BGM/NObtn.mp3");

  const msgSE = new Audio("../game/BGM/msg.mp3");

  const videoBGM = new Audio("../game/BGM/videoBGM.mp3");

  videoBGM.play();
  videoBGM.loop = true;
  videoBGM.volume = 0.4;

  OKbtn.volume = 0.3;
  NObtn.volume = 0.3;
  msgSE.volume = 0.4;


  // カメラ・マイクの取得
  const { audio, video } = await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();

  //情報管理オブジェクト(認証・認可、ログの設定等)
  const context = await SkyWayContext.Create(token, {
    log: { level: 'warn', format: 'object' },
  });


  // 💛ルーム退出後のブラウザ更新用タイマー(5秒後ブラウザ更新)
  function reloadTimer() {
    setTimeout( function() {
      document.location.reload();
      location = "../index.html"
    } , 3000 );
  }


  // 🌟ミュートボタン
  mutebtn.addEventListener('click', () => {
    //マイクのオンオフと、ボタンの文字を切り替え
    if(mutebtn.textContent == "🎙オン"){
      //マイクオフ
      aud.disable();
      mutebtn.textContent = "🎙オフ";
      NObtn.play();
    }else{
      //マイクオン
      aud.enable();
      mutebtn.textContent = "🎙オン";
      OKbtn.play();
    }
  });


  // localStorageのOKIDキーの値を取り出す
  const myName = localStorage.getItem("OKID");
  // ローマ字変換
  const romagi = window.globalFunction.roma(localStorage.getItem("OKID"))
  // 自分のIDを表示
  document.getElementById("my-id").innerHTML = myName;
  console.log('ID名：変換前 ' + myName + ', 変換後 ' + romagi)

  // 💛チャット一定時間表示
  function chatTimer() {
    setTimeout( function() {
      messages.style.display = 'none';
    } , 10000 );
  }

  // メッセージ
  const data = await SkyWayStreamFactory.createDataStream();   // stream の取得
  // 🌟チャット送信ボタン
  writeButton.onclick = () => {
    msgSE.play();
    // 自分のnameとメッセージ内容を送信
    data.write({
      cname: myName,                      //発信者name
      msg: dataStreamInput.value,         //メッセージ内容
    });
    messages.style.display = 'block';
    // 自分のチャットに送信した文章を表示
    messages.textContent += 'あなた:' + dataStreamInput.value + '\n';
    chatlogmessages.textContent += 'あなた:' + dataStreamInput.value + '\n';
    dataStreamInput.value = '';
    messages.scrollTo(0, messages.scrollHeight);
    console.log('(・ω・)ノ < 送信!');
    chatlogmodal.style.display = 'none';
    chatTimer();
  };

  // エンター入力
  document.addEventListener('keypress', OK);

  // エンター入力用関数
  function OK(e) {
    if(e.code === 'Enter'){
      msgSE.play();
      // 自分のnameとメッセージ内容を送信
      data.write({
        cname: myName,                      //発信者name
        msg: dataStreamInput.value,         //メッセージ内容
      });
      messages.style.display = 'block';
      // 自分のチャットに送信した文章を表示
      messages.textContent += 'あなた:' + dataStreamInput.value + '\n';
      chatlogmessages.textContent += 'あなた:' + dataStreamInput.value + '\n';
      dataStreamInput.value = '';
      messages.scrollTo(0, messages.scrollHeight);
      console.log('(・ω・)ノ < 送信!');
      chatlogmodal.style.display = 'none';
      chatTimer();
    }
  }

  // 🌟チャットログボタン
  chatlogbtn.addEventListener('click', () => {
    OKbtn.play();
    chatlogmodal.style.display = 'block';
  })
  Relog.addEventListener('click', () => {
    NObtn.play();
    chatlogmodal.style.display = 'none';
  })


  // 🌟ゲームボタン
  gamestart.addEventListener('click', () => {
    OKbtn.play();
    const gamemesg = "ゲーム部屋に移動しました！"
    data.write({
      cname: myName,         //発信者name
      msg: gamemesg,         //メッセージ内容
    });
    //localStorageのOKIDキーに値を保存
    // localStorage.setItem('GAME', 'game');
    location = "../game/game.html"
  });


  let room; // 入室ボタンを押したときに使うやつ
  if (room) {
    return;
  }

  // localStorageのOKRoomキーの値を取り出す
  const RoomName = localStorage.getItem("OKRoom");
  // ローマ字変換
  const ROOMromagi = window.globalFunction.roma(localStorage.getItem("OKRoom"))
  // ルーム名を表示
  document.getElementById("Roomname").innerHTML = RoomName;
  console.log('ルーム名：変換前 ' + RoomName + ', 変換後 ' + ROOMromagi)

  // 💎作成するルームタイプとルーム名の設定
  // SkyWayRoom.FindOrCreate：同じnameのroomが存在しなければ作成し、存在する場合はそのroomを取得する関数
  room = await SkyWayRoom.FindOrCreate(context, {
    name: ROOMromagi,      //入力したルーム名
    type: "p2p",
  });
  console.log("(/・ω・)/ < 作成!");

  // 💎自分が入室時に自分の名前指定（idは自動的に払い出される値なためおそらく変更不可）
  const member = await room.join({
    name: romagi,
  });

  msgSE.play();
  messages.style.display = 'block';
  messages.textContent += '=== 入室しました ===\n';
  chatlogmessages.textContent += '=== 入室しました ===\n';
  messages.textContent == '';
  chatlogmessages.textContent == '';
  chatTimer();

  // room入室時に自分のビデオ映像を表示
  localVideo.muted = true;
  localVideo.playsInline = true;
  video.attach(localVideo);
  await localVideo.play();


  // 💎相手が入室時に相手の名前を表示する　${変数}：文字列内に変数を展開する(グレーブアクセント``で囲む)${e.member.id.slice(0, 5)}
  // e.member.nameにすると相手の名前を取得できる。「e.」を前につけないと自分の名前が表示される。
  room.onMemberJoined.add((e) => {
    msgSE.play();

    // ひらがな変換
    const hiragana = window.globalFunction.r2h(e.member.name)
    messages.style.display = 'block';
    messages.textContent += `=== ${hiragana} さんが入室しました ===\n`;
    chatlogmessages.textContent += `=== ${hiragana} さんが入室しました ===\n`;
    messages.scrollTo(0, messages.scrollHeight);
    // chatlogmessages.scrollTo(0, messages.scrollHeight);
    chatTimer();
  });


  // 💎自分の音声とカメラ映像をpublish
  const aud = await member.publish(audio);
  await member.publish(video);
  await member.publish(data);


  // 通話時間タイマー
  window.globalFunction.VideoTimerset()

  const userVideo = {};
  var j=0
  // 💎パブリケーション
  member.onPublicationSubscribed.add(async ({ stream, subscription }) => {
    switch (stream.contentType) {
      // ビデオ映像
      case 'video':{
        // ビデオ映像数カウント　相手のdivタグのカウントは1からスタート
        j++
        // 相手のID名
        const publisherId = subscription.publication.publisher.name;
        console.log(j,publisherId)


        for(var i=1;i<=j;i++){
          // タグ内のvideoタグにあるcountがあるかを見る
          const videofill = remoteVideos.querySelector(
            `[count="${i}"]`
          )
          console.log(videofill)
          // countがない場合はそこに新しく入室した人の映像を出す
          if(!videofill){
            const div = document.createElement('div');
            remoteVideos.appendChild(div);
            div.className = "remote-streams" + i
            div.id = "remote-streams" + i
            div.setAttribute('data-member-div', publisherId);
      
            // ビデオ映像表示
            const newVideo = document.createElement('video');
            newVideo.className = 'their-video' + i;
            newVideo.id = 'their-video' + i;
            newVideo.playsInline = true;
            newVideo.autoplay = true;
            // ミラーリング
            newVideo.style.transform = "scaleX(-1)";
            // 相手が退室時に相手のビデオ映像を切るときにID名を探す用
            newVideo.setAttribute('data-member-id', publisherId);
            newVideo.setAttribute('count', i);
      
            // 相手のID名表示
            const Name = document.createElement('h1');
            const theirName = document.getElementsByName('their-name');
            // ひらがな変換
            const hiragana = window.globalFunction.r2h(publisherId)
            console.log('相手の名前：変換前 ' + publisherId +  ', 変換後 ' + hiragana)
            Name.className = 'their-name' + i
            Name.setAttribute('data-member-Name', publisherId);
            Name.textContent = hiragana;
            theirName.innerHTML = hiragana;
      
            // 指定した要素の最後の子要素として追加
            div.appendChild(newVideo);
            div.appendChild(Name);
            userVideo[publisherId] = newVideo;
          }
        }

        const newVideo = userVideo[publisherId];
        // div要素に追加
        stream.attach(newVideo);
        console.log(remoteVideos);
        }
        break;

      // 音声
      case 'audio':{
        const newAudio = document.createElement('audio');
        newAudio.controls = true;
        newAudio.autoplay = true;
        stream.attach(newAudio);
        }
        break;
      
      // チャット
      case 'data':{
        //相手に送信
        stream.onData.add(({cname, msg}) => {
          msgSE.play();

          // 相手のメッセージ内容を表示（メッセージ内容の前に送信者の名前を表示）
          messages.style.display = 'block';
          messages.textContent +=  cname + `:` + msg + '\n';
          chatlogmessages.textContent +=  cname + `:` + msg + '\n';
          messages.scrollTo(0, messages.scrollHeight);
          console.log('(・´з`・) < 受信!');
          chatTimer();
        });
      }
    }
  });


  // 💎サブスクリプション
  const subscribe = async (publication) => {
    if (publication.publisher.id === member.id) return;
    await member.subscribe(publication.id);
  };
  room.onStreamPublished.add((e) => subscribe(e.publication));
  // roomにpublishされているstreamのpublicateon一覧を取得
  room.publications.forEach(subscribe);


  // 💎roomからmemberが離脱した時に発火
  room.onMemberLeft.add((e) => {
    console.log("誰かが退室しました")
  })


  // 相手の情報を消す
  const disposeVideoElement = (remoteVideo, remotediv, remoteName) => {
    const stream = remoteVideo.srcObject;
    stream.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
    // 退出した人のdivタグ、Videoタグ、Nameタグを消す
    remoteVideo.remove();
    remotediv.remove();
    remoteName.remove();
    // 抜けた人のカウントを減らす
    j--;
  }


  // 💎相手の退室時
  room.onMemberLeft.add((e) => {
    if (e.member.id === member.id) return;

    // 相手のdiv,video,Nameタグの情報取得
    console.log(remoteVideos)
    const remoteVideo = remoteVideos.querySelector(
      `[data-member-id="${e.member.name}"]`
    )
    const remotediv = remoteVideos.querySelector(
      `[data-member-div="${e.member.name}"]`
    )
    const remoteName = remoteVideos.querySelector(
      `[data-member-Name="${e.member.name}"]`
    )
    console.log(remoteVideo, remotediv, remoteName)

    // 相手の情報削除
    disposeVideoElement(remoteVideo, remotediv, remoteName);

    // 相手のタグの情報取得
    console.log(remoteVideos)

    chatTimer();
  });


  // 💎自分の退室時 5秒後リロード
  member.onLeft.once(() => {
    console.log(remoteVideos.children[0])
    // 相手がいないときは相手のビデオ映像を探さない
    if(!remoteVideos.children[0]){
      false
    }else{
      Array.from(remoteVideos.children[0]).forEach((element) => {
        disposeVideoElement(element);
      });
    }

    // ルームの破棄
    room.dispose();
    room = undefined;

    localVideo.srcObject = null;
    reloadTimer();
  });


  // 🌟退室ボタン
  leaveTrigger.addEventListener('click', () => {
    NObtn.play();
    // 相手に自分が退室したことをメッセージ
    const mesg = "退室しました"
    data.write({
      cname: myName,                      //発信者name
      msg: mesg,         //メッセージ内容
    });
    console.log("退室")

    // 自分側のメッセージ
    messages.style.display = 'block';
    messages.textContent += '=== 退室しました ===\n';
    chatlogmessages.textContent += '=== 退室しました ===\n';
    messages.scrollTo(0, messages.scrollHeight);
    document.getElementById("Roomname").innerHTML = "";
    console.log("('Д') < 自分が退出!");
    chatTimer();

    member.leave()
  });

})();
