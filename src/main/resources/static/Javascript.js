let onSwitch = true;

let LghList = document.getElementById("LghList")
let RenterList = document.getElementById("RenterList")

function sendInfoLgh() {
  //Lägger till lägenhet.
  let storlek = document.getElementById("storlek");
  let köket = document.getElementById("dropdown")
  let antalRum = document.getElementById("antal-rum");
  let adress = document.getElementById("adress");
  let lägenhetsnummer = document.getElementById("lägenhetsnummer");
  let hyra = document.getElementById("hyra");
  let li = document.createElement("li");  // Create a <li> node
  if (köket.value === "kök") {
    köket.value = "kök"
  }
  if (köket.value === "kokvrå") {
    köket.value = "kokvrå"
  }
  let sum = document.createTextNode("  Storlek: " + storlek.value + "Köket: " + köket.value + "  Antal-Rum: " + antalRum.value +
    "  Adress: " + adress.value + "  Lägenhetsnummer: " + lägenhetsnummer.value + "  Hyra: " + hyra.value);// Create a text node

  //Ta bort hyresvärdsknapp
  const removeRenter = document.createElement("button")
  removeRenter.innerHTML = "Ta bort hyresgäst"
  removeRenter.setAttribute("onclick","RemoveRenter()")

  //Första inputen
  let input = document.createElement("input")
  input.setAttribute("id", "InputID")

  //Första klar knappen
  const submit = document.createElement("button")
  submit.setAttribute("id", "submitID")
  submit.innerHTML = "Klar";

  //Lägg till renterknapp
  const addRenterButton = document.createElement("button");
  addRenterButton.innerHTML = 'Lägg till hyresgäst'
  addRenterButton.setAttribute("onclick", AddRenter)

  // create a remove button
  const button = document.createElement('button');
  button.innerHTML = 'Delete';
  button.setAttribute("onclick", "RemoveButton()")

  //Ändra renter knapp
  const changeRenter = document.createElement("button")
  changeRenter.innerHTML = "Ändra hyresgäst"
  changeRenter.setAttribute("onclick","ChangeRenter()")

  //Renter toString
  let renter;

  li.appendChild(sum) // Append the text to <li>
  li.appendChild(button) // append the button to <li>
  li.appendChild(addRenterButton) // append the button to <li>
  LghList.appendChild(li) // Append <li> to <ul> with id="myList"

  button.onclick = function () {
    RemoveButton()
  }

  function RemoveButton() {
    li.remove()
    onSwitch = true;
  }

  //Function to add Renter
  addRenterButton.onclick = function () {
    AddRenter()
  }

  function AddRenter() {

    if (onSwitch === true) {
      li.appendChild(input)
      li.appendChild(submit)
      onSwitch = false

    submit.onclick = () => {
      renter = document.createTextNode(input.value)
      addRenterButton.style.display = "none" //hides the addRenterButton
      li.appendChild(renter)
      li.appendChild(changeRenter)
      li.appendChild(removeRenter)
      const removeinput = document.getElementById("InputID")
      const removebutton = document.getElementById("submitID")
      removebutton.remove()
      removeinput.remove()
      onSwitch = true
    }
    }
  }

    changeRenter.onclick = function (){
        ChangeRenter()
    }

    function ChangeRenter(){
      {
        changeRenter.style.display = "none"
        removeRenter.style.display = "none"
        let newinput = document.createElement("input")
        li.appendChild(newinput)
        const changeRenterButton = document.createElement("button")
        changeRenterButton.innerHTML = "Tryck för att ändra"
        li.appendChild(changeRenterButton);
        //Skapa en knapp som ersätter renterchild
        changeRenterButton.onclick = () => {
          removeRenter.style.display = "inline-block"
          let newhost = document.createTextNode(newinput.value);
          li.replaceChild(newhost, renter)
          renter = newhost
          li.replaceChild(renter, newhost)
          changeRenter.style.display = "inline-block"
          newinput.remove()
          changeRenterButton.remove()
        }

      }

    }

    //RemoveRenter Function
    removeRenter.onclick = function(){
      RemoveRenter()
    }
    function RemoveRenter(){
      addRenterButton.style.display = "inline-block"
      renter.remove()
      changeRenter.remove()
      removeRenter.remove()
    }

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




