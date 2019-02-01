window.addEventListener('load', () => {

    //  getting the DOM elements in variables
    let location = document.querySelector('.location');
    let temp = document.querySelector('.temp');
    let celFar = document.querySelector('.celFar');
    let description = document.querySelector('.description');
    let tempInfo = document.querySelector('.tempInfo');

    //  longitute and latitude variables for geolocation
    let long;
    let lat;

    //  getting the current location with geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/a0f3783b5c59661b864745bd23b8d56f/${lat}, ${long}`;

            //  fetching the data from the API and turning it into JSON
            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);

                //  creting a shorthand variable to lessen the repetitive typing
                const { temperature, summary, icon } = data.currently;

                //  setting the data to the DOM elements
                location.textContent = data.timezone;
                temp.textContent = Math.floor(temperature);
                description.textContent = summary;

                //  invoking the function for setting the icon
                setIcon(icon, document.querySelector('.icon'));

                //  to toggle between Celsious and Fahrenheit on click
                let celsious = (temperature - 32) * 5 / 9;

                tempInfo.addEventListener('click', () => {
                    if (celFar.textContent === 'C') {
                        celFar.textContent = 'F';
                        temp.textContent = Math.floor(temperature);
                    }
                    else {
                        celFar.textContent = 'C';
                        temp.textContent = Math.floor(celsious);
                    }
                });

            });
        });
    }

    //  function for setting the icon
    function setIcon(icon, iconId) {
        const skycons = new Skycons({ color: '#fff'});
        //  replacing the - which is in the data with _ which is needed for skycons icons
        //  and turning it to uppercase
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();

        //  initiating the icon animation
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

});