const url = "https://api.spacexdata.com/v4/launches/next";

const launchContainer = document.querySelector(".countdown");

// Next Launch
async function nextLaunch() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    launchContainer.innerHTML = "";

    // Create html
    launchContainer.innerHTML += `<h4> Next Launch : ${result.name}</h4>
                                  <p class="stream-available"> Stream usually available day of launch </p>
                                  <a href="${result.links.webcast}" class="btn-live">View Livestream</a>
                                  `;
    // If webcast is not available hide button
    if (result.links.webcast === null) {
      document.querySelector(".btn-live").style.display = "none";
      document.querySelector(".stream-available").style.display = "block";
    } else {
      document.querySelector(".btn-live").style.display = "block";
      document.querySelector(".stream-available").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}
nextLaunch();

// GET List of Future Launches
const launchesUrl = "https://api.spacexdata.com/v4/launches/upcoming";
const rocketUrl = "https://api.spacexdata.com/v4/rockets/";
const launchPadUrl = "https://api.spacexdata.com/v4/launchpads/";
const launchTable = document.querySelector(".launches-table");

async function launches() {
  try {
    const response = await fetch(launchesUrl);
    const result = await response.json();
    console.log(result);
    result.forEach(async (launch) => {
      // Get rocket
      const rocket = await fetch(rocketUrl + launch.rocket);
      const rocketResult = await rocket.json();
      // get launchpad
      const launchPad = await fetch(launchPadUrl + launch.launchpad);
      const launchPadResult = await launchPad.json();

      // transform unix code to date
      const unix = launch.date_unix;
      const milisc = unix * 1000;
      const dateObject = new Date(milisc);
      const regularDate = dateObject.toLocaleString();
      // create html
      launchTable.innerHTML += `  
                                            <tr>
                                                <td data-th ="Mission Name">
                                                    ${launch.name}
                                                    #${launch.flight_number}
                                                </td>
                                                <td data-th ="Date">
                                                    ${regularDate}
                                                </td>
                                                <td data-th= "Location">
                                                    ${launchPadResult.name}
                                                </td>
                                                <td data-th = "Rocket">
                                                    ${rocketResult.name}
                                                </td>
                                            </tr>
                                    
                                        `;
    });
  } catch (error) {
    console.log(error);
  }
}
launches();

// Get Launches information
const missionsUrl = "https://api.spacexdata.com/v4/launches/";
const missionsContainer = document.querySelector(".missions");
const placeholderImg = 'src="assets/spacex-logo.png"';
async function missions() {
  try {
    const missionResponse = await fetch(missionsUrl);
    const missionResult = await missionResponse.json();
    // Only show the latest from 110 and on
    for (let i = 110; i < missionResult.length; i++) {
      if (missionResult[i].links.patch.small === null) {
        continue;
      }
      // transform date
      const unix = missionResult[i].date_unix;
      const milisc = unix * 1000;
      const dateObject = new Date(milisc);
      const regularDate = dateObject.toLocaleString();
      // create html
      missionsContainer.innerHTML += `<div class="mission">
                                        <h3>${missionResult[i].name}</h3>
                                        <img src="${missionResult[i].links.patch.small}" alt="Image of ${missionResult[i].name} patch" />
                                        <p>#${missionResult[i].flight_number}</p>
                                        <p>Date: ${regularDate}</p>
                                        <a href="mission.html?id=${missionResult[i].id}" class="btn-small" href="">More</a>
                                        </div>
                                        
                                        `;
    }
  } catch (error) {
    console.log(error);
  }
}
missions();

// Get Rockets information
const rocketsUrl = "https://api.spacexdata.com/v4/rockets";
const rocketsContainer = document.querySelector(".rockets");

async function rockets() {
  try {
    const rocketResponse = await fetch(rocketsUrl);
    const rocketResult = await rocketResponse.json();
    // create html
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

// About SpaceX
const aboutUrl = "https://api.spacexdata.com/v4/company";
const aboutContainer = document.querySelector(".about-spacex");

async function aboutSpace() {
  try {
    const response = await fetch(aboutUrl);
    const result = await response.json();
    aboutContainer.innerHTML += `<div class="spacex-about">
                                  <div>
                                    <h3> About ${result.name}</h3>
                                      <p>Founded: ${result.founded}</p>
                                      <p>Founder: ${result.founder}</p>
                                      <p> Number of Employees: ${result.employees}</p>
                                    </div>
                                  <div>
                                    <h4> Headquarters </h4>
                                    <p>State : ${result.headquarters.state}</p>
                                    <p>City: ${result.headquarters.city}</p>
                                    <p>Adress: ${result.headquarters.address}</p>
                                  
                              </div>
                              <div>
                              <h4> SpaceX's mission </h4>
                                <p> ${result.summary}</p>
                              </div>
                              
  </div>
  `;
  } catch (error) {
    console.log(error);
  }
}
aboutSpace();
