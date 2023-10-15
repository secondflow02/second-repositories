import { RESERVATION_LIST } from "./reservation .js";
// console.log(RESERVATION_LIST);

/* 
예약 고객확인하기


*/
const $inputName = document.getElementsByName("user-name")[0];
const $inputPhone = document.getElementsByName("user-phone")[0];
const $check = document.querySelector("button");
const $reservationNumber = document.getElementById("reservation-number");

$check.addEventListener("click", (e) => {
  const checkName = RESERVATION_LIST.find((i) => i.name == $inputName.value);
  const checkPhone = RESERVATION_LIST.find((i) => i.phone == $inputPhone.value);
  if (checkName === checkPhone && checkName !== (null || undefined)) {
    $reservationNumber.innerText = checkName.number;
    console.log($reservationNumber.innerText);
  } else {
    $reservationNumber.innerText = "일치하는 항목이 없습니다";
    alert("일치하는 항목이 없습니다");
    console.log("일치하는 항목이 없습니다");
  }
  e.preventDefault();
});
