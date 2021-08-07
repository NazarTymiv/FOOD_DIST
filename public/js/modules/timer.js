const timer = (deadline) => {
    const getDataForTimer = (deadline) => {
        const time = Date.parse(deadline) - Date.parse(new Date()),
              days = Math.floor(time / (1000 * 60 * 60 * 24)),
              hours = Math.floor(time / (1000 * 60 * 60) % 24),
              minutes = Math.floor((time / 1000 / 60) % 60),
              seconds = Math.floor((time / 1000) % 60)

        return {
            total: time,
            days,
            hours,
            minutes,
            seconds
        }
    }

    const getzero = (num) => {
        return num >= 0 && num < 10 ? `0${num}` : num
    }

    const setClock = (deadline) => {
        const days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000)

        updateClock()

        function updateClock() {
            const time = getDataForTimer(deadline)

            days.innerHTML = getzero(time.days)
            hours.innerHTML = getzero(time.hours)
            minutes.innerHTML = getzero(time.minutes)
            seconds.innerHTML = getzero(time.seconds)

            if(timeInterval <= 0) clearInterval(updateClock, 1000)
        }
    }

    setClock(deadline)
}

export default timer