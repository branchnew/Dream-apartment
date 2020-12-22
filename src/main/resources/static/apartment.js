
var LghList = document.getElementById("LghList")
var RenterList = document.getElementById("RenterList")

function sendInfoLgh(){
  var storlek = document.getElementById("storlek");
  var antalRum = document.getElementById("antal-rum");
  var adress = document.getElementById("adress");
  var lägenhetsnummer = document.getElementById("lägenhetsnummer");
  var hyra = document.getElementById("hyra");

  var li = document.createElement("li");  // Create a <li> node
  var sum = document.createTextNode("  Storlek: "+ storlek.value +"  Antal-Rum " + antalRum.value +
    "  Adress "+ adress.value + "  Lägenhetsnummer " + lägenhetsnummer.value +"  Hyra: " + hyra.value) ;// Create a text node

  const button = document.createElement('button'); // create a remove button
  button.innerHTML = 'Delete';
  button.onclick = () =>{  //Function that removes a li
    li.remove()

  }
  li.appendChild(sum) // Append the text to <li>
  li.appendChild(button) // append the button to <li>
  LghList.appendChild(li) // Append <li> to <ul> with id="myList"

}

function sendInfoRenter(){
  var namn = document.getElementById("namn");
  var personnummer = document.getElementById("personnummer");
  var telefonnummer = document.getElementById("telefonnummer");
  var Email = document.getElementById("e-mail");
  var faktueringsadress = document.getElementById("faktureringsadress");

  var li = document.createElement("li");  // Create a <li> node
  li.setAttribute("id","liID")
  var sum = document.createTextNode(" Namn: " + namn.value +"  Personnummer: " +  personnummer.value +
   "  Telefonnummer: "+ telefonnummer.value + "  E-mail: "+ Email.value + "  Faktueringsadress: " + faktueringsadress.value)
  ;// Create a text node

  const button = document.createElement('button'); // create a remove button
  button.innerHTML = 'Delete';
  button.onclick = () =>{  //Function that removes a li
    li.remove()
  }

  li.appendChild(sum) // Append the text to <li>
  li.appendChild(button) // append the button to <li>
  RenterList.appendChild(li) // Append <li> to <ul> with id="myList"
}




