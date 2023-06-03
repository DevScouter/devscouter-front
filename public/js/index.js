// JS dynamic language change
var form = document.querySelector('form');
var body = document.querySelector('body');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var language = localStorage.getItem('language');
    var trans = languages[language]

    var username = document.querySelector('#username').value;
    if (username == "") {
        const labelText = trans['labelText'];
        alert(labelText);
        return;
    }

    var url = "https://devlevel-server.onrender.com/api";
    // var url = "http://localhost:5000/api";
    var data = { 'username': username };
    var repo_url = "https://github.com/" + username;

    body.classList.add('show-loading');

    function pollServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            body.classList.remove('show-loading');

            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.querySelector('#results').innerHTML =
                    `
                    <p> ${trans['stackText']}: ${response['stack']} </p>
                    <p> ${trans['langText']}: ${response['languages']} </p>
                    <p> ${trans['activeText']}: ${response['contributions']} </p>
                    <p> ${trans['expertText']}: ${response['expertise']} </p>
                    <p> ${trans['activityText']}: ${response['years_active']} ${trans['yearsText']} </p>
                    <p> <a href= ${repo_url}> ${repo_url}</a></p>`;
            } 

            if (xhr.status === 400) {
                document.querySelector('#results').innerHTML =
               ` <p> ${trans['errorText']} </p>`;
            }

            if (xhr.status === 404) {
                document.querySelector('#results').innerHTML =
               ` <p> ${trans['serverText']} </p>`;
            }
        };

        xhr.send(JSON.stringify(data));
        
    };

    pollServer();
    
});