// JS dynamic language change
var form = document.querySelector('form');
var body = document.querySelector('body');
const language = localStorage.getItem('language');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.querySelector('#username').value;
    if (username == "") {
        const labelText = languages[language]['labelText'];
        alert(labelText);
        return;
    }

    var url = "https://devlevel-server.onrender.com/api";
    var data = { 'username': username };
    var repo_url = "https://github.com/" + username;

    body.classList.add('show-loading');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        body.classList.remove('show-loading');

        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.querySelector('#results').innerHTML =
                "<p>" + response['languages'] + "</p>" +
                "<p>" + response['contributions'] + "</p>" +
                "<p>" + response['years_active'] + "</p>" +
                "<p> See Profile: <a href='" + repo_url + "'>" + repo_url + "</a></p>";
        } else {
            var error = JSON.parse(xhr.responseText).error;
            document.querySelector('#results').innerHTML = "<p>Oops, " + error + "</p>";
        }
    };

    xhr.send(JSON.stringify(data));

});