const url = "https://api.spacexdata.com/v4/launches/next";

const launchContainer = document.querySelector(".countdown");

// Next Launch
async function nextLaunch() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    // If webcast is not available hide button
    if (result.links.webcast === null) {
      document.querySelector(".btn-live").style.display = "none";
    } else {
      document.querySelector(".stream-up").style.display = "none";
    }
    // Create html
    launchContainer.innerHTML += `<h4> Next Launch : ${result.name}</h4>
                                  <p> Stream usually available day of launch
                                  <a href="${result.links.webcast}" class="btn-live>View Livestream </a>
                                  `;
  } catch (error) {
    error;
  }
}
nextLaunch();

// GET List of Future Launches
const launchesUrl = "https://api.spacexdata.com/v4/launches/upcoming";
const launchTable = document.querySelector(".launches-table");

async function launches() {
  try {
    const response = await fetch(launchesUrl);
    const result = await response.json();
    console.log(result);

    createHtml(result);
  } catch (error) {
    console.log(error);
  }
}
launches();

function createHtml(result) {
  result.forEach((launch) => {
    // Transform unix code to regular date
    const unix = launch.date_unix;
    const milisc = unix * 1000;
    const dateObject = new Date(milisc);
    const regularDate = dateObject.toLocaleString();

    launchTable.innerHTML += `  
                                            <tr>
                                                <td data-th ="Mission Name">
                                                    ${launch.name}
                                                </td>
                                                <td data-th ="Date">
                                                    ${regularDate}
                                                </td>
                                                <td data-th= "Location">
                                                    ${launch.launchpad}
                                                </td>
                                                <td data-th = "Rocket">
                                                    ${launch.rocket}
                                                </td>
                                            </tr>
                                    
                                        `;
  });
}

// Get Rockets information
const rocketsUrl = "https://api.spacexdata.com/v4/rockets";
const rocketsContainer = document.querySelector(".rockets");

async function rockets() {
  try {
    const rocketResponse = await fetch(rocketsUrl);
    const rocketResult = await rocketResponse.json();
    console.log(rocketResult);

    rocketResult.forEach((rocket) => {
      rocketsContainer.innerHTML += `<a href="rocket.html?id=${rocket.id}" class="rocket">
                                    <h3>${rocket.name} </h3>
                                    <img src="${rocket.flickr_images[1]}" alt ="${rocket.name}"/>
                                    <p> Active: <span class="isActive">${rocket.active}</span> </p> 
                                    <p> First Flight: ${rocket.first_flight} </p>
                                    <p> Country: ${rocket.country} </p>
                                   </a>
      
      `;
      // If rocket is active set yellow text if not red text
      if (rocket.active === true) {
        document.querySelector(".isActive").classList = "yellow-marked";
      } else {
        document.querySelector(".isActive").classList = "red-marked";
      }
    });
  } catch (error) {
    console.log(error);
  }
}
rockets();

// Get Launches information
const missionsUrl = "https://api.spacexdata.com/v4/launches/?launch_year=2020";
const missionsContainer = document.querySelector(".missions");
async function missions() {
  try {
    const missionResponse = await fetch(missionsUrl);
    const missionResult = await missionResponse.json();
    console.log(missionResult);
    // Only show the latest from 100 and on
    for (let i = 100; i < missionResult.length; i++) {
      missionsContainer.innerHTML += `<div class="mission">
                                        <h3>${missionResult[i].name}</h3>
                                        <img src="${missionResult[i].links.patch.small}" alt=" Mission Patch" />
                                        <a href="mission.html?id=${missionResult[i].id}" class="btn-small" href="">More</a>
                                        </div>
                                        `;
    }
  } catch (error) {
    console.log(error);
  }
}
missions();

// // About SpaceX
// const aboutUrl = "https://api.spacexdata.com/v4/company";
// const aboutContainer = document.querySelector(".about");
// async function aboutSpaceX() {
//   try {
//     const aboutSpaceResponse = await fetch(aboutUrl);
//     const aboutResult = await aboutSpaceResponse.json();
//     console.log(aboutResult);

//     aboutContainer.innerHTML += `<div class="spaceX-about">
//                                         <h5> Founded By: ${aboutResult.founder}</h5>

//             </div>
//             `;
//   } catch (error) {
//     console.log(error);
//   }
// }
// aboutSpaceX();
