var year_form = document.getElementById('year-form');

year_form.addEventListener('submit', function (event) {
    event.preventDefault();

    var start_year = new Date(document.getElementById('start-year').value);
    var end_year = new Date(document.getElementById('end-year').value);

    if (start_year == "") {
        alert('Please enter the start year.');
        return;
    } else if (end_year == "") {
        alert('Please enter the end year.');
        return;
    }
    
    var diffInMilliseconds = end_year - start_year;
    var diffDate = new Date(diffInMilliseconds);

    var years = diffDate.getUTCFullYear() - 1970;
    var months = diffDate.getUTCMonth();
    var days = diffDate.getUTCDate() - 1;
    var formattedResult = years + ' years, ' + months + ' months, ' + days + ' days';

    document.getElementById('result-year').innerHTML = formattedResult;
});