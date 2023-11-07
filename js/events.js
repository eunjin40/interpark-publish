window.addEventListener("load", function () {
  // visual 슬라이드 데이터 연동
  // 백엔드 Response 데이터
  const xh = new XMLHttpRequest(); // XHR
  xh.open("GET", "events.json");
  xh.send();
  xh.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // 문자열을 js 에서 사용하는 !!!! json 데이터 !!! 변환
      const result = JSON.parse(event.target.response);
      // 현재 화면 출력에 활용을 하지는 않고 있어요.
      makeEventsSlideHtml(result);
    }
  };

  // visual 슬라이드 내용 채우는 기능
  function makeEventsSlideHtml(_data) {
    const eventsRes = _data;
    // 출력을 시켜줄 문장을 만들자.
    let eventsHtml = "";

    // total 만큼 반복하자.
    // for 은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 1; i <= eventsRes.total; i++) {
      const temp = `
      <div class="swiper-slide">
          <div class="events-slide-item">
              <a href="${eventsRes["events_" + i].url}">
                  <img src="${eventsRes["events_" + i].file}" alt="${
        eventsRes["events_" + i].url
      }" />
              </a>
          </div>
      </div>
    `;
      eventsHtml += temp;
    }

    // 어디다가 자료를 출력할 것인지 지정
    const eventsSlide = document.querySelector(".events-slide .swiper-wrapper");
    eventsSlide.innerHTML = eventsHtml;

    var swiper = new Swiper(".events-slide", {
      slidesPerView: 4, // 슬라이드 몇장씩 보여주니
      spaceBetween: 28, // 보여지는 슬라이드 간의 간격?
      Loop: true, // 반복해서 무한루프
      // 자동 실행
      autoplay: {
        delay: 3000, // 대기시간
        disableOnInteraction: false, // 사용자 터치후 자동실행 다시
      },
      speed: 500, // 이동 속도 : 1000 은 1초
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".events-slide-wrap .slide-next-bt",
        prevEl: ".events-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 4,
    });
  }
});
