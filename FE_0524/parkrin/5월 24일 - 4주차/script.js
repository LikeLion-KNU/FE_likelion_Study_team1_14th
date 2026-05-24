var members = [
  {
    id: 1, isMine: true,
    name: "김아기사자", part: "Frontend",
    intro: "구조적인 UI를 고민하는 프론트엔드 개발자입니다.",
    bio: "HTML과 CSS를 처음 배우면서 화면이 어떻게 구성되는지에 흥미를 느꼈습니다. 단순히 보이는 결과보다, 왜 이런 구조가 필요한지 이해하려고 노력하고 있습니다.",
    skills: ["HTML / CSS", "JavaScript", "React (학습 중)"],
    email: "lionkim@example.com", phone: "010-1234-5678",
    website: "https://example.com",
    quote: "기본기를 탄탄히 다지는 개발자가 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80"
  },
  {
    id: 2, isMine: false,
    name: "박아기사자", part: "Backend",
    intro: "안정적인 서버 구조에 관심이 많습니다.",
    bio: "서버 개발을 배우며 데이터가 오가는 흐름에 관심을 가지게 되었습니다.",
    skills: ["Java", "Spring", "Database"],
    email: "lionpark@example.com", phone: "010-2345-6789",
    website: "https://backend.dev",
    quote: "안정적인 서비스를 만드는 개발자가 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
  },
  {
    id: 3, isMine: false,
    name: "이아기사자", part: "Design",
    intro: "사용자 관점에서 디자인을 고민합니다.",
    bio: "사용자가 제품을 편리하게 사용할 수 있도록 돕는 디자인에 관심이 많습니다.",
    skills: ["Figma", "Prototyping", "Design System"],
    email: "lionlee@example.com", phone: "010-3456-7890",
    website: "https://design.io",
    quote: "사용자를 먼저 생각하는 디자이너가 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
  },
  {
    id: 4, isMine: false,
    name: "최아기사자", part: "Frontend",
    intro: "컴포넌트 단위 설계에 흥미가 있습니다.",
    bio: "컴포넌트 단위로 UI를 분리하고 재사용 가능한 구조를 만드는 것에 흥미를 느낍니다.",
    skills: ["React", "TypeScript", "Storybook"],
    email: "lionchoi@example.com", phone: "010-4567-8901",
    website: "https://choi.dev",
    quote: "읽기 쉬운 코드를 작성하는 개발자가 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80"
  },
  {
    id: 5, isMine: false,
    name: "정아기사자", part: "Backend",
    intro: "데이터 흐름을 명확히 하는 개발을 지향합니다.",
    bio: "데이터 흐름을 명확히 설계하고 API의 일관성을 유지하는 백엔드 개발에 관심이 많습니다.",
    skills: ["Node.js", "Express", "MongoDB"],
    email: "lionjeong@example.com", phone: "010-5678-9012",
    website: "https://jeong.dev",
    quote: "빠르게 배우고 꾸준히 성장하고 싶습니다.",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80"
  },
  {
    id: 6, isMine: false,
    name: "오아기사자", part: "Design",
    intro: "디자인 시스템에 관심이 많습니다.",
    bio: "디자인 시스템을 구축하고 일관된 경험을 제공하는 것에 관심이 많습니다.",
    skills: ["Design Tokens", "Figma Variables", "Accessibility"],
    email: "lionoh@example.com", phone: "010-6789-0123",
    website: "https://oh.design",
    quote: "일관된 경험을 만드는 디자이너가 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80"
  },
  {
    id: 7, isMine: false,
    name: "강아기사자", part: "Frontend",
    intro: "레이아웃 구조를 탄탄히 다지고 싶습니다.",
    bio: "CSS Grid와 Flexbox를 집중적으로 공부하며 반응형 UI를 만드는 것을 목표로 합니다.",
    skills: ["CSS Grid", "Flexbox", "Responsive Design"],
    email: "lionkang@example.com", phone: "010-7890-1234",
    website: "https://kang.dev",
    quote: "레이아웃의 달인이 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
  },
  {
    id: 8, isMine: false,
    name: "윤아기사자", part: "Backend",
    intro: "API 설계의 효율을 고민합니다.",
    bio: "GraphQL을 통해 효율적인 데이터 요청 구조를 만드는 것에 관심이 있습니다.",
    skills: ["GraphQL", "Apollo Server", "REST API"],
    email: "lionyoon@example.com", phone: "010-8901-2345",
    website: "https://yoon.dev",
    quote: "깔끔한 API를 설계하는 개발자가 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80"
  },
  {
    id: 9, isMine: false,
    name: "한아기사자", part: "Design",
    intro: "타이포그래피와 브랜딩에 관심이 있습니다.",
    bio: "타이포그래피와 브랜딩에 관심이 많아 폰트 선택 하나에도 신중을 기합니다.",
    skills: ["Typography", "Brand Identity", "Motion Graphics"],
    email: "lionhan@example.com", phone: "010-9012-3456",
    website: "https://han.design",
    quote: "글자 하나하나에 의미를 담는 디자이너가 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80"
  }
];

var nextId = 100;
var lastFetchAction = null; // 재시도용

var btnToggleForm  = document.getElementById("btn-toggle-form");
var btnDeleteLast  = document.getElementById("btn-delete-last");
var totalNumEl     = document.getElementById("total-num");
var formArea       = document.getElementById("form-area");
var addForm        = document.getElementById("add-form");
var btnCancel      = document.getElementById("btn-cancel");
var cardGrid       = document.getElementById("card-grid");
var detailList     = document.getElementById("detail-list");
var emptyState     = document.getElementById("empty-state");
var btnFetch1      = document.getElementById("btn-fetch-1");
var btnFetch5      = document.getElementById("btn-fetch-5");
var btnRefreshAll  = document.getElementById("btn-refresh-all");
var fetchStatusEl  = document.getElementById("fetch-status");
var btnRetry       = document.getElementById("btn-retry");
var filterPart     = document.getElementById("filter-part");
var sortOrder      = document.getElementById("sort-order");
var searchInput    = document.getElementById("search-input");
var btnRandomFill  = document.getElementById("btn-random-fill");

var fName    = document.getElementById("f-name");
var fPart    = document.getElementById("f-part");
var fSkills  = document.getElementById("f-skills");
var fIntro   = document.getElementById("f-intro");
var fBio     = document.getElementById("f-bio");
var fEmail   = document.getElementById("f-email");
var fPhone   = document.getElementById("f-phone");
var fWebsite = document.getElementById("f-website");
var fQuote   = document.getElementById("f-quote");

var errName    = document.getElementById("err-name");
var errSkills  = document.getElementById("err-skills");
var errIntro   = document.getElementById("err-intro");
var errBio     = document.getElementById("err-bio");
var errEmail   = document.getElementById("err-email");
var errPhone   = document.getElementById("err-phone");
var errWebsite = document.getElementById("err-website");
var errQuote   = document.getElementById("err-quote");

var PARTS = ["Frontend", "Backend", "Design"];
var SKILL_POOL = {
  Frontend: ["JavaScript", "React", "Vue", "HTML/CSS", "TypeScript", "Next.js"],
  Backend:  ["Node.js", "Java", "Spring", "Python", "Go", "Database"],
  Design:   ["Figma", "UI/UX", "Prototyping", "Design System", "Typography", "Illustration"]
};

function getPartClass(part) {
  if (part === "Frontend") return "frontend";
  if (part === "Backend")  return "backend";
  if (part === "Design")   return "design";
  return "";
}

function updateTotal() {
  totalNumEl.textContent = members.length;
}

function convertUser(user) {
  var part = PARTS[Math.floor(Math.random() * PARTS.length)];
  var skills = SKILL_POOL[part].slice(0, 3);
  return {
    id: nextId++,
    isMine: false,
    name: user.name.first + " " + user.name.last,
    part: part,
    intro: part + " · " + user.location.city + "에서 합류했어요!",
    bio: "새롭게 합류한 아기 사자입니다. 앞으로 열심히 성장하겠습니다.",
    skills: skills,
    email: user.email,
    phone: user.phone,
    website: "https://example.com/" + user.login.username,
    quote: "데이터가 바뀌면 화면도 바뀐다!",
    image: user.picture.large
  };
}

function getFiltered() {
  var result = members.slice();
  var partVal   = filterPart.value;
  var sortVal   = sortOrder.value;
  var searchVal = searchInput.value.trim().toLowerCase();

  if (partVal !== "전체") {
    result = result.filter(function(m) { return m.part === partVal; });
  }
  if (searchVal) {
    result = result.filter(function(m) {
      return m.name.toLowerCase().indexOf(searchVal) !== -1;
    });
  }
  if (sortVal === "name") {
    result.sort(function(a, b) { return a.name.localeCompare(b.name, "ko"); });
  }
  return result;
}

function renderAll() {
  var filtered = getFiltered();

  updateTotal();
  cardGrid.innerHTML = "";
  detailList.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  filtered.forEach(function(member) {
    cardGrid.appendChild(createSummaryCard(member));
    detailList.appendChild(createDetailCard(member));
  });
}

function createSummaryCard(member) {
  var card = document.createElement("div");
  card.className = "summary-card" + (member.isMine ? " mine" : "");
  card.dataset.id = member.id;

  var firstSkill = member.skills.length > 0 ? member.skills[0] : "";

  card.innerHTML =
    '<div class="card-image-wrap">' +
      '<img src="' + member.image + '" alt="' + member.name + ' 프로필" />' +
      (firstSkill ? '<span class="badge">' + firstSkill + '</span>' : '') +
    '</div>' +
    '<div class="card-body">' +
      '<div class="name">' + member.name + '</div>' +
      '<div class="part ' + getPartClass(member.part) + '">' + member.part + '</div>' +
      '<div class="intro">' + member.intro + '</div>' +
    '</div>';
  return card;
}

function createDetailCard(member) {
  var card = document.createElement("div");
  card.className = "detail-card";
  card.dataset.id = member.id;

  var skillsHtml = member.skills.map(function(s) {
    return "<li>" + s + "</li>";
  }).join("");

  card.innerHTML =
    '<div class="d-name">' + member.name + '</div>' +
    '<div class="d-part ' + getPartClass(member.part) + '">' + member.part + '</div>' +
    '<div class="d-club">LION TRACK</div>' +
    '<h4>자기소개</h4><p>' + member.bio + '</p>' +
    '<h4>연락처</h4>' +
    '<ul>' +
      '<li>Email: ' + member.email + '</li>' +
      '<li>Phone: ' + member.phone + '</li>' +
      '<li><a href="' + member.website + '" target="_blank">' + member.website + '</a></li>' +
    '</ul>' +
    '<h4>관심 기술</h4><ul>' + skillsHtml + '</ul>' +
    '<h4>한 마디</h4><p class="quote">' + member.quote + '</p>';
  return card;
}

function setFetchStatus(state, message) {
  fetchStatusEl.className = "fetch-status";
  fetchStatusEl.textContent = message;

  var isBusy = (state === "loading");
  btnFetch1.disabled      = isBusy;
  btnFetch5.disabled      = isBusy;
  btnRefreshAll.disabled  = isBusy;

  if (state === "loading") {
    fetchStatusEl.classList.add("loading");
    btnRetry.classList.add("hidden");
  } else if (state === "success") {
    fetchStatusEl.classList.add("success");
    btnRetry.classList.add("hidden");
  } else if (state === "fail") {
    fetchStatusEl.classList.add("fail");
    btnRetry.classList.remove("hidden");
  } else {
    btnRetry.classList.add("hidden");
  }
}

async function fetchUsers(count) {
  var res = await fetch(
    "https://randomuser.me/api/?results=" + count + "&nat=us,gb,ca,au,nz"
  );
  if (!res.ok) throw new Error("HTTP " + res.status);
  var data = await res.json();
  return data.results.map(convertUser);
}

async function doFetchAdd(count) {
  lastFetchAction = function() { doFetchAdd(count); };
  setFetchStatus("loading", "불러오는 중...");
  try {
    var newMembers = await fetchUsers(count);
    newMembers.forEach(function(m) { members.push(m); });
    renderAll();
    setFetchStatus("success", "완료!");
    setTimeout(function() { setFetchStatus("ready", "준비 완료"); }, 2000);
  } catch (err) {
    setFetchStatus("fail", "불러오기 실패: " + err.message);
  }
}

async function doFetchRefresh() {
  lastFetchAction = doFetchRefresh;
  var currentCount = members.length;
  setFetchStatus("loading", "불러오는 중...");
  try {
    var newMembers = await fetchUsers(currentCount);
    var myCard = members.find(function(m) { return m.isMine; });
    if (myCard) { newMembers[0] = myCard; }
    members = newMembers;
    renderAll();
    setFetchStatus("success", "완료!");
    setTimeout(function() { setFetchStatus("ready", "준비 완료"); }, 2000);
  } catch (err) {
    setFetchStatus("fail", "불러오기 실패: " + err.message);
  }
}

async function doRandomFill() {
  try {
    var users = await fetchUsers(1);
    var u = users[0];
    fName.value    = u.name;
    fPart.value    = u.part;
    fSkills.value  = u.skills.join(", ");
    fIntro.value   = u.intro;
    fBio.value     = u.bio;
    fEmail.value   = u.email;
    fPhone.value   = u.phone;
    fWebsite.value = u.website;
    fQuote.value   = u.quote;
  } catch (err) {
    alert("랜덤 값 불러오기 실패: " + err.message);
  }
}

function openForm() {
  formArea.classList.remove("hidden");
  btnToggleForm.classList.add("active");
}

function closeForm() {
  formArea.classList.add("hidden");
  btnToggleForm.classList.remove("active");
  addForm.reset();
  clearErrors();
}

function clearErrors() {
  var fields = [fName, fSkills, fIntro, fBio, fEmail, fPhone, fWebsite, fQuote];
  var errors = [errName, errSkills, errIntro, errBio, errEmail, errPhone, errWebsite, errQuote];
  fields.forEach(function(f) { f.classList.remove("error"); });
  errors.forEach(function(e) { e.classList.add("hidden"); });
}

function showError(input, errEl) {
  input.classList.add("error");
  errEl.classList.remove("hidden");
}

function validateForm() {
  var valid = true;
  clearErrors();
  if (!fName.value.trim())    { showError(fName, errName); valid = false; }
  if (!fSkills.value.trim())  { showError(fSkills, errSkills); valid = false; }
  if (!fIntro.value.trim())   { showError(fIntro, errIntro); valid = false; }
  if (!fBio.value.trim())     { showError(fBio, errBio); valid = false; }
  if (!fEmail.value.trim() || !fEmail.value.includes("@")) {
    showError(fEmail, errEmail); valid = false;
  }
  if (!fPhone.value.trim())   { showError(fPhone, errPhone); valid = false; }
  if (!fWebsite.value.trim() ||
      (!fWebsite.value.startsWith("http://") && !fWebsite.value.startsWith("https://"))) {
    showError(fWebsite, errWebsite); valid = false;
  }
  if (!fQuote.value.trim())   { showError(fQuote, errQuote); valid = false; }
  return valid;
}

btnToggleForm.addEventListener("click", function() {
  if (formArea.classList.contains("hidden")) { openForm(); } else { closeForm(); }
});

btnCancel.addEventListener("click", closeForm);

addForm.addEventListener("submit", function(e) {
  e.preventDefault();
  if (!validateForm()) return;

  var skillArr = fSkills.value.split(",").map(function(s) {
    return s.trim();
  }).filter(function(s) { return s.length > 0; });

  var newMember = {
    id: nextId++, isMine: false,
    name: fName.value.trim(), part: fPart.value,
    intro: fIntro.value.trim(), bio: fBio.value.trim(),
    skills: skillArr,
    email: fEmail.value.trim(), phone: fPhone.value.trim(),
    website: fWebsite.value.trim(), quote: fQuote.value.trim(),
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80"
  };

  members.push(newMember);
  renderAll();
  closeForm();
});

btnDeleteLast.addEventListener("click", function() {
  if (members.length === 0) return;
  members.pop();
  renderAll();
});

btnFetch1.addEventListener("click", function() { doFetchAdd(1); });
btnFetch5.addEventListener("click", function() { doFetchAdd(5); });
btnRefreshAll.addEventListener("click", doFetchRefresh);

btnRetry.addEventListener("click", function() {
  if (lastFetchAction) lastFetchAction();
});

btnRandomFill.addEventListener("click", doRandomFill);

filterPart.addEventListener("change", renderAll);
sortOrder.addEventListener("change", renderAll);
searchInput.addEventListener("input", renderAll);

renderAll();