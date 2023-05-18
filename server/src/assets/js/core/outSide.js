
  var myVideo = document.getElementById("myVideo");
  var chapterLinks = document.querySelectorAll(".list-group-item");

  // Set the current chapter to the first one in the list
  var currentChapter = chapterLinks[0];

  // Add a click event listener to each chapter link
  chapterLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      // Remove the "active" class from the current chapter link
      currentChapter.classList.remove("active");

      // Set the current chapter to the clicked link
      currentChapter = link;

      // Add the "active" class to the clicked link
      currentChapter.classList.add("active");

      // Get the timecode from the data-time attribute of the link
      var timecode = parseInt (currentChapter.getAttribute("data-time"),10);

      // Set the current time of the video to the timecode
      if (myVideo) {
        myVideo.currentTime = timecode;
      }
    });
  });



  document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const results = document.getElementById('results');
    const radioStations = document.querySelectorAll('.list-group-item');

    searchButton.addEventListener('click', performRadioSearch);

    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (key.length === 1 && key.match(/[a-z]/i)) {
            if (document.activeElement !== searchBar) {
                searchBar.focus();
                searchBar.value = searchBar.value.slice(0, searchBar.selectionStart) + key + searchBar.value.slice(searchBar.selectionEnd);
                searchBar.selectionEnd = searchBar.selectionStart;
            }
        } else if (key === 'Enter') {
            performRadioSearch();
        }
    });

    function performRadioSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();

        radioStations.forEach(station => {
            if (station.textContent.toLowerCase().includes(searchTerm)) {
                station.style.display = 'block';
            } else {
                station.style.display = 'none';
            }
        });
    }
});


