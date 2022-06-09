/*
* Cesar Ellioth Escoboz Perez
* A Junio 07 del 2022.
*EZ Track Code Test.
*/

//Variables y Constantes
const url = "https://api.giphy.com/v1/gifs/search?";
const api_key = "T8g9QQkwsLC3nmDwk0R2GR7z7E2DTLc2";
var urlDeBusqueda = url + "api_key=" + api_key + "&q=";
var URLactual = window.location;

//Obtenemos el parametro de busqueda definido en nuestro input
function getInput() {
	var formInput = URLactual.search.split("=");
	return formInput[1];
}

//Definimos nuestro GET con una Promise
function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send();
  });
}

//Si la funcion devuelve indefinido, vaciamos el URL de busqueda
if (getInput() == undefined) {
	urlDeBusqueda = null;
} else {
	urlDeBusqueda = urlDeBusqueda + getInput();	
}

//Si la funcion no esta vacia, hace una consulta al API de Giphy
if (urlDeBusqueda != null) {
	get(urlDeBusqueda).then(function(response) {
		var obj = JSON.parse(response);
		var wordsSearched = document.getElementById("searched");
		var text = getInput().replaceAll("+", " ");
		wordsSearched.innerHTML = text;
		for (var i = 0; i < obj.data.length; i++) {
			var image = obj.data[i].images["preview_gif"].url;
			var caption = document.createElement("div");
			caption.innerHTML = obj.data[i].title;
			var link = document.createElement("a");
			link.href = obj.data[i].url;
			link.target = "_blank"
			var newElement = document.createElement("div");
			newElement.className = "img";
			var newImage = document.createElement("img");
			newImage.src = image;
			link.appendChild(newElement);
			newElement.appendChild(newImage);
			newElement.appendChild(caption);
			document.getElementById("imgs").appendChild(link);
		}
	}, function(error) {
		console.error("Failed!", error);
	})
}