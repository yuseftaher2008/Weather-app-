const tempEl = document.querySelector('.temp')
const dayEl = document.querySelector('.day')
const dateEl = document.querySelector('.date')
const locationEl = document.querySelector('.location span')
const statusEl = document.querySelector('.status')
const weatherIconEl = document.querySelector('.weather-icon')
const humidityEl = document.querySelectorAll('.info .box')[0].querySelector('.value')
const windEl = document.querySelectorAll('.info .box')[1].querySelector('.value')

// Function to get current day and date
function updateDate() {
    const now = new Date()
    const options = { weekday: 'long', month: 'short', day: 'numeric' }
    dayEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long' })
    dateEl.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function weather() {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=c6429676625a44e9970120030262101&q=Cairo`
        )

        if (!response.ok) throw new Error('Failed to fetch weather')

        const data = await response.json()

        
        tempEl.textContent = Math.round(data.current.temp_c) + '°'
        locationEl.textContent = `📍 ${data.location.name}, ${data.location.country}`
        statusEl.textContent = data.current.condition.text
        weatherIconEl.src = data.current.condition.icon  
        humidityEl.textContent = data.current.humidity + '%'
        windEl.textContent = data.current.wind_kph + ' km/h'



    } catch (error) {
        console.error(error)
        tempEl.textContent = 'Error'
        statusEl.textContent = ''
        locationEl.textContent = ''
    }
}


updateDate()
weather()


