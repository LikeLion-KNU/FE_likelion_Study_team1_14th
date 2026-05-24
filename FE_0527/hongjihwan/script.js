document.addEventListener('DOMContentLoaded', () => {
    // === 1. 상태 (State) 관리 ===
    // 화면에 보여질 모든 아기 사자 데이터의 원본 배열
    let lions = []; 
    
    // 비동기 통신 상태 관리
    let isLoading = false;
    let lastAction = null; // 실패 시 재시도를 위해 마지막 액션을 기억

    // === 2. DOM 요소 캐싱 ===
    const addForm = document.getElementById('add-form');
    const summaryContainer = document.getElementById('summary-container');
    const detailContainer = document.getElementById('detail-container');
    const totalCountText = document.getElementById('total-count');
    const emptyState = document.getElementById('empty-state');
    
    // 비동기 컨트롤 요소
    const asyncStatus = document.getElementById('async-status');
    const btnRetry = document.getElementById('btn-retry');
    
    // 보기 옵션 요소
    const filterPart = document.getElementById('filter-part');
    const sortOrder = document.getElementById('sort-order');
    const searchName = document.getElementById('search-name');

    // === 3. 초기화: HTML에 하드코딩된 기존 명단 읽어오기 ===
    function initDataFromHTML() {
        const summaryCards = summaryContainer.querySelectorAll('.mini-card');
        const detailCards = detailContainer.querySelectorAll('.detail-card');

        summaryCards.forEach((card, index) => {
            const detailCard = detailCards[index];
            
            // HTML에서 텍스트를 추출하여 데이터 객체로 변환
            lions.push({
                isMine: index === 0, // 첫 번째 카드(홍지환 본체)는 삭제/교체되지 않도록 보호
                name: card.querySelector('.name').innerText,
                part: card.querySelector('.role').innerText,
                summary: card.querySelector('.desc').innerText,
                skills: [card.querySelector('.badge').innerText],
                imgUrl: card.querySelector('.profile-img').src,
                
                // 상세 카드 정보 추출 (안전하게 존재 여부 확인)
                desc: detailCard ? detailCard.querySelector('.introduction .section-text').innerText : "",
                email: detailCard ? detailCard.querySelector('.call li:nth-child(1)').innerText.replace('Email: ', '') : "",
                phone: detailCard ? detailCard.querySelector('.call li:nth-child(2)').innerText.replace('Phone: ', '') : "",
                website: detailCard ? (detailCard.querySelector('.call a') ? detailCard.querySelector('.call a').href : "") : "",
                quote: detailCard ? detailCard.querySelector('.quote .section-text').innerText : ""
            });
        });
        
        render(); // 데이터 추출 완료 후 화면 갱신
    }

    // === 4. 핵심 렌더링 로직 (상태 -> 화면 동기화) ===
    function render() {
        // 1) 필터 및 검색 적용
        let filteredLions = lions.filter(lion => {
            const matchPart = filterPart.value === '전체' || lion.part === filterPart.value;
            const matchSearch = lion.name.toLowerCase().includes(searchName.value.toLowerCase());
            return matchPart && matchSearch;
        });

        // 2) 정렬 적용
        if (sortOrder.value === '이름순') {
            // 이름 오름차순 정렬 (한글/영문 모두 지원)
            filteredLions.sort((a, b) => a.name.localeCompare(b.name));
        }
        // '최신추가순'은 원본 배열(순서)을 그대로 유지하면 됩니다.

        // 3) 화면 비우기
        summaryContainer.innerHTML = '';
        detailContainer.innerHTML = '';

        // 4) 화면 다시 그리기
        if (filteredLions.length === 0) {
            emptyState.classList.remove('hidden'); // 결과 없으면 안내 문구 표시
        } else {
            emptyState.classList.add('hidden');
            filteredLions.forEach(lion => {
                const summaryCard = createSummaryCard(lion);
                const detailCard = createDetailCard(lion);

                summaryCard.addEventListener('click', () => {
                    detailCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // 번쩍! 하는 하이라이트 효과 줬다가 1초 뒤에 빼기
                    detailCard.classList.add('highlight');
                    setTimeout(() => {
                        detailCard.classList.remove('highlight');
                    }, 1000);
                });

                // 3. 화면에 붙인다
                summaryContainer.appendChild(summaryCard);
                detailContainer.appendChild(detailCard);
            });
        }

        // 5) 총 인원 갱신 (필터링된 결과가 아닌 전체 데이터 기준)
        totalCountText.innerText = `총 ${lions.length}명`;
    }

    // 요약 카드 생성 헬퍼 함수
    function createSummaryCard(lion) {
        const div = document.createElement('div');
        div.className = 'card mini-card';
        const mainSkill = lion.skills.length > 0 ? lion.skills[0] : 'Skill';
        div.innerHTML = `
            <div class="badge">${mainSkill}</div>
            <img src="${lion.imgUrl || './images/profile.jpg'}" alt="프로필" class="profile-img">
            <div class="card-text-content">
                <h2 class="name">${lion.name}</h2>
                <p class="role">${lion.part}</p>
                <p class="desc">${lion.summary}</p>
            </div>
        `;
        return div;
    }

    // 상세 카드 생성 헬퍼 함수
    function createDetailCard(lion) {
        const div = document.createElement('div');
        div.className = 'card detail-card';
        const skillsHtml = lion.skills.map(s => `<li>${s}</li>`).join('');
        div.innerHTML = `
            <section class="detail-header">
                <h1 class="name-large">${lion.name}</h1>
                <p class="role">${lion.part}</p>
                <p class="track-name">LION TRACK</p>
            </section>
            <section class="introduction"><h3 class="section-title">자기소개</h3><p class="section-text">${lion.desc}</p></section>
            <section class="call">
                <h3 class="section-title">연락처</h3>
                <ul class="section-list">
                    <li>Email: ${lion.email}</li>
                    <li>Phone: ${lion.phone}</li>
                    <li>Website: <a href="${lion.website}" target="_blank">${lion.website}</a></li>
                </ul>
            </section>
            <section class="interest"><h3 class="section-title">관심 기술</h3><ul class="section-list">${skillsHtml}</ul></section>
            <section class="quote"><h3 class="section-title">한 마디</h3><p class="section-text">${lion.quote}</p></section>
        `;
        return div;
    }

    // === 5. 외부 API 통신 (Fetch) ===
    async function fetchRandomUsers(count) {
        const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`);
        if (!response.ok) throw new Error('네트워크 응답에 문제가 있습니다.');
        const data = await response.json();
        
        const parts = ['Frontend', 'Backend', 'Design'];
        const skillsMap = { 
            Frontend: ['JavaScript', 'React', 'HTML/CSS'], 
            Backend: ['Node.js', 'Java', 'Python'], 
            Design: ['Figma', 'Typography', 'UI/UX'] 
        };

        // 받아온 데이터를 우리 명단 포맷으로 변환
        return data.results.map(user => {
            const randomPart = parts[Math.floor(Math.random() * parts.length)];
            const randomSkill = skillsMap[randomPart][Math.floor(Math.random() * skillsMap[randomPart].length)];
            return {
                isMine: false,
                name: `${user.name.first} ${user.name.last}`,
                part: randomPart,
                skills: [randomSkill],
                summary: `${randomPart} · ${user.location.country} ${user.location.city}에서 합류했어요!`,
                desc: "API에서 비동기로 불러온 임의의 아기 사자 데이터입니다.",
                email: user.email,
                phone: user.phone,
                website: `https://example.com/${user.login.username}`,
                quote: "데이터가 바뀌면 화면도 바뀐다!",
                imgUrl: user.picture.large
            };
        });
    }

    // 상태 UI 변경 함수 (로딩, 성공, 에러)
    function setAsyncStatus(statusType, message = '') {
        asyncStatus.className = `status-text ${statusType}`;
        asyncStatus.innerText = message;
        
        // 로딩 중일 때는 중복 요청 방지를 위해 버튼 비활성화
        const buttons = document.querySelectorAll('.async-controls button');
        buttons.forEach(btn => btn.disabled = (statusType === 'loading'));
        
        // 실패했을 때만 재시도 버튼 표시
        if (statusType === 'error') btnRetry.classList.remove('hidden');
        else btnRetry.classList.add('hidden');
    }

    // 비동기 실행기 (try-catch 반복을 줄이는 래퍼 함수)
    async function executeAsyncAction(actionType, actionFunction) {
        if (isLoading) return;
        isLoading = true;
        lastAction = actionType; // 재시도를 위해 현재 무슨 동작인지 기록
        setAsyncStatus('loading', '불러오는 중...');

        try {
            await actionFunction();
            setAsyncStatus('success', '완료!');
            setTimeout(() => setAsyncStatus('', '준비 완료'), 5000); // 5초 뒤 원래 텍스트로 복귀
            render(); // 데이터 변경 후 화면 다시 그리기
        } catch (error) {
            setAsyncStatus('error', `불러오기 실패: ${error.message}`);
        } finally {
            isLoading = false;
        }
    }

    // === 6. 이벤트 리스너 할당 ===

    // 1) 보기 옵션 이벤트 (변경 시 즉시 render 호출)
    filterPart.addEventListener('change', render);
    sortOrder.addEventListener('change', render);
    searchName.addEventListener('input', render);

    // 2) 비동기 추가 버튼
    document.getElementById('btn-add-1-random').addEventListener('click', () => {
        executeAsyncAction('add1', async () => {
            const newUsers = await fetchRandomUsers(1);
            lions.push(...newUsers);
        });
    });

    document.getElementById('btn-add-5-random').addEventListener('click', () => {
        executeAsyncAction('add5', async () => {
            const newUsers = await fetchRandomUsers(5);
            lions.push(...newUsers);
        });
    });

    document.getElementById('btn-refresh-all').addEventListener('click', () => {
        executeAsyncAction('refresh', async () => {
            const currentTotal = lions.length;
            const myCards = lions.filter(l => l.isMine); // "홍지환(본체)" 카드 보존
            
            // 기존 카드 개수 유지 (내 카드 제외하고 나머지 랜덤 채우기)
            const fetchCount = currentTotal - myCards.length;
            if (fetchCount > 0) {
                const newUsers = await fetchRandomUsers(fetchCount);
                lions = [...myCards, ...newUsers]; // 내 카드 뒤에 새 명단 덮어쓰기
            }
        });
    });

    // 3) 재시도 버튼
    btnRetry.addEventListener('click', () => {
        if (lastAction === 'add1') document.getElementById('btn-add-1-random').click();
        if (lastAction === 'add5') document.getElementById('btn-add-5-random').click();
        if (lastAction === 'refresh') document.getElementById('btn-refresh-all').click();
        if (lastAction === 'randomFill') document.getElementById('btn-random-fill').click();
    });

    // 4) 폼 토글 및 취소
    const toggleForm = () => addForm.classList.toggle('hidden');
    document.getElementById('btn-toggle-form').addEventListener('click', toggleForm);
    document.getElementById('btn-cancel').addEventListener('click', () => { 
        addForm.reset(); 
        toggleForm(); 
    });

    // 5) 수동 추가 폼 제출
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newLion = {
            isMine: false,
            name: document.getElementById('name').value,
            part: document.getElementById('part').value,
            skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(Boolean),
            summary: document.getElementById('summary').value,
            desc: document.getElementById('desc').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            website: document.getElementById('website').value,
            quote: document.getElementById('quote').value,
            imgUrl: '' // 수동은 기본 프로필 이미지
        };
        lions.push(newLion);
        addForm.reset();
        addForm.classList.add('hidden');
        render();
    });

    // 6) 랜덤 값 채우기 (폼 보조 기능)
    document.getElementById('btn-random-fill').addEventListener('click', () => {
        executeAsyncAction('randomFill', async () => {
            const [fakeUser] = await fetchRandomUsers(1);
            document.getElementById('name').value = fakeUser.name;
            document.getElementById('part').value = fakeUser.part;
            document.getElementById('skills').value = fakeUser.skills.join(', ');
            document.getElementById('summary').value = fakeUser.summary;
            document.getElementById('desc').value = fakeUser.desc;
            document.getElementById('email').value = fakeUser.email;
            document.getElementById('phone').value = fakeUser.phone;
            document.getElementById('website').value = fakeUser.website;
            document.getElementById('quote').value = fakeUser.quote;
            // 제출은 하지 않고 입력창만 채움
        });
    });

    // 7) 마지막 아기 사자 삭제
    document.getElementById('btn-delete-last').addEventListener('click', () => {
        // 본인 카드(isMine)만 남았을 때는 삭제 안 됨
        if (lions.length > 0 && !lions[lions.length - 1].isMine) {
            lions.pop();
            render();
        } else if (lions.length > 0 && lions.length === 1) {
            alert("본체 카드는 삭제할 수 없습니다!");
        }
    });

    // === 7. 최초 실행 ===
    initDataFromHTML();
});