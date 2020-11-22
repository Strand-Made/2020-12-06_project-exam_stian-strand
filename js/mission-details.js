const queryString = document.location.search;
const rparams = new URLSearchParams(queryString);

const id = rparams.get("id");

const missionHeroContainer = document.querySelector(".mission-hero");
const missionInfoContainer = document.querySelector(".mission-info");

const url = "https://api.spacexdata.com/v4/launches/" + id;

async function mission() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const unix = result.date_unix;
    const milisc = unix * 1000;
    const dateObject = new Date(milisc);
    const regularDate = dateObject.toLocaleString();

    missionHeroContainer.innerHTML += `<div class="card hero">
                                        <h2> ${result.name} </h2>
                                        <p> Where: ${result.launchpad} </p>
                                        <p> When : ${regularDate} </p>
                                        
    
    </div>`;
    const ytId = result.links.youtube_id;
    console.log(ytId);

    missionInfoContainer.innerHTML += ` <div class="about-mission">
                                        <h3> About Mission </h3>
                                        <p>${result.details} </p>
                                        </div>

                                        <div class="youtube-player"> 
                                        <h3> Feed </h3>
                                        <iframe id="ytplayer" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/${ytId}?autoplay=1&origin=http://example.com"
  frameborder="0"></iframe>
                                        </div>
    `;

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
mission();
