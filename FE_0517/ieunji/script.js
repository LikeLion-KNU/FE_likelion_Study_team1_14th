// =======================================================
// 1. DOM이 준비된 뒤에 JavaScript 실행하기
// =======================================================
// HTML 요소가 아직 만들어지기 전에 JS가 실행되면
// document.querySelector("#loadOneBtn") 같은 코드가 null을 반환할 수 있음.
// 그래서 DOMContentLoaded 안에서 시작한다.

document.addEventListener("DOMContentLoaded", function () {
  // =======================================================
  // 2. HTML 요소 가져오기
  // =======================================================
  // 자주 사용할 HTML 요소들을 변수에 저장해둔다.
  // 이렇게 해두면 매번 document.querySelector를 반복하지 않아도 된다.

  const openFormBtn = document.querySelector("#openFormBtn");
  const deleteLastBtn = document.querySelector("#deleteLastBtn");

  const loadOneBtn = document.querySelector("#loadOneBtn");
  const loadFiveBtn = document.querySelector("#loadFiveBtn");
  const refreshBtn = document.querySelector("#refreshBtn");
  const retryBtn = document.querySelector("#retryBtn");

  const totalCount = document.querySelector("#totalCount");
  const requestStatus = document.querySelector("#requestStatus");

  const partFilter = document.querySelector("#partFilter");
  const sortOption = document.querySelector("#sortOption");
  const searchInput = document.querySelector("#searchInput");

  const lionList = document.querySelector("#lionList");
  const emptyMessage = document.querySelector("#emptyMessage");

  const formPanel = document.querySelector("#formPanel");
  const lionForm = document.querySelector("#lionForm");

  const nameInput = document.querySelector("#nameInput");
  const partInput = document.querySelector("#partInput");
  const skillsInput = document.querySelector("#skillsInput");
  const summaryInput = document.querySelector("#summaryInput");
  const detailInput = document.querySelector("#detailInput");
  const emailInput = document.querySelector("#emailInput");
  const phoneInput = document.querySelector("#phoneInput");
  const websiteInput = document.querySelector("#websiteInput");
  const commentInput = document.querySelector("#commentInput");

  const fillRandomBtn = document.querySelector("#fillRandomBtn");
  const cancelBtn = document.querySelector("#cancelBtn");

  // =======================================================
  // 3. 실제 데이터 저장 공간 만들기
  // =======================================================
  // 이 배열이 현재 아기 사자 명단이다.
  // 화면은 이 배열을 기준으로 다시 그린다.
  let lions = [];

  // 가장 최근에 추가되거나 선택된 카드의 id를 저장한다.
  // 이 값을 이용해서 카드 테두리를 파랗게 표시할 수 있다.
  let selectedLionId = null;

  // 요청 실패 시 "재시도"를 하기 위해,
  // 직전에 실행했던 요청 함수를 저장해두는 변수다.
  let lastRequest = null;

  // =======================================================
  // 4. 랜덤으로 사용할 임시 데이터들
  // =======================================================
  // randomuser API에는 Frontend / Backend / Design 같은 파트 정보가 없다.
  // 그래서 화면에 필요한 값은 우리가 임의로 만들어서 넣어준다.

  const PARTS = ["Frontend", "Backend", "Design"];

  const SKILLS = [
    "JavaScript",
    "React",
    "Node.js",
    "Figma",
    "CSS Grid",
    "HTML/CSS",
    "GraphQL",
    "Design Tokens",
    "Typography",
  ];

  // =======================================================
  // 5. 초기 HTML 카드 읽어서 lions 배열로 변환하기
  // =======================================================
  // 과제 요구사항:
  // "페이지 로드 시, HTML에 이미 존재하는 카드/상세 영역을 읽어 명단 데이터로 초기화"
  //
  // 즉, 처음부터 JS 배열에 직접 데이터를 쓰는 것이 아니라,
  // HTML에 있는 .lion-card들을 읽어서 객체로 만들어야 한다.

  function initLionsFromHTML() {
    const cardElements = document.querySelectorAll(".lion-card");

    lions = Array.from(cardElements).map(function (card, index) {
      return {
        id: card.dataset.id || makeId(),
        name: card.dataset.name || "이름 없음",
        part: card.dataset.part || "Frontend",
        skills: card.dataset.skills || "JavaScript",
        summary: card.dataset.summary || "",
        detail: card.dataset.detail || "",
        email: card.dataset.email || "",
        phone: card.dataset.phone || "",
        website: card.dataset.website || "",
        comment: card.dataset.comment || "",
        image: card.dataset.image || "",
        isMine: card.dataset.isMine === "true",

        // 최신추가순 정렬에 사용할 값이다.
        // 숫자가 클수록 더 최신 데이터로 본다.
        createdAt: Date.now() - index,
      };
    });
  }

  // =======================================================
  // 6. 화면 다시 그리기
  // =======================================================
  // 이 함수가 제일 중요하다.
  //
  // render()는 현재 lions 배열과
  // 현재 필터/정렬/검색 값을 보고
  // 화면에 보여줄 카드 목록을 다시 만든다.

  function render() {
    // 1) 총 인원 갱신
    totalCount.textContent = `총 ${lions.length}명`;

    // 2) 현재 보기 옵션에 맞게 데이터 가공하기
    const visibleLions = getVisibleLions();

    // 3) 기존 카드 HTML 비우기
    // 화면을 한 번 비우고 현재 데이터 기준으로 다시 그린다.
    lionList.innerHTML = "";

    // 4) 표시할 데이터가 0개라면 빈 상태 문구 보여주기
    if (visibleLions.length === 0) {
      emptyMessage.hidden = false;
      return;
    }

    // 표시할 데이터가 있으면 빈 문구 숨기기
    emptyMessage.hidden = true;

    // 5) visibleLions 배열을 카드 HTML로 바꿔서 화면에 추가하기
    visibleLions.forEach(function (lion) {
      const card = createLionCard(lion);
      lionList.appendChild(card);
    });
  }

  // =======================================================
  // 7. 필터 / 검색 / 정렬 적용하기
  // =======================================================
  // lions 전체 배열에서
  // 현재 화면에 보여줄 데이터만 골라내는 함수다.

  function getVisibleLions() {
    const selectedPart = partFilter.value;
    const keyword = searchInput.value.trim().toLowerCase();
    const sortValue = sortOption.value;

    let result = [...lions];

    // 1) 파트 필터
    // selectedPart가 all이면 전체를 보여준다.
    // all이 아니면 해당 파트만 남긴다.
    if (selectedPart !== "all") {
      result = result.filter(function (lion) {
        return lion.part === selectedPart;
      });
    }

    // 2) 이름 검색
    // 검색어가 있으면 이름에 검색어가 포함된 데이터만 남긴다.
    if (keyword !== "") {
      result = result.filter(function (lion) {
        return lion.name.toLowerCase().includes(keyword);
      });
    }

    // 3) 정렬
    if (sortValue === "name") {
      // 이름순 정렬
      result.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    } else {
      // 최신추가순 정렬
      // createdAt 숫자가 큰 데이터가 위로 오게 한다.
      result.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
    }

    return result;
  }

  // =======================================================
  // 8. 아기 사자 카드 HTML 만들기
  // =======================================================
  // lion 객체 하나를 받아서
  // <article class="lion-card">...</article> 형태의 DOM 요소를 만든다.

  function createLionCard(lion) {
    const card = document.createElement("article");
    card.className = "lion-card";

    // 선택된 카드라면 파란 테두리 표시용 클래스 추가
    if (lion.id === selectedLionId) {
      card.classList.add("is-selected");
    }

    // HTML에 data-* 속성을 다시 넣어준다.
    // 나중에 다시 HTML을 읽어야 할 때도 데이터가 유지된다.
    card.dataset.id = lion.id;
    card.dataset.name = lion.name;
    card.dataset.part = lion.part;
    card.dataset.skills = lion.skills;
    card.dataset.summary = lion.summary;
    card.dataset.detail = lion.detail;
    card.dataset.email = lion.email;
    card.dataset.phone = lion.phone;
    card.dataset.website = lion.website;
    card.dataset.comment = lion.comment;
    card.dataset.image = lion.image;
    card.dataset.isMine = String(lion.isMine);

    // 이미지 영역 만들기
    const imageBox = document.createElement("div");
    imageBox.className = "card-image";

    // lion.image가 있으면 실제 이미지를 넣는다.
    // randomuser API에서 받은 데이터는 image가 있다.
    if (lion.image) {
      const img = document.createElement("img");
      img.src = lion.image;
      img.alt = `${lion.name} 프로필 이미지`;
      imageBox.appendChild(img);
    } else {
      // 초기 HTML 카드처럼 이미지가 없는 경우에는
      // CSS 배경색이 보이도록 임시 클래스를 넣어준다.
      imageBox.classList.add(getFallbackImageClass(lion.part));
    }

    // 기술 배지 만들기
    const badge = document.createElement("span");
    badge.className = "skill-badge";

    // skills가 "JavaScript, React, HTML/CSS"처럼 들어올 수 있으므로
    // 첫 번째 기술만 배지에 표시한다.
    badge.textContent = getFirstSkill(lion.skills);

    imageBox.appendChild(badge);

    // 카드 내용 영역 만들기
    const content = document.createElement("div");
    content.className = "card-content";

    const name = document.createElement("h2");
    name.textContent = lion.name;

    const part = document.createElement("strong");
    part.className = `part-text ${lion.part.toLowerCase()}`;
    part.textContent = lion.part;

    const summary = document.createElement("p");
    summary.textContent = lion.summary;

    content.appendChild(name);
    content.appendChild(part);
    content.appendChild(summary);

    card.appendChild(imageBox);
    card.appendChild(content);

    return card;
  }

  // =======================================================
  // 9. fetch로 외부 데이터 가져오기
  // =======================================================
  // randomuser API에서 데이터를 가져오는 함수다.
  //
  // count가 1이면 1명,
  // count가 5이면 5명,
  // count가 18이면 18명을 가져온다.

  async function fetchRandomUsers(count) {
    const url = `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`;

    // fetch는 서버에 요청을 보내고 응답을 기다린다.
    // await가 붙어 있으므로 응답이 올 때까지 다음 줄로 넘어가지 않는다.
    const response = await fetch(url);

    // HTTP 상태 코드가 실패라면 에러를 직접 발생시킨다.
    // 예: 404, 500 같은 경우
    if (!response.ok) {
      throw new Error("서버 응답에 실패했습니다.");
    }

    // 응답 body를 JS 객체로 변환한다.
    const data = await response.json();

    // randomuser API의 실제 사용자 배열은 data.results에 들어있다.
    return data.results;
  }

  // =======================================================
  // 10. API 데이터를 화면용 객체로 변환하기
  // =======================================================
  // randomuser API가 주는 데이터 모양과
  // 우리가 화면에서 쓰는 lion 객체 모양은 다르다.
  //
  // 그래서 API 데이터 1개를 lion 객체 1개로 바꿔야 한다.

  function convertUserToLion(user) {
    const part = getRandomItem(PARTS);
    const skills = getRandomSkills();
    const city = user.location.city;
    const country = user.location.country;

    return {
      id: makeId(),
      name: `${user.name.first} ${user.name.last}`,
      part: part,
      skills: skills,
      summary: `${part} · ${country} ${city}에서 합류했어요!`,
      detail:
        "4주차 미션에서 fetch로 데이터를 불러와 상태(lions)를 업데이트하는 연습을 하고 있습니다. 비동기(async/await)로 받아온 데이터를 map으로 변환해 UI에 반영하는 흐름을 이해하려고 합니다.",
      email: user.email,
      phone: user.phone,
      website: `https://example.com/${user.login.username}`,
      comment: "데이터가 바뀌면 UI도 바뀐다!",
      image: user.picture.large,
      isMine: false,
      createdAt: Date.now(),
    };
  }

  // =======================================================
  // 11. 랜덤 1명 / 랜덤 5명 추가
  // =======================================================
  // 요청 흐름:
  // 버튼 클릭
  // → 로딩 상태 표시
  // → fetch 요청
  // → API 응답 받기
  // → lion 객체로 변환
  // → lions 배열에 추가
  // → render()로 화면 갱신

  async function addRandomLions(count) {
    try {
      setLoading("불러오는 중...");

      const users = await fetchRandomUsers(count);

      const newLions = users.map(function (user) {
        return convertUserToLion(user);
      });

      // 기존 명단 뒤에 새 명단 추가
      lions = [...lions, ...newLions];

      // 가장 마지막으로 추가된 카드 중 첫 번째를 선택 표시
      selectedLionId = newLions[0].id;

      render();

      setSuccess("완료!");
    } catch (error) {
      setError(error);
    }
  }

  // =======================================================
  // 12. 전체 새로고침
  // =======================================================
  // 요구사항:
  // "내 카드"를 제외한 기존 명단을 새 데이터로 완전히 교체해야 한다.
  // "버튼을 클릭하는 시점에 화면에 존재하는 데이터의 개수는 보존되어야 한다."
  //
  // 예:
  // 현재 총 19명이고 내 카드가 1명이라면
  // 내 카드 1명은 유지하고,
  // 나머지 18명을 새로 fetch해서 총 19명을 유지한다.

  async function refreshAllLions() {
    try {
      setLoading("불러오는 중...");

      const currentCount = lions.length;

      // 내 카드만 따로 보관
      const myCards = lions.filter(function (lion) {
        return lion.isMine === true;
      });

      // 새로 받아와야 하는 인원 수
      const needCount = currentCount - myCards.length;

      const users = await fetchRandomUsers(needCount);

      const newLions = users.map(function (user) {
        return convertUserToLion(user);
      });

      // 내 카드 + 새로 받아온 카드로 전체 교체
      lions = [...myCards, ...newLions];

      selectedLionId = newLions.length > 0 ? newLions[0].id : null;

      render();

      setSuccess("완료!");
    } catch (error) {
      setError(error);
    }
  }

  // =======================================================
  // 13. 폼에 랜덤 값 채우기
  // =======================================================
  // 이 기능은 명단에 바로 추가하는 것이 아니다.
  // API에서 1명을 받아온 뒤,
  // 그 사람 정보를 form input에 채워 넣는 기능이다.

  async function fillFormWithRandomUser() {
    try {
      setLoading("불러오는 중...");

      const users = await fetchRandomUsers(1);
      const randomLion = convertUserToLion(users[0]);

      nameInput.value = randomLion.name;
      partInput.value = randomLion.part;
      skillsInput.value = randomLion.skills;
      summaryInput.value = randomLion.summary;
      detailInput.value = randomLion.detail;
      emailInput.value = randomLion.email;
      phoneInput.value = randomLion.phone;
      websiteInput.value = randomLion.website;
      commentInput.value = randomLion.comment;

      // 폼으로 채운 이미지 주소는 input이 없으므로 따로 저장하지 않는다.
      // 나중에 추가하기를 누르면 image 없이 카드가 만들어진다.
      // 이미지까지 저장하고 싶다면 hidden input을 하나 추가하면 된다.

      setSuccess("완료!");
    } catch (error) {
      setError(error);
    }
  }

  // =======================================================
  // 14. 직접 입력한 폼 데이터로 아기 사자 추가하기
  // =======================================================

  function addLionFromForm(event) {
    // form은 기본적으로 submit되면 페이지가 새로고침된다.
    // 우리는 새로고침 없이 JS로 처리해야 하므로 기본 동작을 막는다.
    event.preventDefault();

    const name = nameInput.value.trim();

    if (name === "") {
      alert("이름을 입력해 주세요.");
      nameInput.focus();
      return;
    }

    const newLion = {
      id: makeId(),
      name: name,
      part: partInput.value,
      skills: skillsInput.value.trim() || "JavaScript",
      summary: summaryInput.value.trim() || "새로운 아기 사자입니다.",
      detail: detailInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      website: websiteInput.value.trim(),
      comment: commentInput.value.trim(),
      image: "",
      isMine: false,
      createdAt: Date.now(),
    };

    lions = [...lions, newLion];
    selectedLionId = newLion.id;

    render();
    clearForm();
    setStatus("준비 완료");
  }

  // =======================================================
  // 15. 마지막 아기 사자 삭제
  // =======================================================
  // 배열의 마지막 요소를 제거한다.
  // 단, 데이터가 0명일 때는 아무 일도 하지 않는다.

  function deleteLastLion() {
    if (lions.length === 0) {
      return;
    }

    lions.pop();
    selectedLionId = null;

    render();
  }

  // =======================================================
  // 16. 로딩 / 성공 / 실패 상태 표시
  // =======================================================

  function setLoading(message) {
    requestStatus.textContent = message;
    retryBtn.hidden = true;

    // body에 클래스를 붙여서 CSS로 흐리게 만들 수 있다.
    document.body.classList.add("is-loading");

    setButtonsDisabled(true);
  }

  function setSuccess(message) {
    requestStatus.textContent = message;

    document.body.classList.remove("is-loading");
    setButtonsDisabled(false);

    // 성공 문구를 잠깐 보여준 뒤 다시 준비 완료로 바꾼다.
    setTimeout(function () {
      requestStatus.textContent = "준비 완료";
    }, 1200);
  }

  function setError(error) {
    requestStatus.textContent = `불러오기 실패: ${error.message}`;

    document.body.classList.remove("is-loading");
    setButtonsDisabled(false);

    // 실패했을 때 재시도 버튼 보여주기
    retryBtn.hidden = false;
  }

  function setStatus(message) {
    requestStatus.textContent = message;
  }

  function setButtonsDisabled(isDisabled) {
    loadOneBtn.disabled = isDisabled;
    loadFiveBtn.disabled = isDisabled;
    refreshBtn.disabled = isDisabled;
    fillRandomBtn.disabled = isDisabled;
    openFormBtn.disabled = isDisabled;
    deleteLastBtn.disabled = isDisabled;
  }

  // =======================================================
  // 17. 작은 보조 함수들
  // =======================================================

  function clearForm() {
    lionForm.reset();
  }

  function makeId() {
    return `lion-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function getRandomSkills() {
    const first = getRandomItem(SKILLS);
    const second = getRandomItem(SKILLS);

    if (first === second) {
      return first;
    }

    return `${first}, ${second}`;
  }

  function getFirstSkill(skills) {
    return skills.split(",")[0].trim();
  }

  function getFallbackImageClass(part) {
    if (part === "Backend") {
      return "image-2";
    }

    if (part === "Design") {
      return "image-1";
    }

    return "image-3";
  }

  // =======================================================
  // 18. 이벤트 연결하기
  // =======================================================
  // 버튼을 클릭하거나 select/input 값이 바뀌었을 때
  // 어떤 함수를 실행할지 연결한다.

  openFormBtn.addEventListener("click", function () {
    formPanel.scrollIntoView({ behavior: "smooth" });
  });

  deleteLastBtn.addEventListener("click", deleteLastLion);

  loadOneBtn.addEventListener("click", function () {
    lastRequest = function () {
      return addRandomLions(1);
    };

    addRandomLions(1);
  });

  loadFiveBtn.addEventListener("click", function () {
    lastRequest = function () {
      return addRandomLions(5);
    };

    addRandomLions(5);
  });

  refreshBtn.addEventListener("click", function () {
    lastRequest = function () {
      return refreshAllLions();
    };

    refreshAllLions();
  });

  fillRandomBtn.addEventListener("click", function () {
    lastRequest = function () {
      return fillFormWithRandomUser();
    };

    fillFormWithRandomUser();
  });

  retryBtn.addEventListener("click", function () {
    if (lastRequest !== null) {
      lastRequest();
    }
  });

  cancelBtn.addEventListener("click", function () {
    clearForm();
  });

  lionForm.addEventListener("submit", addLionFromForm);

  partFilter.addEventListener("change", render);
  sortOption.addEventListener("change", render);
  searchInput.addEventListener("input", render);

  // =======================================================
  // 19. 최초 실행
  // =======================================================
  // 1. HTML에 이미 있는 카드들을 읽어서 lions 배열로 만든다.
  // 2. 그 배열을 기준으로 화면을 다시 그린다.
  // 3. 상태 문구를 준비 완료로 둔다.

  initLionsFromHTML();
  render();
  setStatus("준비 완료");
});