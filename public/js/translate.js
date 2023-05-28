// pug file language change
const koreanButton = document.querySelector('.korean-btn');
const englishButton = document.querySelector('.english-btn');

const languages = {
    korean: {
        h1Text: 'Dev Scouter - 개발자 분석 프로그램',
        labelText: 'GitHub 아이디를 입력하세요',
        submitText: '분석하기',
        stackText: '기술스택',
        langText: '전문 언어',
        activeText: '깃허브 활동정도',
        expertText: '전문성',
        activityText: '활동기간',
        yearsText : '년',
        errorText : '어멋!',

    },
    english: {
        h1Text: 'Dev Scouter - Quick Dev Analyzer',
        labelText: 'Enter GitHub Username',
        submitText: 'Analyze',
        stackText: 'Tech Stack',
        langText: 'Expert Languages',
        activeText: 'GitHub Activity',
        expertText: 'Expertise',
        activityText: 'Years Active',
        yearsText : 'year(s)',
        errorText : 'Oops!',
    }
};

function updateContent(language) {
    const {
        h1Text,
        labelText,
        submitText,
    } = languages[language];

    document.getElementById('h1-text').innerHTML = h1Text;
    document.getElementById('label-text').innerHTML = labelText;
    document.getElementById('submit').innerHTML = submitText;
}

koreanButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateContent('korean');
    localStorage.setItem('language', 'korean');
});

englishButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateContent('english');
    localStorage.setItem('language', 'english');
});

if (localStorage.getItem('language') === null) {
    updateContent('english');
    localStorage.setItem('language', 'english');
}
else {
    updateContent(localStorage.getItem('language'));
}