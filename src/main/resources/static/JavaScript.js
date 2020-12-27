function array1(){
    let arr1 = [];
    let valElements = document.getElementsByClassName("vals");
    let tempstr = "";
    /* retrieve the input from textbox
       and store in an array
    */
    for(i=0; i<valElements.length; i++){
        arr1[i] = valElements[i].value;
        tempstr = tempstr+arr1[i] + " ";
    }

    /* use the input on your page */
    let a = document.getElementById("temp1");
    a.innerHTML = tempstr;
}

function array2(){
    let arr2 = [];
    let valElements = document.getElementsByClassName("vals");
    let tempstr = "";
    /* retrieve the input from textbox
       and store in an array
    */
    for(i=0; i<valElements.length; i++){
        arr2[i] = valElements[i].value;
        tempstr = tempstr+arr2[i] + " ";
    }

    /* use the input on your page */
    let a = document.getElementById("temp2");
    a.innerHTML = tempstr;
}