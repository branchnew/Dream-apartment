let onSwitch = true;
let LghList = document.getElementById("LghList")
let RenterList = document.getElementById("RenterList")

function sendInfoLgh(){
  let storlek = document.getElementById("storlek");
  let köket = document.getElementById("dropdown")
  let antalRum = document.getElementById("antal-rum");
  let adress = document.getElementById("adress");
  let lägenhetsnummer = document.getElementById("lägenhetsnummer");
  let hyra = document.getElementById("hyra");
  let li = document.createElement("li");  // Create a <li> node

  if (köket.value === "kök"){
    köket.value = "kök"
  }
  if (köket.value === "kokvrå"){
    köket.value = "kokvrå"
  }
  let sum = document.createTextNode("  Storlek: "+ storlek.value + "Köket: " + köket.value + "  Antal-Rum: " + antalRum.value +
    "  Adress: "+ adress.value + "  Lägenhetsnummer: " + lägenhetsnummer.value +"  Hyra: " + hyra.value) ;// Create a text node

  const button = document.createElement('button'); // create a remove button
  button.innerHTML = 'Delete';
  button.onclick = () =>{  //Function that removes a li
    li.remove()
  }
  const addRenterButton = document.createElement("button");
  addRenterButton.innerHTML = 'Lägg till hyresgäst'

  //Function to add Renter
  addRenterButton.onclick = () => {
    let input = document.createElement("input")
    input.setAttribute("id","InputID")
    const submit = document.createElement("button")
    submit.setAttribute("id","submitID")
    submit.innerHTML = "Klar";
    if (onSwitch === true){
    li.appendChild(input)
    li.appendChild(submit)
    onSwitch = false
    }
    submit.onclick = () => {
        addRenterButton.style.display = "none" //hides the addRenterButton
        let renter = document.createTextNode(input.value);
        li.appendChild(renter);

      const changeRenter = document.createElement("button")
      changeRenter.innerHTML = "Ändra hyresgäst"
        li.appendChild(changeRenter)

      //Skapa en knapp som ersätter renterchild
      changeRenter.onclick = () => {
        changeRenter.style.display = "none"
        let newinput = document.createElement("input")
        li.appendChild(newinput)
        const changeRenterButton = document.createElement("button")
        changeRenterButton.innerHTML = "Tryck för att ändra"
        li.appendChild(changeRenterButton);
        changeRenterButton.onclick = () => {
          let newhost = document.createTextNode(newinput.value);
          li.replaceChild(newhost,renter)
          renter = newhost
          li.replaceChild(renter,newhost)
          changeRenter.style.display = "inline-block"
          newinput.remove()
          changeRenterButton.remove()
        }


      }

      const removeinput = document.getElementById("InputID")
      const removebutton = document.getElementById("submitID")
      removebutton.remove()
      removeinput.remove()
      onSwitch = true
    }

  }
  li.appendChild(sum) // Append the text to <li>
  li.appendChild(button) // append the button to <li>
  li.appendChild(addRenterButton) // append the button to <li>
  LghList.appendChild(li) // Append <li> to <ul> with id="myList"

}

function sendInfoRenter(){
  let namn = document.getElementById("namn");
  let personnummer = document.getElementById("personnummer");
  let telefonnummer = document.getElementById("telefonnummer");
  let Email = document.getElementById("e-mail");
  let faktueringsadress = document.getElementById("faktureringsadress");
  let li = document.createElement("li");  // Create a <li> node
  li.setAttribute("id","liID")
  let sum = document.createTextNode(" Namn: " + namn.value +"  Personnummer: " +  personnummer.value +
   "  Telefonnummer: "+ telefonnummer.value + "  E-mail: "+ Email.value + "  Faktueringsadress: " + faktueringsadress.value)
  ;// Create a text node

  const button = document.createElement('button'); // create a remove button
  button.innerHTML = 'Ta Bort';

  //Function that removes a li
  button.onclick = () =>{
    li.remove()
  }

  li.appendChild(sum) // Append the text to <li>
  li.appendChild(button) // append the button to <li>
  RenterList.appendChild(li) // Append <li> to <ul> with id="myList"
}




