 var audio = document.querySelector('audio');
    var listItems = document.querySelectorAll('.list-group-item');
    var audioPlayer = document.querySelector('.embed-responsive');

  function updatePlayer(src) {
    audio.setAttribute('src', src);
    audio.load();
    audio.play();
  }

for (var i = 0; i < listItems.length; i++) {

  listItems[i].addEventListener('click', function(event) {
    event.preventDefault();
    var newSrc = this.getAttribute('data-src');

    // Update the player with the new source
    updatePlayer(newSrc);

    // Remove the 'active' class from all list items
    for (var j = 0; j < listItems.length; j++) {
      listItems[j].classList.remove('active');
    }

    // Add the 'active' class to the clicked list item
    this.classList.add('active');

    // Smoothly scroll to the audio player
    window.scrollTo({
      top: audioPlayer.getBoundingClientRect().top + window.pageYOffset,
      behavior: 'smooth'
    });
  });
}
