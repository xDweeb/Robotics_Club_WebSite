document.addEventListener("DOMContentLoaded",  ()=> {
    function duplicateImages(track) {
        let images = Array.from(track.children);
        
        // Clone images to make scrolling seamless
        images.forEach(img => {
            let clone = img.cloneNode(true);
            track.appendChild(clone);
        });
    }

    let tracks = document.querySelectorAll(".image-track");
    tracks.forEach(track => {
        duplicateImages(track);
    });

    const words = ['rafting', 'odeling', 'oding'];
    const wordEls = [0, 1, 2].map(i => document.getElementById(`word${i}`));
    const restEls = [0, 1, 2].map(i => document.getElementById(`rest${i}`));
    const cursors = document.querySelectorAll('.cursor');

    function start() {
      // Reset
      wordEls.forEach(el => el.textContent = '');
      restEls.forEach(el => el.classList.remove('active'));
      cursors.forEach((c, i) => c.style.display = i === 0 ? 'inline-block' : 'none');

      setTimeout(() => type(0), 1000);
    }

    function type(index) {
      if (index >= 3) {
        setTimeout(start, 3000);
        return;
      }

      // Show rest part (fade in)
      restEls[index].classList.add('active');
      // Show cursor only on current line
      cursors.forEach((c, i) => c.style.display = i === index ? 'inline-block' : 'none');

      const word = words[index];
      let i = 0;
      const add = () => {
        if (i < word.length) {
          wordEls[index].textContent += word[i++];
          setTimeout(add, 100);
        } else {
          setTimeout(() => type(index + 1), 300);
        }
      };
      add();
    }

    start();
});
