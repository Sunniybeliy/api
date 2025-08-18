const divCH = document.createElement("div")
const divP = document.createElement("div")

const inpu = document.createElement("input")
inpu.setAttribute( "type", "radio")

divCH.appendChild(inpu)
divP.appendChild(divCH)
console.log( divP )