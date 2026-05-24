var members = [
  {
    id: 1, isMine: true,
    name: "김아기사자", part: "Frontend",
    intro: "구조적인 UI를 고민하는 프론트엔드 개발자입니다.",
    bio: "HTML과 CSS를 처음 배우면서 화면이 어떻게 구성되는지에 흥미를 느꼈습니다. 단순히 보이는 결과보다, 왜 이런 구조가 필요한지 이해하려고 노력하고 있습니다. 시맨틱 태그의 중요성과 CSS의 계층적 구조를 깊이 있게 학습하면서, 사용자 경험을 향상시키는 구조적인 UI 설계에 매력을 느끼고 있습니다.",
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
    bio: "서버 개발을 배우며 데이터가 오가는 흐름에 관심을 가지게 되었습니다. 안정적인 서버 구조를 설계하는 것이 얼마나 중요한지 깨달았고, 비즈니스 로직을 효율적으로 처리하면서도 확장 가능한 아키텍처를 만드는 것에 매력을 느끼고 있습니다.",
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
    bio: "사용자가 제품을 편리하게 사용할 수 있도록 돕는 디자인에 관심이 많습니다. UI뿐만 아니라 UX 전반을 이해하며 디자인 결정의 근거를 논리적으로 설명할 수 있는 디자이너를 목표로 하고 있습니다.",
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
    bio: "컴포넌트 단위로 UI를 분리하고 재사용 가능한 구조를 만드는 것에 흥미를 느낍니다. 타입 안정성을 갖춘 코드 작성을 통해 팀 단위 협업에서도 오류를 줄이는 방향을 탐구하고 있습니다.",
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
    bio: "데이터 흐름을 명확히 설계하고 API의 일관성을 유지하는 백엔드 개발에 관심이 많습니다. Node.js로 빠른 프로토타이핑을 경험하며 서버 개발의 재미를 느끼고 있습니다.",
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
    bio: "디자인 시스템을 구축하고 일관된 경험을 제공하는 것에 관심이 많습니다. 컴포넌트 라이브러리 설계와 토큰 기반의 디자인 언어 구성에 대해 꾸준히 공부하고 있습니다.",
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
    bio: "CSS 레이아웃의 원리를 깊게 이해하고 싶어 Grid와 Flexbox를 집중적으로 공부하고 있습니다. 반응형 웹 디자인에 흥미를 느끼며 다양한 디바이스에서 잘 보이는 UI를 만드는 것을 목표로 합니다.",
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
    bio: "GraphQL을 통해 효율적인 데이터 요청 구조를 만드는 것에 관심이 있습니다. 클라이언트와 서버 간의 인터페이스를 명확하게 정의하고 유지보수하기 쉬운 API를 설계하는 것이 목표입니다.",
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
    bio: "타이포그래피와 브랜딩에 관심이 많아 폰트 선택과 레터스페이싱 하나에도 신중을 기합니다. 시각적 언어를 통해 브랜드의 아이덴티티를 표현하는 작업에 매료되어 있습니다.",
    skills: ["Typography", "Brand Identity", "Motion Graphics"],
    email: "lionhan@example.com", phone: "010-9012-3456",
    website: "https://han.design",
    quote: "글자 하나하나에 의미를 담는 디자이너가 되고 싶습니다.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80"
  }
];

var nextId = 100;

var btnToggleForm = document.getElementById("btn-toggle-form");
var btnDeleteLast = document.getElementById("btn-delete-last");
var totalNumEl    = document.getElementById("total-num");
var formArea      = document.getElementById("form-area");
var addForm       = document.getElementById("add-form");
var btnCancel     = document.getElementById("btn-cancel");
var cardGrid      = document.getElementById("card-grid");
var detailList    = document.getElementById("detail-list");

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

function getPartClass(part) {
  if (part === "Frontend") return "frontend";
  if (part === "Backend")  return "backend";
  if (part === "Design")   return "design";
  return "";
}

function updateTotal() {
  totalNumEl.textContent = members.length;
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
    '<h4>자기소개</h4>' +
    '<p>' + member.bio + '</p>' +
    '<h4>연락처</h4>' +
    '<ul>' +
      '<li>Email: ' + member.email + '</li>' +
      '<li>Phone: ' + member.phone + '</li>' +
      '<li><a href="' + member.website + '" target="_blank">' + member.website + '</a></li>' +
    '</ul>' +
    '<h4>관심 기술</h4>' +
    '<ul>' + skillsHtml + '</ul>' +
    '<h4>한 마디</h4>' +
    '<p class="quote">' + member.quote + '</p>';

  return card;
}

function renderAll() {
  cardGrid.innerHTML = "";
  detailList.innerHTML = "";

  members.forEach(function(member) {
    cardGrid.appendChild(createSummaryCard(member));
    detailList.appendChild(createDetailCard(member));
  });

  updateTotal();
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

function hideError(input, errEl) {
  input.classList.remove("error");
  errEl.classList.add("hidden");
}

function validateForm() {
  var valid = true;
  clearErrors();

  if (fName.value.trim() === "") {
    showError(fName, errName);
    valid = false;
  }
  if (fSkills.value.trim() === "") {
    showError(fSkills, errSkills);
    valid = false;
  }
  if (fIntro.value.trim() === "") {
    showError(fIntro, errIntro);
    valid = false;
  }
  if (fBio.value.trim() === "") {
    showError(fBio, errBio);
    valid = false;
  }
  if (fEmail.value.trim() === "" || !fEmail.value.includes("@")) {
    showError(fEmail, errEmail);
    valid = false;
  }
  if (fPhone.value.trim() === "") {
    showError(fPhone, errPhone);
    valid = false;
  }
  if (fWebsite.value.trim() === "" || (!fWebsite.value.startsWith("http://") && !fWebsite.value.startsWith("https://"))) {
    showError(fWebsite, errWebsite);
    valid = false;
  }
  if (fQuote.value.trim() === "") {
    showError(fQuote, errQuote);
    valid = false;
  }

  return valid;
}

btnToggleForm.addEventListener("click", function() {
  if (formArea.classList.contains("hidden")) {
    openForm();
  } else {
    closeForm();
  }
});

btnCancel.addEventListener("click", function() {
  closeForm();
});


addForm.addEventListener("submit", function(e) {
  e.preventDefault();

  if (!validateForm()) return;

  var skillArr = fSkills.value.split(",").map(function(s) {
    return s.trim();
  }).filter(function(s) {
    return s.length > 0;
  });

  var newMember = {
    id: nextId++,
    isMine: false,
    name: fName.value.trim(),
    part: fPart.value,
    intro: fIntro.value.trim(),
    bio: fBio.value.trim(),
    skills: skillArr,
    email: fEmail.value.trim(),
    phone: fPhone.value.trim(),
    website: fWebsite.value.trim(),
    quote: fQuote.value.trim(),
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80"
  };

  members.push(newMember);

  cardGrid.appendChild(createSummaryCard(newMember));
  detailList.appendChild(createDetailCard(newMember));

  updateTotal();

  closeForm();
});


btnDeleteLast.addEventListener("click", function() {
  if (members.length === 0) return;

  var last = members[members.length - 1];
  members.pop();

  var summaryCard = cardGrid.querySelector('[data-id="' + last.id + '"]');
  if (summaryCard) summaryCard.remove();

  var detailCard = detailList.querySelector('[data-id="' + last.id + '"]');
  if (detailCard) detailCard.remove();

  updateTotal();
});


renderAll();