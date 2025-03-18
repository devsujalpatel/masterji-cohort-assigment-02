// assigning listOfVideos for adding value later;
let listOfVideos;


// get videos function to get data
const getVideos = async () => {
  //fetching data from the api
  await fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
  .then((response) => {
     return response.json()
  }).then((data) => {
    // assigning data to listOfVidoes
    listOfVideos = data.data.data;
  }).catch((err) => {
    alert("Video Not Found");
  });
  // calling setVideos and giving it listOfVideos as an argument
  setVideos(listOfVideos);
}


// setVidoes function sets videos in the content section 
const setVideos = async (listOfVideos) => {
  const content = document.querySelector(".content");
 // iterating through array of objects in listOfVideos
  listOfVideos.forEach((element) => {
    // creating div dynimacally
    const videoCard = document.createElement("div")
    // adding classlist to the div for styling
    videoCard.classList.add("video")
  // assing cardId to use it as the vide opening link
    const cardId = element.items.id
    // adding html in the videoCard div
    videoCard.innerHTML = `
        <img class="thumbnail" alt="Video Thumbnail" src="${
          element.items.snippet.thumbnails.standard.url
        }">
        <div>
          <div class="title">${element.items.snippet.title}</div>
        <div class="channel">${element.items.snippet.channelTitle}</div>
        </div>
        <div class="state">
            <div class="view">${element.items.statistics.viewCount} Views</div>
            <div class="published-time">${element.items.snippet.publishedAt.substring(
              0,
              10
            )}</div>
        </div>
    `;
// adding click event to open link video
    videoCard.addEventListener("click", () => {
      window.open(`https://www.youtube.com/watch?v=${cardId}`);
    });
    content.appendChild(videoCard);
  });
}

// search input event
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", ()=>{
    searchVideo();
})

// search video function to search through title of the vidoe
function searchVideo() {
  const input = document.querySelector("#search-input").value.toLowerCase();
  const videoElements = document.querySelectorAll(".video");

  // iterating through listOfVideos to get every video and index
  listOfVideos.forEach((video, index) => {

    const title = video.items.snippet.title.toLowerCase();

    const videoElement = videoElements[index];

    // checking for the title in video and setting the style for it 
    if (title.includes(input)) {
      videoElement.style.display = "block";
    } else {
      videoElement.style.display = "none";
    }
  });
}

// calling get videos to load videos on page load
getVideos();