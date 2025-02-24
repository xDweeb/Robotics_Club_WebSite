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
});
