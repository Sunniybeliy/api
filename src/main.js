import './style.css'

let sovol = null
await load()

async function load() {
  
  const response = await fetch ( "http://localhost:3000/questions")

  if( response.ok ){
      sovol = await response.json()
  }
}

console.log( sovol )

const box = document.getElementById("BOX")
const button = document.getElementById("tugadi")
const ul = document.querySelectorAll(".ul")

for( const s of sovol){
  const li = document.createElement("li")
  const h1 = document.createElement("h1")
  const divP = document.createElement("div")

  console.log(s.id)

  for ( let i = 0; i < s.options.length; i++){

    console.log(s.options)

    const o = s.options[ i ]
    const divCH = document.createElement("div")
    const input = document.createElement("input")
    const label =document.createElement("label")
    input.setAttribute( "type", "radio" )
    input.setAttribute( "name", `s${s.id}` )
    input.setAttribute( "id", `s${s.id}_${i}` )

    label.setAttribute( "for", input.id )
    label.textContent = o.answer

    divCH.appendChild( input )
    divCH.appendChild ( label )
    divP.appendChild( divCH )
   }

  h1.textContent = s.question

  li.appendChild( h1)
  li.appendChild( divP )
  box.appendChild( li )
}

button.onclick = async() => {
  const inputs = document.querySelectorAll( "ul input:checked" )
  const nOfQuestions = sovol.length

  let rightAnswers = 0

  const userData = []

  for( const input of inputs ){

    const [ qID,o ] = input.id.substr(1).split("_").map(n => n-0 )
    
    userData.push( [ qID, o ] )
    
  }

  const response = await fetch( "http://localhost:3000/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( userData )
  })

  const result = await response.json()

  const score = 100 * result.countOfRightAnswers / nOfQuestions

  console.info( `${score}%`)
}
