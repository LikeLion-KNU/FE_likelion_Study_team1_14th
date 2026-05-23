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

## html
### 철저히 갈아엎었습니다.

일단 첫 과제의 제 html, css과 이번 과제의 html, css코드를 비교해 보시면 <br>

>어? 이 사람 거의 다 바뀌었는데?

싶으실 겁니다... <br>
이게 참, 이게 참 AI의 도움을 본격적으로 받아들이다보니 <br>
제 이전 코드들의 구조를 비교하면 거의 중학교, 고등학교 수준이더라구요. <br>
그래서 <br>

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