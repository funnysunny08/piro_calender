//const date = new Date(); //현재 날짜 객체 만들기 방법

const makeCalender = () => {
  const viewYear = date.getFullYear(); //2022
  const viewMonth = date.getMonth(); //7

  // 캘린더 연도, 달 채우기
  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  //이번 달 마지막 날짜 가져오기
  const thisLast = new Date(viewYear, viewMonth + 1, 0); //<< 지정 날짜 객체 만들기
  const thisDate = thisLast.getDate(); // 31
  const thisDay = thisLast.getDay(); // 0

  //저번 달 마지막 날짜 가져오기
  const prevLast = new Date(viewYear, viewMonth, 0);
  const prevDate = prevLast.getDate(); // 30
  const prevDay = prevLast.getDay(); // 4

  //전체 날짜를 만들기 위한 배열 만들기
  const prevDates = [];
  const thisDates = [...Array(thisDate + 1).keys()].slice(1);
  const nextDates = [];

  // 6 = 토요일, 전 달 마지막 요일이 토요일일 경우 그릴 필요가 없다!
  // 이전 달 날짜들을 만들어주는 코드!

  if (prevDay !== 6) {
    for (let i = 0; i < prevDay + 1; i++) {
      prevDates.unshift(prevDate - i);
    }
  }

  for (let i = 1; i < 7 - thisDay; i++) {
    nextDates.push(i);
  }

  // // ~~~~ 현재과정 ~~~
  // prevDates [26 27 28 29 30]
  // thisDates [1, 2, ~~ 30, 31]
  // nextDates [1, 2, 3, 4, 5, 6]

  //dates [26 ~~~ 6]

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1); // 1이라는 원소의 index
  const lastDateIndex = dates.lastIndexOf(thisDate); // lastIndexof --> 뒤에서 부터 찾음!

  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";

    // if (i >= firstDateIndex && i < lastDateIndex + 1) {
    //   const condition = "this";
    // } else {
    //   const condition = "other";
    // }
    dates[
      i
    ] = `<div class="date"><span class="${condition}">${date}</span></div>`;
  });

  console.log(dates);

  // //div로 감싸서 다시 배열 넣주기
  // dates.forEach((date, i) => {
  //   dates[i] = `<div class="date">${date}</div>`;
  // });

  // dates [26 27 28 29 .~~~~~ 1 2 3 4 5 6]
  // dates [<div class="date">26</div>, <div class="date">27</div> ~~~~~~ <div class="date">6</div>]

  //Dates 그리기
  document.querySelector(".dates").innerHTML = dates.join("");

  // 오늘 날짜 그리기
  const today = new Date();

  if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerHTML === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }
};

let date = new Date();
makeCalender();
// 이전 달로 이동
const prevMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  makeCalender();
};

// 이번 달로 이동
const curMonth = () => {
  date = new Date();
  makeCalender();
};

// 다음 달로 이동
const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  makeCalender();
};
