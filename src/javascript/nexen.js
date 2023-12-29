const nexen = () => {
  const bgObj = document.querySelectorAll(".bg-container span");

  const text_start =
    document.querySelector(".list-container").offsetHeight / 2.1;
  const text_Height = document.querySelector(".list-container").offsetHeight;
  const text_Fin = text_Height + text_start;
  const listItems = document.querySelectorAll(".list-item");
  const division = (text_Fin - text_start) / listItems.length;

  const videoPlayBack = 100;
  const videoWrap = document.querySelector(".video-wrap");
  const fixedVideoBox = document.querySelector(".fixed-box");
  const videoElement = document.querySelector(".video");
  const fixedDescription = document.querySelector(".fixed-description");

  function centerElement(elementId, video) {
    const element = document.getElementById(elementId);
    const parent = element.parentElement;

    if (
      window.scrollY >
      parent.offsetTop -
        (document.documentElement.clientHeight - element.offsetHeight) / 2
    ) {
      element.style.position = "fixed";
      element.style.top = "50%";
      element.style.left = "50%";
      element.style.transform = "translate(-50%, -50%)";
      if (video)
        video.currentTime =
          (window.scrollY - videoWrap.offsetTop) / videoPlayBack;
    } else {
      element.style.position = "relative";
      element.style.top = "initial";
      element.style.left = "initial";
      element.style.transform = "initial";
    }
  }

  let intervalId = null;
  const preloaderHideThreshold = 18;

  const area04 = document.querySelector(".area-04");
  const area04OffsetTop = area04 ? area04.offsetTop : 0;

  const fixedDescriptionAppearTiming = document.querySelector(".area-02").offsetTop;
  const fixedDescriptionAppearEnds = document.querySelector(".area-03").offsetTop;

  window.addEventListener("scroll", () => {
    const middleOfScreen = window.innerHeight / 2 + window.scrollY;

    bgObj.forEach((span, index) => {
      const translateY = index % 2 === 0 ? 90 : -90;
      const rotate = index % 2 === 0 ? -3 : 3;

      if (middleOfScreen > bgObj[index].offsetTop) {
        span.style.transform = `translate(${translateY}px, 0) rotate(${rotate}deg)`;
      } else {
        span.style.transform = "";
      }
    });

    listItems.forEach((item) => item.classList.remove("on"));
    if (window.scrollY > text_start && window.scrollY < text_Fin) {
      const targetIndex = Math.round((window.scrollY - text_start) / division);
      if (listItems[targetIndex]) {
        listItems[targetIndex].classList.add("on");
      }
    }

    centerElement("fixedBox", videoElement);

    if (
      window.scrollY >
      videoWrap.offsetTop +
        videoWrap.offsetHeight -
        (fixedVideoBox.offsetHeight +
          (document.documentElement.clientHeight - fixedVideoBox.offsetHeight) /
            2)
    ) {
      fixedVideoBox.style.position = "relative";
      fixedVideoBox.style.top = "initial";
      fixedVideoBox.style.left = "initial";
      fixedVideoBox.style.transform = `translateY(${
        videoWrap.offsetHeight - fixedVideoBox.offsetHeight
      }px)`;
    }
    
    if (window.scrollY > fixedDescriptionAppearTiming && window.scrollY < fixedDescriptionAppearEnds) {
      fixedDescription.style.transform = `translateY(${fixedDescriptionAppearEnds - window.scrollY}px)`

      fixedDescription.style.opacity = (window.scrollY - fixedDescriptionAppearTiming) / 300
    } else if (window.scrollY > fixedDescriptionAppearEnds) {
      fixedDescription.style.transform = `translateY(0px)`
      fixedDescription.style.opacity = 1
    } else {
      fixedDescription.style.transform = `translateY(100px)`
      fixedDescription.style.opacity = 0
    }

    centerElement("slogan");

    const poster = document.querySelector(".poster");

    if (poster) {
      if (window.scrollY > area04OffsetTop) {
        poster.classList.remove("hidden-area");
        poster.classList.add("shown-area");
      } else {
        poster.classList.add("hidden-area");
        poster.classList.remove("shown-area");
      }
    } else {
      console.error("Element with class 'poster' not found.");
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("poster-image_state_visible");
        }
      });
    });

    document.querySelectorAll(".poster-image_wrapper").forEach((poster) => {
      observer.observe(poster);
    });

    const posterParallax = document.querySelector(".poster__parallax");
    posterParallax.addEventListener("mousemove", (e) => {
      const xRelativeToPosterParallax = e.clientX / posterParallax.clientWidth;
      const yRelativeToPosterParallax = e.clientY / posterParallax.clientHeight;

      document.querySelector(
        "#poster-image_wrapper_1"
      ).style.transform = `translate(${xRelativeToPosterParallax * 60}px, ${
        yRelativeToPosterParallax * 60
      }px)`;
      document.querySelector(
        "#poster-image_wrapper_2"
      ).style.transform = `translate(${xRelativeToPosterParallax * -40}px, ${
        yRelativeToPosterParallax * -40
      }px)`;
      document.querySelector(
        "#poster-image_wrapper_3"
      ).style.transform = `translate(${xRelativeToPosterParallax * 40}px, ${
        yRelativeToPosterParallax * 40
      }px)`;
    });
  });

  videoElement.addEventListener("loadedmetadata", () => {
    videoWrap.style.height = videoElement.duration * videoPlayBack + "px";
  });
};

export default nexen;
