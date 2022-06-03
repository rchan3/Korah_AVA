let actions = {
  idle: {
    start: "0",
    end: "2.5",
  },
  action1: {
    start: "3.2",
    end: "7",
  },
  action2: {
    start: "7",
    end: "10.5",
  },
};
let AVA_base_video = document.getElementById("AVA_base_video");
let AVA_overlay_video = document.getElementById("AVA_overlay_video");
let AVA_action1 = document.getElementById("action_1");
let AVA_action2 = document.getElementById("action_2");

//base background video loop
AVA_base_video.onloadedmetadata = setInterval(() => {
  let time = AVA_base_video.currentTime;

  if (time > actions.idle.end) {
    AVA_base_video.currentTime = actions.idle.start;
  }
}, 200);

overlay_start = (x) => {
  //start video
  AVA_overlay_video.currentTime = x.start;
  AVA_overlay_video.play();
  AVA_overlay_video.style.visibility = "visible";
  AVA_base_video.style.visibility = "hidden";
  //make invisible after time
  check_time = setInterval(() => {
    let time = AVA_overlay_video.currentTime;
    if (!(time >= x.start && time <= x.end)) {
      AVA_overlay_video.style.visibility = "hidden";
      AVA_base_video.style.visibility = "visible";
      AVA_overlay_video.pause();
      AVA_action1.currentTime = 0;
      clearInterval(check_time);
    }
  }, 200);
};

AVA_action1.onclick = function () {
  overlay_start(actions.action1);
};

AVA_action2.onclick = function () {
  overlay_start(actions.action2);
};
