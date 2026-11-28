/* =========================================================
   Rogers Made — homepage workshop video banner
   Loaded on the homepage only. The video file is only
   requested once the page has loaded and the banner is on
   screen, and it pauses while scrolled out of view.
   ========================================================= */
(function () {
  "use strict";

  var banner = document.querySelector("[data-video-banner]");
  if (!banner) return;
  var video = banner.querySelector("video");
  var toggle = banner.querySelector("[data-video-sound]");
  if (!video) return;

  var loaded = false;
  var inView = true;

  // Muted + playsinline are required for autoplay on mobile browsers
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  function play() {
    var attempt = video.play();
    if (attempt && attempt.catch) attempt.catch(function () { /* autoplay blocked: poster stays */ });
  }

  function load() {
    if (loaded) return;
    loaded = true;
    video.src = video.getAttribute("data-src");
    video.preload = "auto";
    play();
  }

  video.addEventListener("playing", function () { banner.classList.add("is-playing"); });

  /* ---------- Sound toggle ---------- */

  function syncToggle() {
    if (!toggle) return;
    var on = !video.muted;
    var label = on ? "Turn sound off" : "Turn sound on";
    toggle.setAttribute("aria-pressed", on ? "true" : "false");
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
    banner.classList.toggle("has-sound", on);
  }

  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", function () {
      load();
      video.muted = !video.muted;
      if (!video.muted) {
        video.volume = 1;
        if (video.paused) play();
      }
      syncToggle();
    });
    video.addEventListener("volumechange", syncToggle);
    syncToggle();
  }

  /* ---------- Load after the page, play only while visible ---------- */

  function start() {
    if (!("IntersectionObserver" in window)) { load(); return; }
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) {
        if (!loaded) load();
        else if (video.paused) play();
      } else if (loaded && video.muted && !video.paused) {
        video.pause();
      }
    }, { threshold: 0.05 }).observe(banner);
  }

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });

  // Resume after returning to the tab (some mobile browsers pause muted video)
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && loaded && inView && video.paused) play();
  });
})();
