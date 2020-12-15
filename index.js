//Bootstrap function to validate form empty inputs
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) { //if empty fields - no calculation, but still popup..
            event.preventDefault(); 
            event.stopPropagation();
          } else{
              event.preventDefault(); //prevents refresh
              $('#exampleModalCenter').modal() //reveal modal(popup)
              submit();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

//on button click
function submit(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; //to prevent CORS error
    const url = "https://davy-api.herokuapp.com/predict";

    let _data = { 
        'area': parseInt(document.getElementById("area").value),
        'property-type': document.getElementById("property-type").value,
        'rooms-number': parseInt(document.getElementById("rooms-number").value),
        'zip-code': parseInt(document.getElementById("zip-code").value),

        'garden': Boolean(document.getElementsByName("garden")[0].checked),
        'equipped-kitchen': Boolean(document.getElementsByName("equipped-kitchen")[0].checked),
        'furnished': Boolean(document.getElementsByName("furnished")[0].checked),
        'terrace': Boolean(document.getElementsByName("terrace")[0].checked),
        'facades-number': parseInt(document.getElementById("facades-number").value),
    }
    console.log(_data);
    fetch(proxyurl+url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(_data) //data must be in JSON format
        }) 
        .then(response => response.json())
        .then((json) => {
            createBox(json);
        })
        .catch((error) => {
            console.log(error);
            createErrorBox();
        });       
}

//function create box with results
function createBox(json){
    if (json.Predicted_price == undefined){
        document.getElementById("price").innerHTML = `User input is not correct, please try again`;
    } else {
        document.getElementById("price").innerHTML = `€ ${json.Predicted_price}`;
    }
}

//function create box with error
function createErrorBox(){
        document.getElementById("price").innerHTML = `We encountered a server error, please try again`;
}

