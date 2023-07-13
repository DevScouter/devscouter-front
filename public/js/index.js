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
            clearTimeout(timeoutId); 
            body.classList.remove('show-loading');

            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                const koreanMap = {
                    Backend: '백엔드',
                    Frontend: '프론트엔드',
                    Fullstack: '풀스택',
                    Ghost: '유령회원',
                    Low: '낮음',
                    Medium: '중간',
                    High: '높음',
                    Newbie: '초보',
                    Junior: '주니어',
                    Senior: '시니어',
                };

                let { stack, contributions: contrib, expertise } = response;

                if (language === 'korean') {
                    stack = koreanMap[stack] || stack;
                    contrib = koreanMap[contrib] || contrib;
                    expertise = koreanMap[expertise] || expertise;
                }

                document.querySelector('#results').innerHTML =
                    `
                    <p> ${trans['stackText']}: ${stack} </p>
                    <p> ${trans['langText']}: ${response['languages']} </p>
                    <p> ${trans['activeText']}: ${contrib} </p>
                    <p> ${trans['expertText']}: ${expertise} </p>
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

        xhr.onerror = function () {
            document.querySelector('#results').innerHTML = `<p>${trans['serverText']}</p>`;
            setTimeout(pollServer, 1000);
        };

        var timeoutId = setTimeout(function () {
            document.querySelector('#results').innerHTML = `<p> ${trans['serverText']} </p>`;
        }, 5000);

        xhr.send(JSON.stringify(data));
        
    };

    pollServer();
    
});