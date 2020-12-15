document.getElementById("submit").addEventListener("click", function (event) {
        submit();
        event.preventDefault();      
});

//on button click
function submit(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://davy-api.herokuapp.com/predict";

    let _data = { 
        'area': parseInt(document.getElementById("area").value),
        'property-type': document.getElementById("property-type").value,
        'rooms-number': parseInt(document.getElementById("rooms-number").value),
        'zip-code': parseInt(document.getElementById("zip-code").value),
        //if statement because not mandatory
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
    document.getElementById("price").innerHTML = `€ ${json.Predicted_price}`;
}
