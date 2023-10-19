
const localVideo = document.getElementById('local-stream');        //自分のビデオ映像


// 通話時間の表示
function VideoTimerset(){
  var Timer = setInterval(function(){
    VideoTimer();
    // ビデオ映像切れたらタイマー停止
    if(localVideo.srcObject == null){
      clearInterval(Timer);
    }
  }, 1000);
}

var totalSeconds = 0;

function VideoTimer(){
  ++totalSeconds;
  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour * 3600) / 60);
  var seconds = totalSeconds - (hour * 3600 + minute * 60);
  document.getElementById("Vtimer").innerHTML = hour + ":" + minute + ":" + seconds;
  // ↑の変数達が一桁でも 00:00:00 の形で表示されるようにする
  if(hour < 10 && minute < 10 && seconds < 10){
    document.getElementById("Vtimer").innerHTML = "0" + hour + ":0" + minute + ":0" + seconds;
  }
  else if(hour < 10 && minute < 10){
    document.getElementById("Vtimer").innerHTML = "0" + hour + ":0" + minute + ":" + seconds;
  }
  else if(hour < 10){
    document.getElementById("Vtimer").innerHTML = "0" + hour + ":" + minute + ":" + seconds;
  }
}

window.globalFunction.VideoTimerset = VideoTimerset