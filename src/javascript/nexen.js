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
  const fixedVideoText = document.querySelector(".fixed-description");

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

    const fixedDescription = document.querySelector(".fixed-description");
    const fixedDescriptionH =
      document.querySelector(".fixed-description").offsetHeight;
    const area01H = document.querySelector(".area-01").clientHeight;
    const area02H = document.querySelector(".area-02").clientHeight;

    console.log(fixedDescription);
    console.log(area01H);
    console.log(area02H);
    console.log(fixedDescriptionH);
    console.log(window.scrollY);

    if (window.scrollY > area01H && window.scrollY < area02H) {
      fixedDescription.style.transform = `translateY(${
        window.scrollY - area01H
      }px)`;
      fixedDescription.style.opacity = (area02H - window.scrollY) / 3000;
    } else if (window.scrollY >= area02H) {
      fixedDescription.style.transform = `translateY(0px)`;
      fixedDescription.style.opacity = 1;
    } else {
      fixedDescription.style.transform = `translateY(100px)`;
      fixedDescription.style.opacity = 0;
    }

    centerElement("slogan");
  });

  videoElement.addEventListener("loadedmetadata", () => {
    videoWrap.style.height = videoElement.duration * videoPlayBack + "px";
  });
};

export default nexen;