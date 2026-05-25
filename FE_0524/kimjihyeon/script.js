// 1. 전체 아기 사자 데이터를 관리할 빈 배열 생성
let lionMembers = [
    {
        name: "김지현",
        part: "Frontend",
        isMine: true,
        badge: "React",
        desc: "Lion cub 입니다.",
        intro: "모르는 것을 숨기지 않고 빠르게 배우는 태도로 기초를 탄탄히 쌓아가겠습니다!",
        email: "rlawlgm@knu.ac.kr",
        phone: "010-8838-6555",
        website: "https://github.com/227Zzz",
        skills: ["JavaScript", "React", "HTML/CSS"],
        quote: "모든 일에 최선을 다하겠습니다.",
        picture: "_.jpg"
    },
    {
        name: "박아기사자",
        part: "Backend",
        badge: "Spring",
        desc: "안정적인 서버 구조에 관심이 많습니다.",
        intro: "안정적인 서버 구조에 관심이 많습니다.",
        email: "lionpark@example.com",
        phone: "010-2345-6789",
        website: "https://backend.dev",
        skills: ["Java", "Spring", "Database"],
        quote: "안정적인 서비스를 만드는 개발자가 되고 싶습니다.",
        picture: "default.jpg"
    },
    {
        name: "이아기사자", part: "Design", badge: "Figma", desc: "사용자 관점에서 디자인을 고민합니다.", intro: "디자이너입니다.", email: "lee@test.com", phone: "010-0000-0000", website: "", skills: ["Figma"], quote: "파이팅", picture: "default.jpg"
    },
    {
        name: "최아기사자", part: "Frontend", badge: "TypeScript", desc: "컴포넌트 단위 설계에 흥미가 있습니다.", intro: "열심히 하겠습니다.", email: "choi@test.com", phone: "010-1111-1111", website: "", skills: ["HTML/CSS"], quote: "아자아자", picture: "default.jpg"
    }
];

// 2. DOM 로드 완료 시 초기화 로직 실행
document.addEventListener('DOMContentLoaded', () => {
    render(); // 화면 첫 렌더링
    initEventListeners();
});

// 3. 필터/정렬/검색 + 카드 렌더링 + 인원수 갱신
function render() {
    const filterPart = document.getElementById('filter-part').value;
    const sortType = document.getElementById('sort-type').value;
    const searchKeyword = document.getElementById('search-input').value.trim().toLowerCase();

    // 3-1. 배열 복사 및 가공
    let result = [...lionMembers];

    if (filterPart !== 'all') {
        result = result.filter(m => m.part === filterPart);
    }
    if (searchKeyword) {
        result = result.filter(m => m.name.toLowerCase().includes(searchKeyword));
    }
    if (sortType === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 3-2. 화면 초기화
    const summaryGrid = document.querySelector('.summary-grid');
    const detailList = document.querySelector('.detail-list');
    summaryGrid.innerHTML = '';
    detailList.innerHTML = '';

    // 3-3. 총 인원수 갱신
    document.getElementById('total-count').textContent = `총 ${result.length}명`;

    // 3-4. 빈 화면 처리
    if (result.length === 0) {
        summaryGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #6b7280;">
                표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)
            </div>`;
        return;
    }

    // 3-5. 카드 그리기
    result.forEach(member => appendNewCards(member));
}

// 4. 이벤트 리스너 초기화
function initEventListeners() {
    const addBtn = document.getElementById('add-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const formContainer = document.getElementById('form-container');
    const lionForm = document.getElementById('lion-form');

    const fetchBtns = document.querySelectorAll('.fetch-btn');
    const refreshAllBtn = document.getElementById('refresh-all-btn');
    const asyncStatus = document.getElementById('async-status');
    const retryBtn = document.getElementById('retry-btn');

    let lastRequestCount = 0;
    let lastClickedBtn = null;
    let lastOptions = {};

    addBtn.addEventListener('click', () => formContainer.classList.toggle('hidden'));
    
    cancelBtn.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        clearForm();
    });

    deleteBtn.addEventListener('click', () => {
        if (lionMembers.length === 0) return;
        lionMembers.pop();
        render(); // 삭제 후 화면 다시 그리기
    });

    lionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('input-name');
        const partSelect = document.getElementById('select-part');
        const skillsInput = document.getElementById('input-skills');
        const descInput = document.getElementById('input-desc');
        const introInput = document.getElementById('input-intro');
        const emailInput = document.getElementById('input-email');
        const phoneInput = document.getElementById('input-phone');
        const websiteInput = document.getElementById('input-website');
        const quoteInput = document.getElementById('input-quote');

        const skillsArray = skillsInput.value.split(',').map(skill => skill.trim());
        const firstBadge = skillsArray[0];

        const newMember = {
            name: nameInput.value,
            part: partSelect.value,
            desc: descInput.value,
            badge: firstBadge,
            skills: skillsArray,
            intro: introInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            website: websiteInput.value,
            quote: quoteInput.value
        };

        lionMembers.push(newMember);
        render(); // 추가 후 화면 다시 그리기

        formContainer.classList.add('hidden');
        clearForm();
    });

    fetchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const count = e.target.dataset.count;
            lastRequestCount = count;
            lastClickedBtn = e.target;
            lastOptions = {};

            fetchRandomLions(count, e.target, asyncStatus, retryBtn, lastOptions);
        });
    });

    retryBtn.addEventListener('click', () => {
        if (!lastClickedBtn) lastClickedBtn = retryBtn;
        fetchRandomLions(lastRequestCount, lastClickedBtn, asyncStatus, retryBtn, lastOptions);
    });

    refreshAllBtn.addEventListener('click', () => {
        const myCards = lionMembers.filter(m => m.isMine);
        const fetchCount = lionMembers.length - myCards.length;
        if (fetchCount <= 0) return;

        lastRequestCount = fetchCount;
        lastClickedBtn = refreshAllBtn;
        lastOptions = { refresh: true };

        fetchRandomLions(fetchCount, refreshAllBtn, asyncStatus, retryBtn, lastOptions);
    });

    document.getElementById('filter-part').addEventListener('change', render);
    document.getElementById('sort-type').addEventListener('change', render);
    document.getElementById('search-input').addEventListener('input', render);

    const randomFillBtn = document.getElementById('random-fill-btn');
    randomFillBtn.addEventListener('click', () => {
        lastRequestCount = 1;
        lastClickedBtn = randomFillBtn;
        lastOptions = { fillForm: true };

        fetchRandomLions(1, randomFillBtn, asyncStatus, retryBtn, lastOptions);
    });
}

// 5. 폼 초기화 및 에러메시지 숨김
function clearForm() {
    const lionForm = document.getElementById('lion-form');
    lionForm.reset();
    document.querySelectorAll('.error-msg').forEach(msg => msg.classList.add('hidden'));
}

function appendNewCards(member) {
    const summaryGrid = document.querySelector('.summary-grid');
    const detailList = document.querySelector('.detail-list');
    const roleClass = `member-role--${member.part.toLowerCase()}`;
    const cardClass = member.isMine ? 'summary-card card-mine' : 'summary-card';

    const summaryHTML = `
        <article class="${cardClass}">
            <div class="profile-image-wrapper">
                <img src="${member.picture || 'default.jpg'}" alt="${member.name} 프로필 이미지">  
                <span class="badge">${member.badge}</span>
            </div>
            <div class="card-info">
                <h3>${member.name}</h3>
                <p class="member-role ${roleClass}">${member.part}</p>
                <p class="card-desc">${member.desc}</p>
            </div>
        </article>
    `;
    summaryGrid.insertAdjacentHTML('beforeend', summaryHTML);

    const skillsListHTML = member.skills.map(skill => `<li>${skill}</li>`).join('');
    const detailHTML = `
        <article class="detail-card">
            <h3>${member.name}</h3>
            <p class="member-role ${roleClass}">${member.part} / LION TRACK</p>
            <h4>자기소개</h4>
            <p>${member.intro || 'none'}</p>
            <h4>연락처</h4>
            <ul>
            <li>Email: ${member.email || 'none'}</li>
            <li>Phone: ${member.phone || 'none'}</li>
            <li>Website: <a href="${member.website || '#'}" target="_blank">${member.website || 'none'}</a></li>
            </ul>
            <h4>관심기술</h4>
            <ul>${skillsListHTML}</ul>
            <h4>한 마디</h4>
            <p>${member.quote || 'none'}</p>
        </article>
    `;
    detailList.insertAdjacentHTML('beforeend', detailHTML);
}

// ==========================================
// 4주차: 외부 데이터 불러오기 (비동기 처리)
// ==========================================

const partDataMap = {
    'Frontend': {
        badge: 'JavaScript',
        skills: ['JavaScript', 'React', 'HTML/CSS'],
        intros: ['사용자 경험을 개선하는 프론트엔드 개발자입니다.', '비동기 통신과 UI 렌더링 최적화에 관심이 많습니다.'],
        quotes: ['데이터가 바뀌면 UI도 바뀐다!']
    },
    'Backend': {
        badge: 'Node.js',
        skills: ['Java', 'Spring Boot', 'MySQL'],
        intros: ['안정적인 서버 아키텍처를 고민합니다.', '데이터베이스 설계와 API 개발에 흥미가 있습니다.'],
        quotes: ['파이팅']
    },
    'Design': {
        badge: 'Figma',
        skills: ['Figma', 'UI/UX', 'Prototyping'],
        intros: ['사용자를 위한 직관적인 디자인을 만듭니다.', '디자인 시스템 구축과 사용자 인터뷰를 좋아합니다.'],
        quotes: ['아자아자']
    }
};

function convertToMemberObject(user) {
    const parts = ['Frontend', 'Backend', 'Design'];
    const randomPart = parts[Math.floor(Math.random() * parts.length)];
    const matchedData = partDataMap[randomPart];
    const randomIntro = matchedData.intros[Math.floor(Math.random() * matchedData.intros.length)];
    const randomQuote = matchedData.quotes[Math.floor(Math.random() * matchedData.quotes.length)];

    return {
        name: `${user.name.first} ${user.name.last}`,
        part: randomPart,
        desc: `${randomPart} · ${user.location.city}에서 합류했어요!`,
        badge: matchedData.badge,
        skills: matchedData.skills,
        intro: randomIntro,
        picture: user.picture.large,
        email: user.email,
        phone: user.phone,
        website: `https://example.com/${user.login.username}`,
        quote: randomQuote
    };
}

async function fetchRandomLions(count, clickedBtn, asyncStatus, retryBtn, options = {}) {
    asyncStatus.textContent = "불러오는 중...";
    clickedBtn.disabled = true;
    retryBtn.classList.add('hidden');

    try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`);
        if (!response.ok) throw new Error("서버 응답 오류");

        const data = await response.json();
        const newMembers = data.results.map(user => convertToMemberObject(user));

        if (options.fillForm) {
            const member = newMembers[0];
            document.getElementById('input-name').value = member.name;
            document.getElementById('select-part').value = member.part;
            document.getElementById('input-skills').value = member.skills.join(', ');
            document.getElementById('input-desc').value = member.desc;
            document.getElementById('input-intro').value = member.intro;
            document.getElementById('input-email').value = member.email;
            document.getElementById('input-phone').value = member.phone;
            document.getElementById('input-website').value = member.website;
            document.getElementById('input-quote').value = member.quote;
            asyncStatus.textContent = "완료!";
            return;
        }

        if (options.refresh) {
            const myCards = lionMembers.filter(member => member.isMine);
            lionMembers = [...myCards];
        }

        newMembers.forEach(member => lionMembers.push(member));
        
        render(); 
        
        asyncStatus.textContent = "완료!";

    } catch (error) {
        asyncStatus.textContent = `불러오기 실패: ${error.message}`;
        retryBtn.classList.remove('hidden');
    } finally {
        clickedBtn.disabled = false;
    }
}