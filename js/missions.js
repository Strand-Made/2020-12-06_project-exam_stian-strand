// Get Launches information
const missionsUrl = "https://api.spacexdata.com/v4/launches/";
const missionsContainer = document.querySelector(".missions");

async function missions() {
  try {
    const missionResponse = await fetch(missionsUrl);
    const missionResult = await missionResponse.json();
    missionsContainer.innerHTML = "";
    // loop through result
    for (let i = 0; i < missionResult.length; i++) {
      if (missionResult[i].links.patch.small === null) {
        continue;
      }

      //   Date converter
      const unix = missionResult[i].date_unix;
      const milisc = unix * 1000;
      const dateObject = new Date(milisc);
      const regularDate = dateObject.toLocaleString();

      // Create html
      missionsContainer.innerHTML += `<div class="mission">
                                        <h3>${missionResult[i].name}</h3>
                                        <img src="${missionResult[i].links.patch.small}" alt="Image of ${missionResult[i].name} patch" />
                                        <p> Date: ${regularDate}</p>
                                        <a href="mission.html?id=${missionResult[i].id}" class="btn-small" href="">More</a>
                                        </div>
                                        `;
    }
  } catch (error) {
    console.log(error);
  }
}
missions();

// Back to top function show/hide
const returnTop = document.querySelector(".back-to-top");
function showButton() {
  const scrollY = window.scrollY;
  if (scrollY > 300) {
    returnTop.classList.add("appear");
  } else {
    returnTop.classList.remove("appear");
  }
}
window.onscroll = showButton;

// go to top on click
returnTop.addEventListener("click", function (event) {
  event.preventDefault();
  document.documentElement.scrollTop = 0;
});
