import { BANK_LIST, ACCOUNT_FORM } from "./account.js";

// console.log(BANK_LIST);
// console.log(ACCOUNT_FORM);

const $bankSelector = document.getElementById("bank-selector");

// 은행 리스트
for (const bankId in BANK_LIST) {
  if (BANK_LIST.hasOwnProperty(bankId)) {
    const option = document.createElement("option");
    option.value = bankId;
    option.text = BANK_LIST[bankId];
    $bankSelector.appendChild(option);
  }
}
let selectedBank = 1;

// 선택된 은행 변수화
$bankSelector.addEventListener("change", (e) => {
  selectedBank = e.target.value;
});

const $input = document.getElementById("account-input");
const $submitBtn = document.querySelector("button");
const regExp = /^[0-9]+$/;

// 제출 누르면 이벤트 발생 (메인 이벤트)
$submitBtn.addEventListener("click", (e) => {
  if (!regExp.test($input.value)) {
    alert("숫자만 입력해주세요");
  }
  if ($input.value.length > 0 && $input.value.length < 12) {
    alert("계좌번호는 12자리 입니다");
  }
  if (regExp.test($input.value) && $input.value.length == 12) {
    const parsedAccountNumber = parseAccountNumber($input.value);
    const accountFormNumber = accountForm(parsedAccountNumber);
    const $ul = document.getElementById("account-list");
    const $newli = document.createElement("li");
    $newli.append(`${BANK_LIST[selectedBank]} : ${accountFormNumber}`);
    $ul.append($newli);
  }
  $input.value = "";
  e.preventDefault();
});

// 입력된 계좌번호 앞 뒤 두 자리 마스킹
function parseAccountNumber(AccountNumber) {
  const firstTwoDigits = AccountNumber.substring(0, 2);
  const lastTwoDigits = AccountNumber.substring(10, 12);
  const maskedAccountNumber = `${firstTwoDigits}********${lastTwoDigits}`;
  const accountArray = Array.from(maskedAccountNumber);
  return accountArray;
}

// 각 은행의 포맷에 맞추어 변경
function accountForm(x) {
  const accountFormat = Array.from(ACCOUNT_FORM[selectedBank]);
  let new_x = "";
  for (let i = 0; i < accountFormat.length; i++) {
    if (accountFormat[i] == 0) {
      new_x += x[i];
    } else {
      new_x += accountFormat[i];
      x.splice(i, 0, "");
    }
  }
  return new_x;
}
