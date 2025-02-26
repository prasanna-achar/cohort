const secondStick = document.querySelector('.hand.second')
const minuteStick = document.querySelector('.hand.minute')
const hourStick = document.querySelector('.hand.hour')
const digitalClock = document.querySelector('.digital-clock')
const analogClock = document.querySelector('.clock')
const dateSection = document.querySelector('.date')

for(let i = 1; i <= 12; i++){
  const number = document.createElement('div');
  number.className = 'number'
  number.style.setProperty('--rotation',`${i*30}deg`)
  number.innerHTML = `<span>${i}</span>`
  analogClock.appendChild(number)

}

function updateClock(){
  const now = new Date();
  const second = now.getSeconds()
  const minute = now.getMinutes()
  const hour = now.getHours()

  const secondDeg = (second / 60) * 360;
  const minuteDeg = ((minute + (second / 60)) / 60) * 360
  const hourDeg = (((hour % 12) + minute / 60) / 12) * 360

  secondStick.style.transform = `rotate(${secondDeg}deg)`
  minuteStick.style.transform = `rotate(${minuteDeg}deg)`
  hourStick.style.transform = `rotate(${hourDeg}deg)`

  digitalClock.textContent = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`
  dateSection.textContent = now.toLocaleDateString(undefined, {
    weekday:"long",
    year: "numeric",
    month : 'long',
    day:'2-digit',
  })

  function padZero(num){
    return num.toString().padStart(2, '0')
  }
}
updateClock()

setInterval(updateClock, 1000)