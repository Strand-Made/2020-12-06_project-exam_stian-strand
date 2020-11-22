const queryString = document.location.search;
const rparams = new URLSearchParams(queryString);

const id = rparams.get("id");

const rocketContainer = document.querySelector(".rocket-description");
const specsContainer = document.querySelector(".rocket-specs");
const rocketUrl = "https://api.spacexdata.com/v4/rockets/" + id;
async function getRockets() {
  try {
    const response = await fetch(rocketUrl);
    const result = await response.json();
    console.log(result);

    rocketContainer.innerHTML += `  <img src="${result.flickr_images[0]} alt="${result.name}" />;
                                    <div class="rocket-info">
                                        <h2>${result.name}</h2>
                                        <div class="rocket-info-text">
                                        <p>${result.description}</p>
                                        </div>
                                    </div>
                                    
                                    
        
        `;

    specsContainer.innerHTML += `
                                    <div class= "about-rocket">
                                    <h3> Height, Mass And Diameters </h3>
                                        <div class="list-rocket">
                                            
                                            <p> Height:</p> <p>${result.height.meters} </p>
                                            <p> Mass: <p>${result.mass.kg} Kgs</p>
                                            <p> Diameter: <p>${result.diameter.meters} meters </p>
                                            
                                        </div>
                                    <h3> Engines </h3>
                                        <div class="list-rocket">
                                        <p> Layout:</p> <p>${result.engines.layout} </p>
                                            <p> Propellants: </p> <p>${result.engines.propellant_1}, ${result.engines.propellant_2} </p>
                                            <p> Type: </p> <p>${result.engines.type} </p>
                                            <p> Version: </p> <p>${result.engines.version} </p>

                                        </div>
                      
        
        `;
  } catch (error) {
    console.log(error);
  }
}
getRockets();
