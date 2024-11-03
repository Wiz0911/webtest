// 定义全局常量
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = wrapper.querySelector("#close");

// 定义音乐索引号变量
let musicIndex = 1;

// 浏览器事件监听，页面加载完成后触发 loadMusic函数
window.addEventListener("load", function(){
    loadMusic(musicIndex);
    // playNow();
})

// 加载音乐
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb-1].name;
    // musicArtist.innerText = allMusic[indexNumb-1].artist;
    musicImg.src = `images/音乐窗.png`;
    mainAudio.src = "http://47.96.89.79:8080/Desktop/1.mp3";
}
