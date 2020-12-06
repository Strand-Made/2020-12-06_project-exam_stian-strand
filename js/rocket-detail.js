const queryString = document.location.search;
const rparams = new URLSearchParams(queryString);

const id = rparams.get("id");

const rocketContainer = document.querySelector(".rocket-description");
const specsContainer = document.querySelector(".rocket-specs");
const imageContainer = document.querySelector(".rocket-thumbnails");
const rocketUrl = "https://api.spacexdata.com/v4/rockets/" + id;
if (id === null) {
  document.location.href = "index.html";
}
async function getRockets() {
  try {
    const response = await fetch(rocketUrl);
    const result = await response.json();
    console.log(result);
    // If there is no data
    if (!rocketContainer) {
      rocketContainer = `<div class="rocket-info"> <h4> Rocket Details </h4>
                         <p> Sorry, there is not any further details on this topic</p>
                         `;
      return;
    }
    // create rocket description
    rocketContainer.innerHTML += `  
                                  <div class="rocket-info-image"><img src="${result.flickr_images[0]}" alt="${result.name}" /> </div>
                                    <div class="rocket-info">
                                        <h1>${result.name}</h1>
                                        <div class="rocket-info-text">
                                        <h3>About Rocket</h3>
                                        <p>${result.description}</p>
                                        </div>
                                    </div>
                                    
                                    
        
        `;

    // Create thumbnails

    imageContainer.innerHTML += ` <div class ="rocket-thumbnails-images">
                                      <a target="_blank" href="${result.flickr_images[1]}"><img id="gallery-img" src="${result.flickr_images[1]}" alt="Gallery image of ${result.name}"/></a>
                                      <a target="_blank" href="${result.flickr_images[2]}"><img id="gallery-img" src="${result.flickr_images[2]}" alt="Gallery image of ${result.name}"/></a>
                                      <a target="_blank" href="${result.flickr_images[3]}"><img id="gallery-img" src="${result.flickr_images[3]}" alt="Gallery image of ${result.name}"/></a>
                                      </div>

        `;
    // Create Rocket specs
    specsContainer.innerHTML += `
                                    <div class= "about-rocket">
                              
                                        <div class="list-rocket">
                                        <h3> Height, Mass And Diameters </h3>
                                        <ul>
                                            <li><h5>Height:</h5><p>${result.height.meters} Meters</p> </li>
                                            <li><h5>Mass:</h5><p>${result.mass.kg} Kgs</p></li>
                                            <li><h5>Diameter:</h5><p>${result.diameter.meters} meters</p></li>
                                            <li><h5>Payloads:</h5><p>${result.payload_weights.length}</p></li>
                                        </ul>
                                            
                                        </div>
                                        <div class="list-rocket">
                                        <h3> Engines </h3>
                                          <ul>
                                            <li><h5>Layout:</h5><p>${result.engines.layout}</p> </li>
                                             <li><h5>Propellants:</h5><p>${result.engines.propellant_1}, ${result.engines.propellant_2}</p></li>
                                            <li><h5>Type:</h5><p>${result.engines.type}</p> </li>
                                            <li><h5>Version:</h5><p>${result.engines.version}</p> </li>
                                          </ul>
                                      </div>

                                        </div>
                      
        
        `;
  } catch (error) {
    console.log(error);
  }
}
getRockets();
