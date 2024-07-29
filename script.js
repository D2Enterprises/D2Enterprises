// Example: Animation on scroll
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    let scrollPosition = window.scrollY;

    hero.style.backgroundPositionY = -scrollPosition / 2 + 'px';
});
if (!name || !address || !phone) {
    alert("Please complete all fields.");
    return;
}
