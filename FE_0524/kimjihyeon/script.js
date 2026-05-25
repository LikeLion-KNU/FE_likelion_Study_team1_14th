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

// (+) 페이지가 켜질 때 위 데이터를 바탕으로 화면을 그려주는 함수
function initPage() {
    lionMembers.forEach(member => appendNewCards(member));
    updateTotalCount();
}

// 2. DOM 로드 완료 시 초기화 로직 실행
document.addEventListener('DOMContentLoaded', () => {
    initPage();
    initEventListeners();
});


// 3. 총 인원수 텍스트를 화면에 갱신하는 함수
function updateTotalCount() {
    const totalCountElement = document.getElementById('total-count');
    totalCountElement.textContent = `총 ${lionMembers.length}명`;
}

// 4. 이벤트 리스너 초기화
function initEventListeners() {
    const addBtn = document.getElementById('add-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const formContainer = document.getElementById('form-container');
    const lionForm = document.getElementById('lion-form');

    // (4주차 추가)
    const fetchBtns = document.querySelectorAll('.fetch-btn');
    const refreshAllBtn = document.getElementById('refresh-all-btn');
    const asyncStatus = document.getElementById('async-status');
    const retryBtn = document.getElementById('retry-btn');

    let lastRequestCount = 0;
    let lastClickedBtn = null;
    let lastOptions = {};

    // 4-1. 폼 열고 닫기
    addBtn.addEventListener('click', () => {
        formContainer.classList.toggle('hidden');
    });

    // 4-2. 취소
    cancelBtn.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        clearForm();
    });

    // 4-3. 마지막 아기 사자 삭제
    deleteBtn.addEventListener('click', () => {
        if (lionMembers.length > 0) {
            // 1. 데이터 배열에서 제거
            lionMembers.pop();

            // 2. 화면(DOM)에서 마지막 카드 요소 삭제
            const summaryGrid = document.querySelector('.summary-grid');
            const detailList = document.querySelector('.detail-list');

            if (summaryGrid.lastElementChild) summaryGrid.lastElementChild.remove();
            if (detailList.lastElementChild) detailList.lastElementChild.remove();

            // 3. 총 인원 수 갱신
            updateTotalCount();
        }
    });

    // 4-4. 폼 제출
    lionForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

        // 입력 요소들 가져오기
        const nameInput = document.getElementById('input-name');
        const partSelect = document.getElementById('select-part');
        const skillsInput = document.getElementById('input-skills');
        const descInput = document.getElementById('input-desc');
        const introInput = document.getElementById('input-intro');
        const emailInput = document.getElementById('input-email');
        const phoneInput = document.getElementById('input-phone');
        const websiteInput = document.getElementById('input-website');
        const quoteInput = document.getElementById('input-quote');


        // 기술 스택 분리 로직 (쉼표 기준)
        const skillsArray = skillsInput.value.split(',').map(skill => skill.trim());
        const firstBadge = skillsArray[0]; // 첫 번째 항목을 배지 문구로 채택

        // 새 데이터 객체 생성
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

        // 데이터 배열에 추가
        lionMembers.push(newMember);

        // 동적 HTML 카드 추가 생성 및 삽입
        appendNewCards(newMember);

        // 마무리 작업
        updateTotalCount();
        formContainer.classList.add('hidden'); // 폼 닫기
        clearForm(); // 값 비우기
    });

    // (4주차 추가 - 외부 데이터 불러오기)
    fetchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const count = e.target.dataset.count;

            lastRequestCount = count; // 클릭한 버튼의 인원 수 저장
            lastClickedBtn = e.target; // 클릭한 버튼 요소 저장
            lastOptions = {};

            fetchRandomLions(count, e.target, asyncStatus, retryBtn, lastOptions);
        });
    });

    // 4-5. 재시도
    retryBtn.addEventListener('click', () => {
        if (!lastClickedBtn) lastClickedBtn = retryBtn;
        fetchRandomLions(lastRequestCount, lastClickedBtn, asyncStatus, retryBtn, lastOptions);
    });

    // 4-6. 전체 새로고침
    refreshAllBtn.addEventListener('click', async () => {
        const myCards = lionMembers.filter(m => m.isMine);
        const fetchCount = lionMembers.length - myCards.length; // 새로 불러올 카드 수: 전체 카드 수 - 내 카드 수
        if (fetchCount <= 0) return;

        lastRequestCount = fetchCount;
        lastClickedBtn = refreshAllBtn;
        lastOptions = { refresh: true };

        fetchRandomLions(fetchCount, refreshAllBtn, asyncStatus, retryBtn, lastOptions);
    });

    // 4-7. 보기 옵션 이벤트 리스너 (필터, 정렬, 검색)
    const filterPartSelect = document.getElementById('filter-part');
    const sortTypeSelect = document.getElementById('sort-type');
    const searchInput = document.getElementById('search-input');

    filterPartSelect.addEventListener('change', applyViewOptions);
    sortTypeSelect.addEventListener('change', applyViewOptions);
    searchInput.addEventListener('input', applyViewOptions);

    // 4-8. 랜덤 값 채우기 버튼 클릭 이벤트
    const randomFillBtn = document.getElementById('random-fill-btn');
    randomFillBtn.addEventListener('click', () => {
        lastRequestCount = 1;
        lastClickedBtn = randomFillBtn;
        lastOptions = { fillForm: true };

        fetchRandomLions(1, randomFillBtn, asyncStatus, retryBtn, lastOptions);
    });

}

// 5.폼 초기화 함수
function clearForm() {
    const lionForm = document.getElementById('lion-form');
    lionForm.reset();
    document.querySelectorAll('.error-msg').forEach(msg => msg.classList.add('hidden'));
}

// 6. 동적으로 카드를 화면 하단에 붙여주는 함수
function appendNewCards(member) {
    const summaryGrid = document.querySelector('.summary-grid');
    const detailList = document.querySelector('.detail-list');

    const roleClass = `member-role--${member.part.toLowerCase()}`;

    const cardClass = member.isMine ? 'summary-card card-mine' : 'summary-card';

    // 6-1. 요약 카드 HTML 생성
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

    // 6-2. 상세 카드 HTML 생성
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

// 1. 기본 매핑 데이터
const partDataMap = {
    'Frontend': {
        badge: 'JavaScript',
        skills: ['JavaScript', 'React', 'HTML/CSS'],
        intros: [
            '사용자 경험을 개선하는 프론트엔드 개발자입니다.',
            '비동기 통신과 UI 렌더링 최적화에 관심이 많습니다.'
        ],
        quotes: [
            '데이터가 바뀌면 UI도 바뀐다!'
        ]
    },
    'Backend': {
        badge: 'Node.js',
        skills: ['Java', 'Spring Boot', 'MySQL'],
        intros: [
            '안정적인 서버 아키텍처를 고민합니다.',
            '데이터베이스 설계와 API 개발에 흥미가 있습니다.'
        ],
        quotes: [
            '파이팅'
        ]

    },
    'Design': {
        badge: 'Figma',
        skills: ['Figma', 'UI/UX', 'Prototyping'],
        intros: [
            '사용자를 위한 직관적인 디자인을 만듭니다.',
            '디자인 시스템 구축과 사용자 인터뷰를 좋아합니다.'
        ],
        quotes: [
            '아자아자'
        ]
    }
};

// 2. 데이터 가공 함수 (새로고침에서 재사용)
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


// 3. 외부 데이터 불러오기 함수
// 함수가 몇 명(count)인지 & 어떤 버튼(clickedBtn)인지 전달받도록 수정
async function fetchRandomLions(count, clickedBtn, asyncStatus, retryBtn, options = {}) {
    // 3-1. [로딩]
    asyncStatus.textContent = "불러오는 중...";
    clickedBtn.disabled = true;
    retryBtn.classList.add('hidden');

    try {
        // 서버에 데이터 요청하고 기다리기 (Number->count 변수로 변경)
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
            document.querySelector('.summary-grid').innerHTML = '';
            document.querySelector('.detail-list').innerHTML = '';
            myCards.forEach(member => appendNewCards(member));
        }

        // 새로운 멤버 기존 배열 및 카드로 추가
        newMembers.forEach(member => {
            lionMembers.push(member);
            appendNewCards(member);
        });

        // 3-2. [성공]
        updateTotalCount();
        asyncStatus.textContent = "완료!";

    } catch (error) {
        // 3-3. [실패] 
        asyncStatus.textContent = `불러오기 실패: ${error.message}`;
        retryBtn.classList.remove('hidden'); // 재시도 버튼 보이기

    } finally {
        clickedBtn.disabled = false; // 버튼 다시 활성화
    }
}

// 4. 재시도
// 5. 전체 새로고침  -> initEventListeners() 내부에 이벤트 리스너 등록


// 6. 필터/정렬/검색 조건 검사
function applyViewOptions() {
    const filterPart = document.getElementById('filter-part').value;
    const sortType = document.getElementById('sort-type').value;
    const searchKeyword = document.getElementById('search-input').value.trim().toLowerCase();

    // 6-1. 배열 복사 (원본 데이터 보호)
    let result = [...lionMembers];

    // 6-2. [필터]
    if (filterPart !== 'all') {
        result = result.filter(member => member.part === filterPart);
    }

    // 6-3. [검색]
    if (searchKeyword.trim() !== '') {
        result = result.filter(member =>
            member.name.toLowerCase().includes(searchKeyword));
    }

    // 6-4. [정렬]: 가나다(ABC) 순서
    if (sortType === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 6-5. 화면 재구성
    renderFilteredMembers(result)
}

// 7. 필터링된 배열을 넘겨받아 화면 재구성 
function renderFilteredMembers(filteredArray) {
    const summaryGrid = document.querySelector('.summary-grid');
    const detailList = document.querySelector('.detail-list');

    // 7-1. 화면 초기화
    summaryGrid.innerHTML = '';
    detailList.innerHTML = '';

    // 7-2. 조건에 맞는 사람이 0명
    if (filteredArray.length === 0) {
        const emptyMessage = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #6b7280;">
                표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)
            </div>
        `;
        summaryGrid.innerHTML = emptyMessage;
        detailList.innerHTML = emptyMessage;
        return;
    }

    // 7-3. else
    filteredArray.forEach(member => appendNewCards(member));
}