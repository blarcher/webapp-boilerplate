window.onload = chooseCat;

var catArray = new Array("../images/kitten.jpg","../images/imgres.jpg","../images/maxresdefault.jpg", '../images/bowtie.jpeg');

function chooseCat() {
     var randomNum = Math.floor(Math.random() * catArray.length);
     document.getElementById("myPicture").src = catArray[randomNum];
}
