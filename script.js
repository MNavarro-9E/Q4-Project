document.addEventListener("DOMContentLoaded", function () { // ensuring everything is loaded before this script runs
  console.log("script is functioning well hehe :>");

  // this part just adds a fade in effect whenever going to another page
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 50);

  const links = document.querySelectorAll('a[href], button[data-target]');
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      // If it's an <a> and has target="_blank", let the browser handle it (open new tab)
      if (this.tagName === "A" && this.target === "_blank") return;

      e.preventDefault();

      const url = this.tagName === "A" ? this.href : this.getAttribute("data-target");
      console.log("Navigating to", url);

      document.body.classList.remove("loaded");

      setTimeout(() => {
        window.location.href = url;
      }, 500);
    });
  });

  const mainTitle = document.querySelector('.main-title'); // for the star trail specifically to stay inside the main-title div
  let lastStarTime = 0;

  if (mainTitle) {
    mainTitle.addEventListener('mousemove', (e) => { 
      const now = Date.now();
      if (now - lastStarTime < 45) return; // makes a star every 45ms
      lastStarTime = now; // this tracks where the last star was

      const star = document.createElement('div'); // makes a new div
      star.classList.add('star'); // makes the star div so that the css can detect it

      const rect = mainTitle.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position
      const y = e.clientY - rect.top; // y position

      star.style.left = `${x}px`;
      star.style.top = `${y}px`;

      mainTitle.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 800); // removes the fading stars after 800ms 
    });
  } else {
    console.warn(".main-title not found"); 
  }

  const bubbles = document.querySelectorAll('.bubble'); // handles the bubble text animation stuff

  bubbles.forEach(bubble => {
    bubble.style.opacity = '0'; // make them start invisible
    bubble.style.transform = 'translateY(10px)'; // slightly below
    bubble.style.animation = 'none'; // no animation at first
  });

  void document.body.offsetWidth; // force reflow lol

  bubbles.forEach((bubble, index) => {
    bubble.style.animation = 'showBubble 0.4s ease forwards'; // apply the animation
    bubble.style.animationDelay = `${index * 2}s`; // delay for each bubble
  });
});
