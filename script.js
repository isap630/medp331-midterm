const planetGallery = [
    {
        image_location: "images/sun.png",
        planet_name: "Sun"
    },
    {
        image_location: "images/mercury.png",
        planet_name: "Mercury"
    },
    {
        image_location: "images/venus.png",
        planet_name: "Venus"
    },
    {
        image_location: "images/earth.png",
        planet_name: "Earth"
    },
    {
        image_location: "images/mars.png",
        planet_name: "Mars"
    },
    {
        image_location: "images/jupiter.png",
        planet_name: "Jupiter"
    },
    {
        image_location: "images/saturn.png",
        planet_name: "Saturn"
    },
    {
        image_location: "images/uranus.png",
        planet_name: "Uranus"
    },
    {
        image_location: "images/neptune.png",
        planet_name: "Neptune"
    },
    {
        image_location: "images/pluto.png",
        planet_name: "Pluto"
    },
]

//const space = document.querySelector(".space")

//document.addEventListener("DOMContentLoaded", (event) => {
//   for(let i = 0; i < 50; i++){
//       var star_background = document.createElement("span");
//      star_background.innerHTML = '✨';
//       star_background.style.top = getRndInteger(0, space.clientHeight) + "px";
//     star_background.style.left = getRndInteger(0, space.clientWidth) + "px";
 //       space.appendChild(star_background)

 //   }
//})

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const start_button = document.querySelector(".start-button");
start_button.addEventListener("click", startExperience);

//starts music and clears intro screen after clicking start
function startExperience(){
    const background_audio = document.querySelector(".music");
    background_audio.play();


    var intro_planets = document.querySelector(".menu-planets");
    var intro_menu = document.querySelector(".menu-page");

    setTimeout(clearPlanets, 1001);
    setTimeout(clearMenu, 1001);

    intro_planets.style.transition = "opacity 1s ease-in";
    intro_menu.style.transition = "opacity 1s ease-in";

    intro_planets.style.opacity = 0;
    intro_menu.style.opacity = 0;

    function clearPlanets(){
        clear(intro_planets);
    }
    
    function clearMenu(){
        clear(intro_menu);
    }

    setTimeout(openPlanetGallery(0), 1025)

}

//clears element
function clear(x){
    x.remove();
}

//clears element content
function clear2(y){
    y.innerHTML = '';
}

let planet_position = 0;

var container = document.querySelector(".container")
var planet_title = document.querySelector(".planet-name")

var planet_information = document.querySelector(".planet-info");

//opens the gallery 
function openPlanetGallery(i){
    container.style.display = "flex";
    planet_title.style.display = "flex";
    console.log("open gallery")

    addImageToGallery(i);
    addNameToGallery(i);

    let left_button = document.querySelector(".left-btn");
    let right_button = document.querySelector(".right-btn");

    left_button.addEventListener("click", previousImage)
    right_button.addEventListener("click", nextImage)

}

var focusPlanet = document.querySelector(".focus-planet");
var focusPlanetName = document.querySelector(".planet-name");

//replaces the image in the gallery based on the gallery position
function addImageToGallery(i){
    //replaces image
    clear2(focusPlanet);
    
    let planet_img = document.createElement("img");
    planet_img.src = planetGallery[i].image_location
    focusPlanet.appendChild(planet_img);

}

function addNameToGallery(i){
    //replaces name
    clear2(focusPlanetName);

    let planet_name_h1 = document.createElement("h2");
    planet_name_h1.innerHTML = planetGallery[i].planet_name;
    focusPlanetName.appendChild(planet_name_h1);
}

//adds to planet_position to then apply it to addImageToGallery and replace it
function nextImage(){
    const sparkle = document.querySelector(".sparkle");
    sparkle.play();
    let current_planet = focusPlanet.getElementsByTagName("img")[0];
    let current_name = focusPlanetName.getElementsByTagName("h2")[0];
    gsap.to(current_planet,{
        x: -1000, 
        duration: 3,
        //used chatGPT to help figure out how to only change the planet position when animation was complete
        onComplete: function (){
            planet_position++
            if (planet_position >= planetGallery.length){
                planet_position = 0;
            }
            addImageToGallery(planet_position)
            let next_planet = focusPlanet.getElementsByTagName("img")[0];
            gsap.from(next_planet,{
                x: 1000,
                duration: 2.75
            });
        }
    })
    var slide_name = gsap.to(current_name,{
        x: -1000, 
        duration: 3,
        onComplete: function (){
            addNameToGallery(planet_position);
            let next_planet_name = focusPlanetName.getElementsByTagName("h2")[0];
            gsap.from(next_planet_name,{
                x: 750,
                duration: 2.75
            });
        }
    })
    slide_name.delay(0.05);


}

//subracts from planet_position to then apply it to addImageToGallery and replace it
function previousImage(){
    const sparkle = document.querySelector(".sparkle");
    sparkle.play();

    let current_planet = focusPlanet.getElementsByTagName("img")[0];
    let current_name = focusPlanetName.getElementsByTagName("h2")[0];
    gsap.to(current_planet,{
        x: 1000, 
        duration: 3,
        onComplete: function (){
            planet_position--
            if (planet_position < 0) {
                planet_position = planetGallery.length - 1;
            }
            addImageToGallery(planet_position)
            addNameToGallery(planet_position);
            let next_planet = focusPlanet.getElementsByTagName("img")[0];
            gsap.from(next_planet,{
                x: -1000,
                duration: 2.75
            });
        }
    })
    gsap.to(current_name,{
        x: 1000, 
        duration: 3,
        onComplete: function (){
            addNameToGallery(planet_position);
            let previous_planet_name = focusPlanetName.getElementsByTagName("h2")[0];
            gsap.from(previous_planet_name,{
                x: -750,
                duration: 2.75
            });
        }
    })
}

focusPlanet.addEventListener("click", openInfo)
focusPlanet.addEventListener("mouseover", planetAnimation)

var planet_header = document.querySelector(".planet-header");
var planet_content_div = document.querySelector(".planet-content");

//Opens info page
function openInfo(){
    container.style.display = "none";
    planet_title.style.display = "none";

    //adds h2 of the planet name
    var planet_info_name = document.createElement("h2");
    planet_info_name.innerHTML = planetGallery[planet_position].planet_name;
    planet_header.appendChild(planet_info_name);

    //adds the image and paragraph to information page
    var planet_paragraph = document.createElement("p");
    var planet_info_img = document.createElement("img");

    if (planet_position == 0){
        planet_paragraph.innerHTML = 'The sun is the center point of which all planets revolve. It radiates its warmth and light to all the other planets.  Without it, life on Earth would not exist. And all the other planets would be lost with nothing to be connected to and nurture them! Although the sun won\'t be around forever. In about 5 billion years it\'ll become a Red giant and reach its end of its life. I wish it could live forever! ';
    }
    else if (planet_position == 1){
        planet_paragraph.innerHTML = 'Since they are the closest to our Sun, Mercury zooms around and completes their revolution in only 88 days. Wow! That\'s a really short year. No wonder the other planets made them their messenger. Mercury can quickly share information and news between all the planets. Gotta be quick or you might miss them';
    }
    else if (planet_position == 2){
        planet_paragraph.innerHTML = 'You would think since Mercury is the closest to the Sun they would be the hottest. But nope! That title goes to Ms. Venus! Her atmosphere traps in carbon dioxide that cause the greenhouse effect and increases the temperature. She also loves to standing out. She shines so brightly and beautifully down on Earth that she can even outshine the stars! How lovely <3';
    }
    else if (planet_position == 3){
        planet_paragraph.innerHTML = 'Our beautiful globe we call home. It\'s the only known planet the that is able to sustain life. It\'s surface mostly covered in water, but as we know it also contains beautiful, fruitful land, thanks the Sun and the perfect conditions. We should always take care of her. She also has a little moon friend who controls its tides'
    }
    else if (planet_position == 4){
        planet_paragraph.innerHTML = 'Mars is one of Earth\'s neighbors and one of the planets we know the most about! It\'s red, rocky, very dusty, not to mention very dry. Many think that it was once habitable and is the most similar to Earth along with Venus. Some people even talk about colonizing it. Maybe one day we are able to explore its fierce deserts.'
    }
    else if (planet_position == 5){
        planet_paragraph.innerHTML = 'Jupiter is the largest planet in our system. This giant is mostly made of hydrogen and helium! It\'s one of the oldest planets and was likely formed from the left over gas from when the sun was created, about 4.6 billion years ago. With the knowledge and wisdom that Jupiter has to share, one is bound to grow!'
    }
    else if (planet_position == 6){
        planet_paragraph.innerHTML = 'Saturn looks so unique with its dusty and icy rings. It has a total of 146 moons! So many little friends for Saturn. No wonder they keep mostly to their little (actually quite big) world. They have so many layers to protect them from the world'
    }
    else if (planet_position == 7){
        planet_paragraph.innerHTML = 'You could say Uranus is a little different from the rest. They rotate on almost a 90 degree angle. How oddly cool. Speaking of cool, it\'s also the coldest, reaching about -224 degrees Celsius. Brrrr!!! Someone give Uranus a jacket!'
    }
    else if (planet_position == 8){
        planet_paragraph.innerHTML = 'The final planet in our solar system! He\'s so far out that it takes him 165 Earth years to complete its complete orbit. You\'d have to be very patient to live on Neptune. And also probably try not to be blown away as its wind can reach up to 1500 miles per hour.'
    }
    else if (planet_position == 9){
        planet_paragraph.innerHTML = 'This lil ol guy was once considered a planet a part of our solar system until 2006, when the International Astronomical Union reclassified it as a dwarf planet. Most of the time he sits the farthest away out of all our planets. Despite being outcasted, Pluto continues to go on in his oddly shaped oval orbit, trying his best and hoping to join the other planets once more. Every 248 years he gets close enough to get near Neptune\'s orbit, but he always seems to drift away! Poor pluto, he just wants to be included. It must be lonely out there :('
    }
    planet_content_div.appendChild(planet_paragraph);

    planet_info_img.src = planetGallery[planet_position].image_location;
    planet_content_div.appendChild(planet_info_img);


    planet_information.style.display = "block";

    var back_button = document.getElementById("back")
    console.log(back_button);
    back_button.addEventListener("click", exitInfo)
}

function exitInfo(){
    openPlanetGallery(planet_position);
    planet_header.innerHTML = "";
    planet_content_div.innerHTML = "";
    planet_information.style.display = "none";

}

function planetAnimation(){

}
