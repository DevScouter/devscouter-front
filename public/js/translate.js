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
        errorText : '어멋! 유저를 찾을 수 없습니다.',
        serverText : '서버를 켜는 중입니다. 잠시만 기다려주세요.',
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
        errorText : 'Oops! User not found.',
        serverText : 'Server is starting up. Please wait a moment.',
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

    koreanButton.classList.add('active');
    englishButton.classList.remove('active');
});

englishButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateContent('english');
    localStorage.setItem('language', 'english');

    koreanButton.classList.remove('active');
    englishButton.classList.add('active');
});

if (localStorage.getItem('language') === null) {
    updateContent('english');
    localStorage.setItem('language', 'english');
}
else {
    updateContent(localStorage.getItem('language'));
}