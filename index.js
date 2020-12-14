// document.getElementById("submit").addEventListener("submit", function () {
//         submit();
        
// });

submit();

//on button click
function submit(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://davy-api.herokuapp.com/predict";

    let _data = { 
        'area': parseInt(document.getElementById("area").value),
        'property-type': document.getElementById("property-type").value,
        'rooms-number': parseInt(document.getElementById("rooms-number").value),
        'zip-code': parseInt(document.getElementById("zip-code").value),
        
        'garden': Boolean(document.getElementsByName("garden").value),
        'equipped-kitchen': Boolean(document.getElementsByName("equipped-kitchen").value),
        'furnished': Boolean(document.getElementsByName("furnished").value),
        'terrace': Boolean(document.getElementsByName("terrace").value),
        'facades-number': parseInt(document.getElementById("facades-number").value),
    }

    fetch(proxyurl+url, {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(_data)
        }) 
        .then(response => response.json())
        .then((json) => {
            createBox(json);
        })
        .catch((error) => console.log(error));       
}

// //function create box with results
function createBox(json){
    document.getElementById("price").innerHTML = `The predicted price is €${json["Predicted_price"] }`;
}