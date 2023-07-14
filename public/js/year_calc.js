var year_form = document.getElementById('year-form');
var add_year = document.getElementById('add-year');

var yearFieldsContainer = document.getElementById('year-fields-container');
var fieldIndex = 1; 

add_year.addEventListener('click', function (event) {
    event.preventDefault();

    var newFields = document.createElement('div');
    newFields.innerHTML = `
        <input type="text" class="start-year" id="start-year-${fieldIndex}" name="start-year-${fieldIndex}"  placeholder="Start">
        <input type="text" class="end-year" id="end-year-${fieldIndex}" name="end-year-${fieldIndex}" placeholder="End">
    `;

    yearFieldsContainer.appendChild(newFields);
    fieldIndex++;
});

year_form.addEventListener('submit', function (event) {
    event.preventDefault();

    var startYearInputs = document.getElementsByClassName('start-year');
    var endYearInputs = document.getElementsByClassName('end-year');

    var totalSum = 0;
    var differences = [];

    for (var i = 0; i < startYearInputs.length; i++) {
        var startYear = parseDate(startYearInputs[i].value);
        var endYear = parseDate(endYearInputs[i].value);
        
        if (!startYear || !endYear) {
            alert('Please enter valid dates for pair ' + (i + 1) + '.');
            return;
        }

        if (isNaN(startYearInputs[i].value) || isNaN(endYearInputs[i].value)) {
            alert('Make sure the dates are numbers for pair ' + (i + 1) + '.');
            return;
        }

        if (startYear > endYear) {
            alert('Start date cannot be greater than end date for pair ' + (i + 1) + '.');
            return;
        }

        if (startYearInputs[i].value.length != 8 || endYearInputs[i].value.length != 8) {
            alert('Please enter valid dates in YYYYMMDD for pair ' + (i + 1) + '.');
            return;
        }

        var diffInMilliseconds = endYear - startYear;
        var diffDate = new Date(diffInMilliseconds);

        var years = diffDate.getUTCFullYear() - 1970;
        var months = diffDate.getUTCMonth();
        var days = diffDate.getUTCDate() - 1;

        totalSum += diffInMilliseconds;
        differences.push(years + ' years, ' + months + ' months, ' + days + ' days');
    }

    var formattedResult = differences.join('<br>');
    document.getElementById('result-year').innerHTML = formattedResult;


    var sumDate = new Date(totalSum);
    var sumYears = sumDate.getUTCFullYear() - 1970;
    var sumMonths = sumDate.getUTCMonth();
    var sumDays = sumDate.getUTCDate() - 1;

    document.getElementById('total-year').innerHTML = 'Total of ' + sumYears + ' years, ' + sumMonths + ' months, ' + sumDays + ' days' ;
});

function parseDate(dateString) {
    var year = dateString.substr(0, 4);
    var month = dateString.substr(4, 2);
    var day = dateString.substr(6, 2);

    var date = new Date(year, parseInt(month) - 1, day);

    if (isNaN(date.getTime())) {
        return null;
    }

    return date;
}