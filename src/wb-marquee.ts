import { gsap } from "gsap";
const init = () => {
  const marquee = document.querySelector<HTMLDivElement>('[wb-data="marquee"]');
  if (!marquee) {
    console.log("no marque div found");
    return;
  }

  const marqueeContent = marquee.firstChild as HTMLDivElement;
  if (!marqueeContent) {
    console.log("no marque content div found");
    return;
  }
  let marqueeContentClone = marqueeContent.cloneNode(true);
  marquee.append(marqueeContentClone);

  let tween;

  function loop() {
    let progress = tween ? tween.progress() : 0;
    tween && tween.progress(0).kill();
    let gap = parseInt(getComputedStyle(marqueeContent as HTMLDivElement).gap);
    let marqueeWidth = parseInt(
      getComputedStyle(marqueeContent as HTMLDivElement).width
    );
    let gapDistPercent = (gap / marqueeWidth) * 100;
    let distanceToMove = gapDistPercent + 100;

    if (!marquee) {
      console.log("no marquee element found");
      return;
    }

    tween = gsap.fromTo(
      marquee.children,
      { xPercent: 0 },
      {
        xPercent: -distanceToMove,
        duration: 6,
        ease: "none",
        repeat: -1,
      }
    );
    tween.progress(progress);
  }
  loop();

  function debounce(func) {
    var timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(
        () => {
          func();
        },
        500,
        event
      );
    };
  }
  window.addEventListener("resize", debounce(loop));
};

document.addEventListener("DOMContentLoaded", init);
