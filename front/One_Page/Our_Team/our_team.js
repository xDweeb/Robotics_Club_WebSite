document.addEventListener('DOMContentLoaded', function () {
    let carousel = new bootstrap.Carousel(document.querySelector('#teamCarousel'), {
        interval: 3000, 
        ride: 'carousel'
    });
});