# 아기사자 홍지환 0524 트러블슈팅
>우선 이 트러블 슈팅 md는 철저히 가볍게 작성되었습니다. <br>
그 이유로는 <br>
1 기간이 생각보다 적었다. <br>
2 생각보다 난이도가 높아 AI의 도움을 많이 받았다. <br>
3 AI는 신이다. 그저 GOD <br>
입니다.<br> <br>
따라서 이는 사실 트러블슈팅이라기 보다는 <br>
내가 이걸 어려워해서 AI에게 물어보았고 <br>
그 질문에 대한 AI의 대답, AI가 다듬어준 내용, AI가 써준 코드에 대한 리뷰 <br>
가 주된 내용이라 보아도 무방합니다. <br>
그렇기에 이 md 는 철저히 가볍습니다. (제 기준으로는요. *AI는 신이다!*) <br>
*이 markdown은 사실 readMe일지도... <br> ps. 사실 과제의 기간이 5.24이기 때문에 이 md는 계속 업데이트 될 수 있습니다. 제 욕심입니다.*

## 목차
1. [문제점](#문제점)
2. [원인](#원인)
3. [해결](#해결)
## 코드리뷰 ReadMe 목차
1. [html](#html)
2. [css](#css)
3. [js](#js)

# 문제점
## problem.html
시맨틱 태그들을 막 썻음
## problem.css
hidden을 설정했는 데도 보임
## problem.js
분명 배열에 넣어 랜덤을 불러왔는 데 안불려와졌음

# 원인
## problem.html
시맨틱 태그들에 대한 이해도 부족
## problem.css
css 우선도 점수가 동일하여 나중에 쓴 코드에 덮어씌워짐
## problem.js
배열에 push 할 시에 배열 자체를 넣게 되어 배열 안에 배열을 넣게 된거임

# 해결
## problem.html
시맨틱 코드의 사용을 줄이고 사실상 사용한 건 <main>하나만 사용
## problem.css
!important를 사용하여 제일 우선도를 높였음
## problem.js
lions.push(...newUsers); 와 같이 ...을 넣음으로써 배열을 풀어서 넣음

> 이제 코드리뷰이자 코드ReadMe로 가보죠
## html
### 철저히 갈아엎었습니다.

일단 첫 과제의 제 html, css과 이번 과제의 html, css코드를 비교해 보시면 <br>

>어? 이 사람 거의 다 바뀌었는데?

싶으실 겁니다... <br>
이게 참, 이게 참 AI의 도움을 본격적으로 받아들이다보니 <br>
제 이전 코드들의 구조를 비교하면 거의 중학교, 고등학교 수준이더라구요. <br>
그래서 <br>
#### 시맨틱 태그들의 변경

```
<header>
    <div class="card mini-card">
        <img src="./images/profile.jpg" alt="프로필 이미지" class="profile-img" />
        <h2 class="name">홍지환</h2>
        <p class="role">Frontend</p>
        <p class="desc">프론트 배우는 아기사자입니다!</p>
    </div>
</header>
<main>
    <div class="card detail-card">
        <section class="detail-header">
        <h1 class="name-large">홍지환</h1>
        <p class="role">Frontend</p>
        <p class="track-name">LION TRACK</p>
        </section>

        <section class="introduction">
        <h3 class="section-title">자기소개</h3>
        <p class="section-text">웹 개발에 대해 좀 더 열심히 배우고 발전해가고 싶습니다. 앞으로 잘부탁드립니다.</p>
        </section>

        <section class="call">
        <h3 class="section-title">연락처</h3>
        <ul class="section-list">
            <li>Email: hjho1087@naver.com</li>
            <li>Phone: 010-2101-1087</li>
            <li>Website: <a href="https://github.com/jihwa0603" target="_blank">https://github.com/jihwa0603</a></li>
        </ul>
        </section>

        <section class="interest">
        <h3 class="section-title">관심 기술</h3>
        <ul class="section-list">
            <li>HTML/CSS</li>
            <li>JavaScript</li>
            <li><mark>React</mark></li>
        </ul>
        </section>

        <section class="quote">
        <h3 class="section-title">한 마디</h3>
        <p class="section-text">열심히 배우고 <strong>팀원으로 받고싶은</strong> 개발자가 되겠습니다!</p>
        </section>
    </div>
</main>
```
와 같은 header와 main의 시맨틱 태그들을 <br>
```
<main>
    <section class="card-section">
        <div id="summary-container" class="grid-container">
            <!-- 1번 -->
            <div class="card mini-card">
            <div class="badge">FrontEnd</div>
            <img src="./images/profile.jpg" alt="프로필 이미지" class="profile-img" />

            <div class="card-text-content">
                <h2 class="name">홍지환(본체)</h2>
                <p class="role">Frontend</p>
                <p class="desc">프론트 배우는 아기사자입니다!</p>
            </div>
        </div>
            ...중략
    </section>
    <!-- 상세 정보 -->
    <section class="detail-section">
    <div id="detail-container" class="list-container">
        <!-- 1번 -->
        <div class="card detail-card">
            <section class="detail-header">
                <h1 class="name-large">홍지환(본체)</h1>
                <p class="role">Frontend</p>
                <p class="track-name">LION TRACK</p>
            </section>

            <section class="introduction">
                <h3 class="section-title">자기소개</h3>
                <p class="section-text">웹 개발에 대해 좀 더 열심히 배우고 발전해가고 싶습니다. 앞으로 잘부탁드립니다.</p>
            </section>

            <section class="call">
                <h3 class="section-title">연락처</h3>
                <ul class="section-list">
                <li>Email: hjho1087@naver.com</li>
                <li>Phone: 010-2101-1087</li>
                <li>Website: <a href="https://github.com/jihwa0603" target="_blank">https://github.com/jihwa0603</a></li>
                </ul>
            </section>

            <section class="interest">
                <h3 class="section-title">관심 기술</h3>
                <ul class="section-list">
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li><mark>React</mark></li>
                </ul>
            </section>

            <section class="quote">
                <h3 class="section-title">한 마디</h3>
                <p class="section-text">열심히 배우고 <strong>팀원으로 받고싶은</strong> 개발자가 되겠습니다!</p>
            </section>
        </div>
    </div>
    </section>
</main>
```
와 같이 작은 형식의 전체 main으로 묶었습니다. <br>
사실 이전의 작은 카드들을 header로 구분하기에는 맞지않기 때문입니다. <br>

그리고 이제 form에 대한 조건으로 <br>
> _**보였다가 안보인다(접고 펼친다)**_ <br>

가 조건이였습니다. 이에 대해서는 <br>

```
class="form-container hidden"
```
와 같이 필요한 클래스와 hidden이라는 클래스를 추가로 집어 넣었습니다. <br>

이를 css와 연계하여 구현하였습니다. <br>
이렇게 html 파트는 끝났습니다. <br>

<div align="right">
    [목차로 돌아가기](#목차)
</div>


## css
### 그리드, 플렉스, hidden

우선 hidden부터 설명해보고자 합니다. <br>
#### hidden의 문제점
```
.hidden { 
    display: none !important; 
}
```
와 같이 작성하였는데요. <br>
여기서 중요한건 **!important**였습니다. <br>
기존에 없이 작성하였을 때에는 단순히 클래스 명시로 css를 작성할 때에 <br>
**우선순위 점수가 동일하는 경우가 많았습니다** <br>
그렇기에 나중에 작성되는 코드들에 의해 효과가 없어졌습니다. <br>
그렇기에 **!important**를 붙여 해결하였습니다. <br> <br>

#### 보는 화면에 따라 카드 갯수 다르게
이제 그리드로 넘어가겠습니다. <br>
**그리드에서 문제는 보는 화면마다 크기를 다르게 하라** <br>
였습니다. <br>
처음에는 
```
@media (max-width: 768px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
}
```
와 같이 @media를 통해 해결하려고 했으나 <br>
이는 결국 모니터, 태블릿, 휴대폰 같이 특정 크기를 이용한 제한이였기에 마음에 들지 않았습니다. <br>
따라서
```
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}
```
repeat를 이용하여 각 열의 최소, 최대 크기만 정해준 이후 자동 계산하는 방식으로 해결하였습니다. <br>

#### 플렉스는 사실 별거 없습니다.
그냥 상세 카드들을 세로로 나열, align-items를 활용해 컨테이너 내부의 것들을 세로 중간 정렬입니다.

<div align="right">
    [목차로 돌아가기](#목차)
</div>

## js
### DOM 구조에 대한 접근 방식
사실 js는 처음부터 막막했습니다.<br>
어떻게 새로운 걸 집어넣고 다시 빼내야 하는 지 막막했거든요. <br>
해결 방식은 단순했습니다. <br>

lion과 같이 기존 요소들을 집어넣을 변수들을 만들고
```
const addForm = document.getElementById('add-form');
const summaryContainer = document.getElementById('summary-container');
const detailContainer = document.getElementById('detail-container');
const totalCountText = document.getElementById('total-count');
const emptyState = document.getElementById('empty-state');
```
와 같이 내가 건드릴 것들에 대한 것들만 가져오면 되었거든요. <br>

그 후 
```
document.getElementById('btn-add-1-random').addEventListener('click', () => {
    executeAsyncAction('add1', async () => {
        const newUsers = await fetchRandomUsers(1);
        lions.push(...newUsers);
    });
});
```
와 같이 lion이라는 전체 카드들에 대한 정보들을 저장해둔 곳에 push를 해줍니다. <br>


여기서 또 문제였던 부분은 
```
lions.push(...newUsers);
```
이 부분입니다. <br>
처음에는 ...을 안넣고 그냥 했다가 배열 안에 배열이 생기는 문제가 발생했었습니다. <br>

마지막으로 새로운 랜덤 사람을 추가하는 부분입니다.
```
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
```
여기서 return을 어떻게 시켜줘야되나 싶었는 데 <br>
**map(내부 함수)**를 활용하여 각 유저에 대한 데이터를 설정하여 집어넣어줬습니다.

<div align="right">
    [목차로 돌아가기](#목차)
</div>

> 이상으로 제 트러블슈팅이였던 코드리뷰 ReadMe 였습니다.