var year_form = document.getElementById('year-form');
var add_year = document.getElementById('add-year');

var yearFieldsContainer = document.getElementById('year-fields-container');
var fieldIndex = 1; // Used to generate unique IDs for the new fields

add_year.addEventListener('click', function (event) {
    event.preventDefault();

    // Create a new set of fields
    var newFields = document.createElement('div');
    newFields.innerHTML = `
        <input type="date" class="start-year" id="start-year-${fieldIndex}" name="start-year-${fieldIndex}">
        <input type="date" class="end-year" id="end-year-${fieldIndex}" name="end-year-${fieldIndex}">
    `;

    // Append the new fields to the container
    yearFieldsContainer.appendChild(newFields);

    // Increment the field index
    fieldIndex++;
});

year_form.addEventListener('submit', function (event) {
    event.preventDefault();

    var startYearInputs = document.getElementsByClassName('start-year');
    var endYearInputs = document.getElementsByClassName('end-year');

    var totalSum = 0;
    var differences = [];

    for (var i = 0; i < startYearInputs.length; i++) {
        var startYear = new Date(startYearInputs[i].value);
        var endYear = new Date(endYearInputs[i].value);
        
        if (startYear == "Invalid Date" || endYear == "Invalid Date") {
            alert('Please enter the dates for pair ' + (i + 1) + '.');
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