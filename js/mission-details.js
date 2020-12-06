const queryString = document.location.search;
const rparams = new URLSearchParams(queryString);

const id = rparams.get("id");
// containers
const missionHeroContainer = document.querySelector(".mission-hero");
const missionInfoContainer = document.querySelector(".mission-info");
const specsContainer = document.querySelector(".mission-specs");
// if there is no id - return to home
if (id === null) {
  document.location.href = "index.html";
}
// urls
const missionUrl = "https://api.spacexdata.com/v4/launches/" + id;
const coreUrl = "https://api.spacexdata.com/v4/cores/";
const rocketUrl = "https://api.spacexdata.com/v4/rockets/";
const launchPadUrl = "https://api.spacexdata.com/v4/launchpads/";
const payloadUrl = "https://api.spacexdata.com/v4/payloads/";

async function mission() {
  try {
    // get mission
    const response = await fetch(missionUrl);
    const result = await response.json();
    // get landpad
    const launchPadResponse = await fetch(launchPadUrl + result.launchpad);
    const launchPadResult = await launchPadResponse.json();

    // get rocket
    const rocketResponse = await fetch(rocketUrl + result.rocket);
    const rocketResult = await rocketResponse.json();

    // get payload
    const payloadResponse = await fetch(payloadUrl + result.payloads);
    const payloadResult = await payloadResponse.json();
    console.log(payloadResult);

    // transform date
    const unix = result.date_unix;
    const milisc = unix * 1000;
    const dateObject = new Date(milisc);
    const regularDate = dateObject.toLocaleString();
    missionHeroContainer.innerHTML = "";

    missionHeroContainer.innerHTML += `<div class="card-hero">
                                        <h2> ${result.name} </h2>
                                        <img src="${result.links.patch.small}" alt="Patch of ${result.name}"/>
                                        <p> Where: ${launchPadResult.name} </p>
                                        <p> When : ${regularDate} </p>
                                        <p> Rocket: ${rocketResult.name}</p>
                                        
    
    </div>`;
    const ytId = result.links.youtube_id;
    console.log(ytId);

    missionInfoContainer.innerHTML += ` <div class="about-mission">
                                          <h3> About Mission </h3>
                                          <p>${result.details} </p>
                                          <h5> More information </h5>
                                          <div class="about-mission-links">
                                          
                                            <a class="reddit" href="${result.links.reddit.launch}"><i class="fab fa-reddit-alien"></i>Launch Discussion</a>
                                            
                                            <a class="wiki" href="${result.links.wikipedia}"><i class= "fab fa-wikipedia-w"></i>Wiki Article</a>
                                          </div>
                                        </div>
                                          
                                        <div class="youtube-player"> 
                                        <h3> Feed </h3>
                                        <div class="player-container">
                                        <iframe title ="SpaceX rocket launch" id="ytplayer" type="text/html" width="640" height="360"
                                        src="https://www.youtube.com/embed/${ytId}?autoplay=0&origin=http://example.com"
                                          frameborder="0"></iframe>
                                        </div>
                                        </div>
                                        
    `;

    const flightCores = result.cores[0];
    console.log(flightCores);
    // Check if values are falsy
    if (!flightCores.landing_success) {
      flightCores.landing_success = "No data";
    }
    if (!flightCores.landing_type) {
      flightCores.landing_type = "No data";
    }
    if (!flightCores.fligth) {
      flightCores.fligth = "No data";
    }
    // Clean up data displayed
    if (flightCores.reused === true) {
      flightCores.reused = "Yes";
    } else if (flightCores.reused === false) {
      flightCores.reused = "No";
    }

    if (payloadResult.reused === true) {
      payloadResult.reused = "Yes";
    } else if (payloadResult.reused === false) {
      payloadResult.reused = "No";
    }

    specsContainer.innerHTML += `
    <div class="list-mission-container">
    <div class="list-mission">
    <h3> Cores </h3>
    <ul>
      <li><h5>Flights:</h5> <p>${flightCores.flight}</p> </li>
      <li><h5>Reused:</h5> <p>${flightCores.reused}</p> </li>
      <li><h5>Landing:</h5> <p>${flightCores.landing_success}</p> </li>
      <li><h5>Landing type:</h5> <p>${flightCores.landing_type}</p> </li>

    </ul>
  </div>
  <div class="list-mission">
  <h3> Payloads </h3>
  <ul>
    <li><h5>Name:</h5><p>${payloadResult.name}</p></li>
    <li><h5>Type:</h5><p>${payloadResult.type}</p></li>
    <li><h5>Orbit:</h5><p>${payloadResult.orbit}</p></li>
    <li><h5>Reused:</h5><p>${payloadResult.reused}</p></li>
  </ul>
  </div>
  </div>`;

    console.log(result);
  } catch (error) {
    console.log(error);
    missionInfoContainer.innerHTML = `An error has occured! Please try again later`;
  }
}
mission();
