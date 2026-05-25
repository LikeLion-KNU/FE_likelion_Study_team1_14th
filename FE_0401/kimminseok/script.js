let members = [
    {
        id: 1,
        name: "김민석",
        job: "Frontend",
        skills: "HTML, CSS, JavaScript",
        summary: "14기 프론트엔드 아기사자입니다!",
        email: "6229kms@naver.com",
        phone: "010-7557-6229",
        website: "https://github.com/Kms6229",
        talk: "안녕하세요"
    },
    {
        id: 2,
        name: "이아기사자",
        job: "Backend",
        skills: "Node.js, Express",
        summary: "백엔드를 맡았습니다",
        phone: "010-1111-2222",
        email: "backend_baby@example.com",
        website: "https://github.com",
        talk: "탄탄한 서버와 데이터베이스로 완벽한 API를 구축해 내겠습니다!"
    },
    {
        id: 3,
        name: "박아기사자",
        job: "Design",
        skills: "Figma, UI/UX",
        summary: "디자이너입니다.",
        phone: "010-3333-4444",
        email: "design_baby@example.com",
        website: "https://www.figma.com",
        talk: "유저들이 감탄할 만한 최고의 UI/UX를 디자인해 오겠습니다."
    },
    {
        id: 4,
        name: "강아기사자",
        job: "Design",
        skills: "Planning, Wireframe",
        summary: "기획 겸 디자인입니다.",
        phone: "010-5555-6666",
        email: "planning_baby@example.com",
        website: "https://github.com",
        talk: "우리 팀의 아이디어를 현실로 만드는 명확한 설계를 책임집니다."
    },
    {
        id: 5,
        name: "최아기사자",
        job: "Frontend",
        skills: "React, Next.js",
        summary: "12기 프론트엔드 입니다!",
        phone: "010-7777-8888",
        email: "senior_lion@example.com",
        website: "https://github.com",
        talk: "12기의 노하우를 살려 아기사자분들의 성장을 팍팍 돕겠습니다!"
    }
];

// DOM 요소 탐색
const addbtn = document.getElementById("btn-add");
const deletebtn = document.getElementById("btn-delete");
const addforms = document.getElementById("content-form");
const total = document.getElementById("total-count");
const cardForm = document.getElementById("card-form");
const sumitbtn = document.getElementById("btn-sumit");
const canclebtn = document.getElementById("btn-back");
const cardContainer = document.getElementById("card-container");
const summaryContainer = document.getElementById("summary-container");
const btnRandom1 = document.getElementById("btn-random-1");
const btnRandom5 = document.getElementById("btn-random-5");
const btnRefreshAll = document.getElementById("btn-refresh-all");
const statusMessage = document.getElementById("status-message");
const btnAutoFill = document.getElementById("btn-auto-fill");
const filterJob = document.getElementById("filter-job");
const sortType = document.getElementById("sort-type");
const searchName = document.getElementById("search-name");

const STATUS = { READY: 'READY', LOADING: 'LOADING', ERROR: 'ERROR' };
let lastAsyncAction = null;

function addform() {
    addforms.classList.toggle("open");
}

function deleteform() {
    if (members.length === 0) {
        console.log("삭제할 데이터가 없습니다");
        return;
    }
    members.pop();
    applyFilterAndRender(); // ⭕ 수정: 삭제 후 단순 렌더링이 아닌 필터 갱신 시스템 호출
}

function sum_mem(count) {
    total.textContent = `총 ${count}명`;
}

// 1. 비동기 상태 UI 업데이트 및 중복 요청 방지 차단기
function setStatus(state, message = "") {
    const buttons = [addbtn, deletebtn, btnRandom1, btnRandom5, btnRefreshAll];
    
    if (state === STATUS.LOADING) {
        buttons.forEach(btn => btn.disabled = true);
        if(statusMessage) {
            statusMessage.className = "status-loading";
            statusMessage.textContent = "불러오는 중...";
        }
    } else if (state === STATUS.READY) {
        buttons.forEach(btn => btn.disabled = false);
        if(statusMessage) {
            statusMessage.className = "status-ready";
            statusMessage.textContent = message || "준비 완료";
        }
    } else if (state === STATUS.ERROR) {
        buttons.forEach(btn => btn.disabled = false);
        if(statusMessage) {
            statusMessage.className = "status-error";
            statusMessage.innerHTML = `불러오기 실패: ${message} <button type="button" class="btn-retry" onclick="retryLastAction()">재시도</button>`;
        }
    }
}

// 2. 실제 외부 오픈 서버 API 연동 단독 함수
async function fetchRandomUserData() {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) throw new Error("네트워크 응답이 올바르지 않습니다.");
    const data = await response.json();
    const user = data.results[0];

    const parts = ["Frontend", "Backend", "Design"];
    const randomJob = parts[Math.floor(Math.random() * parts.length)];

    return {
        id: Date.now() + Math.random(), 
        name: `${user.name.first} ${user.name.last}`,
        job: randomJob,
        skills: "JavaScript, React, HTML/CSS",
        summary: `${randomJob} · 외부 API를 통해 합류했습니다!`,
        intro: `비동기 fetch 통신으로 가져온 무작위 데이터 상태를 화면 레이아웃 구조에 완벽하게 연동하는 실습 중입니다.`,
        email: user.email,
        phone: user.phone,
        website: "https://github.com",
        talk: "데이터가 바뀌면 UI도 바뀐다!"
    };
}

// [기능: 랜덤 1명 추가]
async function addRandomMember() {
    lastAsyncAction = addRandomMember; 
    setStatus(STATUS.LOADING);
    try {
        const newMember = await fetchRandomUserData();
        members.push(newMember);
        setStatus(STATUS.READY, "완료!");
        applyFilterAndRender(); 
    } catch (error) {
        setStatus(STATUS.ERROR, error.message);
    }
}

// [기능: 랜덤 5명 추가]
async function addFiveRandomMembers() {
    lastAsyncAction = addFiveRandomMembers;
    setStatus(STATUS.LOADING);
    try {
        const promises = Array.from({ length: 5 }, fetchRandomUserData);
        const newMembers = await Promise.all(promises);
        members.push(...newMembers);
        setStatus(STATUS.READY, "완료!");
        applyFilterAndRender();
    } catch (error) {
        setStatus(STATUS.ERROR, error.message);
    }
}

// [기능: 전체 새로고침]
async function refreshAllMembers() {
    lastAsyncAction = refreshAllMembers;
    setStatus(STATUS.LOADING);
    try {
        const promises = Array.from({ length: 3 }, fetchRandomUserData);
        members = await Promise.all(promises);
        setStatus(STATUS.READY, "완료!");
        applyFilterAndRender();
    } catch (error) {
        setStatus(STATUS.ERROR, error.message);
    }
}

function retryLastAction() {
    if (lastAsyncAction) lastAsyncAction();
}

// ⭕ 수정 및 추가: [핵심 컨트롤러] 필터, 검색, 정렬 조건 통합 연산 함수 복원
function applyFilterAndRender() {
    let processedList = [...members];

    // 1. 파트 필터링 (선택창이 존재할 때만 작동)
    if (filterJob) {
        const jobValue = filterJob.value;
        if (jobValue !== "전체") {
            processedList = processedList.filter(m => m.job === jobValue);
        }
    }

    // 2. 실시간 이름 검색 (검색창이 존재할 때만 작동)
    if (searchName) {
        const searchValue = searchName.value.trim().toLowerCase();
        if (searchValue !== "") {
            processedList = processedList.filter(m => 
                m.name.toLowerCase().includes(searchValue)
            );
        }
    }

    // 3. 정렬 분기 처리 (정렬창이 존재할 때만 작동)
    if (sortType) {
        const sortValue = sortType.value;
        if (sortValue === "이름순") {
            processedList.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            processedList.sort((a, b) => b.id - a.id); // 최신 등록 ID 우선순
        }
    }

    sum_mem(processedList.length);
    renderCards(processedList);
    renderSummary(processedList);
}

function renderCards(targetList) {
    cardContainer.innerHTML = "";

    if (targetList.length === 0) {
        cardContainer.innerHTML = `<div class="empty-state" style="text-align:center; padding:20px; color:#999;">조건에 맞는 사자가 없습니다.</div>`;
        return;
    }

    targetList.forEach((member) => {
        const cardHtml = `
      <div class="card" id="card${member.id}">
          <div class="summary_img">
              <img src="KakaoTalk_20260505_220821548.jpg" alt="사진"><br />
          </div>
          <div class="summary_text">
              <div class="name">${member.name}</div>
              <div class="job">${member.job}</div>
              <div class="introduce">${member.summary}</div>
          </div>
      </div>
    `;
        cardContainer.insertAdjacentHTML("beforeend", cardHtml);
    });
}

function renderSummary(targetList) {
    summaryContainer.innerHTML = "";
    targetList.forEach((member) => {
        const summaryHtml = `
            <div class="summary-card" style="margin-bottom: 40px;">
                <div class="profile_name">${member.name}</div>
                <div class="profile_info">
                    <span class="job">${member.job}</span><br />
                    Like Lion
                </div>
                <div class="subjects">관심 기술</div>
                <div class="contents">${member.skills || "기재 없음"}</div>

                <div class="subjects">자기소개</div>
                <div class="contents">${member.intro || member.summary}</div>
            
                <div class="subjects">연락처</div>
                <div class="contents">
                    1)전화번호: ${member.phone}<br />
                    2)이메일: ${member.email}<br />
                    3)웹사이트: <a href="${member.website}" target="_blank">${member.website}</a>
                </div>
            
                <div class="subjects">각오 한마디</div>
                <div class="contents">${member.talk || "화이팅!"}</div>
            </div>`;
        summaryContainer.insertAdjacentHTML("beforeend", summaryHtml);
    });
}

async function autoFillForm() {
    setStatus(STATUS.LOADING);
    try {
        const dummy = await fetchRandomUserData();
        if(cardForm.elements["name"]) cardForm.elements["name"].value = dummy.name;
        if(cardForm.elements["job"]) cardForm.elements["job"].value = dummy.job;
        if(cardForm.elements["skills"]) cardForm.elements["skills"].value = dummy.skills;
        if(cardForm.elements["summary"]) cardForm.elements["summary"].value = dummy.summary;
        if(cardForm.elements["intro"]) cardForm.elements["intro"].value = dummy.intro;
        if(cardForm.elements["email"]) cardForm.elements["email"].value = dummy.email;
        if(cardForm.elements["phone"]) cardForm.elements["phone"].value = dummy.phone;
        if(cardForm.elements["website"]) cardForm.elements["website"].value = dummy.website;
        if(cardForm.elements["talk"]) cardForm.elements["talk"].value = dummy.talk;
        setStatus(STATUS.READY, "폼 자동 입력 완료!");
    } catch (error) {
        setStatus(STATUS.ERROR, "자동 입력 실패");
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newMember = {
        id: Date.now(),
        name: formData.get("name"),
        job: formData.get("job"),
        skills: formData.get("skills") || "HTML, CSS",
        summary: formData.get("summary"),
        intro: formData.get("intro"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        website: formData.get("website"),
        talk: formData.get("talk")
    };

    members.push(newMember);
    applyFilterAndRender();
    cancle();
    cardForm.reset();
}

function cancle() {
    addforms.classList.remove("open");
}

// 이벤트 리스너 바인딩 구역 (요소가 기입되어 있을 때만 바인딩 안전하게 처리)
addbtn.addEventListener("click", addform);
deletebtn.addEventListener("click", deleteform);
canclebtn.addEventListener("click", cancle);
cardForm.addEventListener("submit", handleFormSubmit);

btnRandom1.addEventListener("click", addRandomMember);
btnRandom5.addEventListener("click", addFiveRandomMembers);
btnRefreshAll.addEventListener("click", refreshAllMembers);
btnAutoFill.addEventListener("click", autoFillForm);

filterJob.addEventListener("change", applyFilterAndRender);
sortType.addEventListener("change", applyFilterAndRender);
 searchName.addEventListener("input", applyFilterAndRender);

applyFilterAndRender();