// 必要な引数を定義
const chatlogmessages = document.getElementById('logmessages');
const Voice = document.getElementById('voice-word');             //音声入力ボタン

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ja-JP';
// recognition.interimResults = true;

let voiceword
recognition.onresult = (event) => {
  for(let i = event.resultIndex; i < event.results.length; i++) {
    voiceword = event.results[i][0].transcript;
  }
  console.log(voiceword)
  chatlogmessages.textContent += '音声入力：' + voiceword + '\n';
  recognition.stop();
}



//音声入力ボタンを押すと音声認識開始
Voice.addEventListener('click', () => {
  recognition.start();

  //音声入力ができないときはアラートを表示
  if ('SpeechRecognition' in window) {
    console.log("音声入力可能");
  } else {
    alert("このブラウザでは音声入力ができません");
  }
});
