let members = [];

const cardGrid = document.getElementById('cardGrid');
const nameInput = document.getElementById('nameInput');
const roleInput = document.getElementById('roleInput');
const addBtn = document.getElementById('addBtn');
const loadBtn = document.getElementById('loadBtn');
const status = document.getElementById('status');


function renderCards() {
  cardGrid.innerHTML = '';

  members.forEach((member, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <span class="badge">${member.role}</span>
      <h3>${member.name}</h3>
      <p>${member.email}</p>
      <button class="delete-btn" onclick="deleteMember(${index})">삭제</button>
    `;
    cardGrid.appendChild(card);
  });
}

// 3주차: 멤버 추가
addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const role = roleInput.value.trim();

  if (!name || !role) {
    alert('이름과 역할을 모두 입력해주세요!');
    return;
  }

  members.push({ name, role, email: '직접 추가됨' });
  nameInput.value = '';
  roleInput.value = '';
  renderCards();
});

// 3주차: 멤버 삭제
function deleteMember(index) {
  members.splice(index, 1);
  renderCards();
}

// 4주차: API에서 명단 불러오기
loadBtn.addEventListener('click', async () => {
  status.textContent = '⏳ 불러오는 중...';
  loadBtn.disabled = true;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }

    const data = await response.json();

    const apiMembers = data.map(user => ({
      name: user.name,
      role: 'API 멤버',
      email: user.email
    }));

    members = [...members, ...apiMembers];
    renderCards();
    status.textContent = `${data.length}명 불러오기 완료!`;

  } catch (error) {
    status.textContent = '불러오기 실패: ' + error.message;
    console.error(error);
  } finally {
    loadBtn.disabled = false;
  }
});