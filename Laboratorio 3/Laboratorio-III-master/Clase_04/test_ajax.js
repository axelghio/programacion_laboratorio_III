function test() {
    var request = new XMLHttpRequest();
    request.open("GET", "Backend/test.php", true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.responseText);
        }
    };
}
window.onload = function () { test(); };
function test_params() {
    var request = new XMLHttpRequest();
    request.open("GET", "Backend/test_params.php?nombre=" + document.getElementById("paramTxt").value, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.responseText);
        }
    };
}
