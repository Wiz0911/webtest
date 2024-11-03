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
    playNow();
})

// 加载音乐
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb-1].name;
    mainAudio.src = allMusic[indexNumb-1].src;
    console.log("songs name: ", allMusic[indexNumb-1].name);
    console.log("songs addr: ", allMusic[indexNumb-1].src);
}

// 播放音乐
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}


// 暂停音乐
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// 播放、暂停按钮添加事件监听
playPauseBtn.addEventListener("click", function(){
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playNow();
});

// 音乐列表
const ulTag = wrapper.querySelector("ul");
// 循环 allMusic 数组
for(let i = 0; i < allMusic.length; i++){
    let liTag = `<li li-index="${i+1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                    </div>
                    <audio class="${allMusic[i].name}" src="${allMusic[i].src}"></audio>
                    <span id="${allMusic[i].name}" class="audio-duration">0:00</span>
                </li>`;
    // 在ul标签内部，最后一个子元素之后插入html
    ulTag.insertAdjacentHTML("beforeend", liTag);
    console.log(liTag);
    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].name}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].name}`);

    console.log("liAudioDuration: ", liAudioDuration);
    console.log("liAudioTag: ", liAudioTag);

    // 添加音乐标签事件监听
    liAudioTag.addEventListener("loadeddata", function(){
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}
// 正在播放函数
const allLiTags = ulTag.querySelectorAll("li");
function playNow(){
    for (let j = 0; j < allLiTags.length; j++){
        let audioTag = allLiTags[j].querySelector(".audio-duration");
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
            let addDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = addDuration;
        }
        if(allLiTags[j].getAttribute("li-index") == musicIndex){
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "playing";
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}