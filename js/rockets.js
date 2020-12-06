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
