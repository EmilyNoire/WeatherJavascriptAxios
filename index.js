async function getWeather(city) {
    try {
        const responseFindPlace = await axios.get(`https://www.meteosource.com/api/v1/free/find_places`, {
            params: {
                text: city,
                language: 'en',
                key: 'vymx0yaqe60vh2344e4ua83q46r3xkr2ho739e4c'
            }
        });

        const responseCurrentWeather = await axios.get(`https://www.meteosource.com/api/v1/free/point`, {
            params: {
                place_id: responseFindPlace.data[0].place_id,
                sections: 'current',
                language: 'en',
                units: 'auto',
                key: 'vymx0yaqe60vh2344e4ua83q46r3xkr2ho739e4c'
            }
        });
        document.getElementById('iconCurrentWeather').innerHTML = `<img src="https://www.meteosource.com/static/img/ico/weather/${responseCurrentWeather.data.current.icon_num}.svg" alt="${responseCurrentWeather.data.current.summary} weather">`;
        document.getElementById('currentWeather').textContent = responseCurrentWeather.data.current.summary;
        document.getElementById('currentTemperature').textContent = `${responseCurrentWeather.data.current.temperature}°`;
    } catch (error) {
        document.getElementById('currentWeather').textContent = 'Max call reached for today or wrong city name.'
    };
};

document.getElementById('searchBtn').addEventListener('click', () => {
  getWeather(document.getElementById('cityInput').value)
})

document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('iconCurrentWeather').innerHTML = '';
  document.getElementById('currentWeather').textContent = '';
  document.getElementById('currentTemperature').textContent = '';
  document.getElementById('cityInput').value = '';
});