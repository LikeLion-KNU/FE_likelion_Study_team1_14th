document.addEventListener('DOMContentLoaded', () => {

    let lions = [];

    let lastAction = null;

    const summaryContainer =
        document.getElementById('summary-container');

    const detailContainer =
        document.getElementById('detail-container');

    const totalCountText =
        document.getElementById('total-count');

    const filterPart =
        document.getElementById('filter-part');

    const sortOrder =
        document.getElementById('sort-order');

    const searchName =
        document.getElementById('search-name');

    const asyncStatus =
        document.getElementById('async-status');

    const emptyState =
        document.getElementById('empty-state');

    const addForm =
        document.getElementById('add-form');

    // 상태 표시
    function setStatus(text) {
        asyncStatus.innerText = text;
    }

    // 렌더링
    function render() {

        summaryContainer.innerHTML = '';
        detailContainer.innerHTML = '';

        let filteredLions = lions;

        // 필터
        if (filterPart.value !== '전체') {
            filteredLions = filteredLions.filter(
                lion => lion.part === filterPart.value
            );
        }

        // 검색
        filteredLions = filteredLions.filter(
            lion =>
                lion.name
                    .toLowerCase()
                    .includes(searchName.value.toLowerCase())
        );

        // 정렬
        if (sortOrder.value === 'name') {
            filteredLions.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        // empty state
        if (filteredLions.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }

        // 카드 생성
        filteredLions.forEach(lion => {

            const summaryCard =
                document.createElement('div');

            summaryCard.className =
                'card mini-card';

            summaryCard.innerHTML = `
                <div class="badge">${lion.skills[0]}</div>

                <img
                    src="${lion.imgUrl || './images/profile.jpg'}"
                    class="profile-img"
                >

                <div class="card-text-content">
                    <h2 class="name">${lion.name}</h2>
                    <p class="role">${lion.part}</p>
                    <p class="desc">${lion.summary}</p>
                </div>
            `;

            const detailCard =
                document.createElement('div');

            detailCard.className =
                'card detail-card';

            const skillsHtml = lion.skills
                .map(skill => `<li>${skill}</li>`)
                .join('');

            detailCard.innerHTML = `
                <section>
                    <h1 class="name-large">${lion.name}</h1>
                    <p class="role">${lion.part}</p>
                    <p class="track-name">LION TRACK</p>
                </section>

                <section>
                    <h3 class="section-title">자기소개</h3>
                    <p class="section-text">${lion.desc}</p>
                </section>

                <section>
                    <h3 class="section-title">연락처</h3>

                    <ul class="section-list">
                        <li>Email: ${lion.email}</li>
                        <li>Phone: ${lion.phone}</li>
                        <li>Website: ${lion.website}</li>
                    </ul>
                </section>

                <section>
                    <h3 class="section-title">관심 기술</h3>

                    <ul class="section-list">
                        ${skillsHtml}
                    </ul>
                </section>

                <section>
                    <h3 class="section-title">한 마디</h3>
                    <p class="section-text">${lion.quote}</p>
                </section>
            `;

            summaryContainer.appendChild(summaryCard);
            detailContainer.appendChild(detailCard);
        });

        totalCountText.innerText =
            `총 ${lions.length}명`;
    }

    // 랜덤 유저
    async function fetchRandomUser() {

        const response =
            await fetch('https://randomuser.me/api/');

        const data = await response.json();

        const user = data.results[0];

        const parts =
            ['Frontend', 'Backend', 'Design'];

        return {
            name: `${user.name.first} ${user.name.last}`,
            part: parts[Math.floor(Math.random() * 3)],
            skills: ['JavaScript'],
            summary: '랜덤으로 추가된 아기사자입니다!',
            desc: '외부 API 데이터를 사용했습니다.',
            email: user.email,
            phone: user.phone,
            website: 'https://github.com',
            quote: '열심히 성장하겠습니다!',
            imgUrl: user.picture.large
        };
    }

    // 랜덤 1명
    document
        .getElementById('btn-add-1-random')
        .addEventListener('click', async () => {

            try {

                setStatus('불러오는 중...');

                lastAction = 'one';

                const newLion =
                    await fetchRandomUser();

                lions.push(newLion);

                render();

                setStatus('준비 완료');

            } catch {

                setStatus('실패');

                document
                    .getElementById('btn-retry')
                    .classList.remove('hidden');
            }
        });

    // 랜덤 5명
    document
        .getElementById('btn-add-5-random')
        .addEventListener('click', async () => {

            try {

                setStatus('불러오는 중...');

                lastAction = 'five';

                for (let i = 0; i < 5; i++) {

                    const newLion =
                        await fetchRandomUser();

                    lions.push(newLion);
                }

                render();

                setStatus('준비 완료');

            } catch {

                setStatus('실패');
            }
        });

    // 새로고침
    document
        .getElementById('btn-refresh-all')
        .addEventListener('click', async () => {

            try {

                setStatus('불러오는 중...');

                lastAction = 'refresh';

                lions = [];

                for (let i = 0; i < 5; i++) {

                    const newLion =
                        await fetchRandomUser();

                    lions.push(newLion);
                }

                render();

                setStatus('준비 완료');

            } catch {

                setStatus('실패');
            }
        });

    // 재시도
    document
        .getElementById('btn-retry')
        .addEventListener('click', () => {

            if (lastAction === 'one') {
                document
                    .getElementById('btn-add-1-random')
                    .click();
            }

            if (lastAction === 'five') {
                document
                    .getElementById('btn-add-5-random')
                    .click();
            }

            if (lastAction === 'refresh') {
                document
                    .getElementById('btn-refresh-all')
                    .click();
            }
        });

    // 폼 열기
    document
        .getElementById('btn-toggle-form')
        .addEventListener('click', () => {

            addForm.classList.toggle('hidden');
        });

    // 폼 취소
    document
        .getElementById('btn-cancel')
        .addEventListener('click', () => {

            addForm.reset();

            addForm.classList.add('hidden');
        });

    // 랜덤 값 채우기
    document
        .getElementById('btn-random-fill')
        .addEventListener('click', async () => {

            const fakeUser =
                await fetchRandomUser();

            document.getElementById('name').value =
                fakeUser.name;

            document.getElementById('part').value =
                fakeUser.part;

            document.getElementById('skills').value =
                fakeUser.skills.join(',');

            document.getElementById('summary').value =
                fakeUser.summary;

            document.getElementById('desc').value =
                fakeUser.desc;

            document.getElementById('email').value =
                fakeUser.email;

            document.getElementById('phone').value =
                fakeUser.phone;

            document.getElementById('website').value =
                fakeUser.website;

            document.getElementById('quote').value =
                fakeUser.quote;
        });

    // 폼 제출
    addForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const newLion = {

            name:
                document.getElementById('name').value,

            part:
                document.getElementById('part').value,

            skills:
                document
                    .getElementById('skills')
                    .value
                    .split(',')
                    .map(skill => skill.trim()),

            summary:
                document.getElementById('summary').value,

            desc:
                document.getElementById('desc').value,

            email:
                document.getElementById('email').value,

            phone:
                document.getElementById('phone').value,

            website:
                document.getElementById('website').value,

            quote:
                document.getElementById('quote').value,

            imgUrl: ''
        };

        lions.push(newLion);

        render();

        addForm.reset();

        addForm.classList.add('hidden');
    });

    // 삭제
    document
        .getElementById('btn-delete-last')
        .addEventListener('click', () => {

            lions.pop();

            render();
        });

    // 필터
    filterPart.addEventListener('change', render);

    // 정렬
    sortOrder.addEventListener('change', render);

    // 검색
    searchName.addEventListener('input', render);

});