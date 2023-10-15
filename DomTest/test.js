import MockLists from "./lists.json" assert { type: "json" };

// 샘플리스트 초기화
window.onload = function () {
  resetList();
};

// 문제 4번
const $teInput = document.getElementById(`te_input`);
$teInput.maxLength = 10;
console.log($teInput);
const regExp = /^[0-9]$/;
$teInput.addEventListener("keydown", (e) => {
  const inputValue = e.key;
  const isValid = regExp.test(inputValue);
  if (isValid) {
    alert("숫자가 입력 되었습니다 글자만 입력해주세요");
    e.preventDefault();
  } else {
  }
});

// 문제 5번
const $form = document.getElementById("form");
const $saveBtn = document.getElementById("send");
$saveBtn.className = "tab";
const $listData = document.getElementById("list_data");
const $list = document.getElementById("list");

// 리스트 렌더
const renderList = (list) => {
  const $content = document.createElement("li");
  const $editBtn = document.createElement("button");
  const $deleteBtn = document.createElement("button");

  $content.className = "content";
  $content.innerHTML = list.content;
  $editBtn.className = "tab";
  $deleteBtn.className = "tab";
  $editBtn.innerText = "수정";
  $deleteBtn.innerText = "삭제";

  $editBtn.addEventListener("click", editList);
  $deleteBtn.addEventListener("click", deleteList);

  $content.setAttribute("data-role", list.id);

  $content.append($editBtn);
  $content.append($deleteBtn);
  $list.append($content);
  $form.append($list);
};

for (let list of MockLists) {
  renderList({
    ...list, //id, content 의 얕은 복사
  });
}

// 리스트 추가
$saveBtn.addEventListener("click", addList);

function addList(event) {
  if ($listData.value == "") {
    event.preventDefault();
    return;
  }
  const newList = {
    id: Math.floor(Math.random() * 10000000),
    content: $listData.value,
  };

  MockLists.push(newList);
  renderList(newList);
  $listData.value = "";

  event.preventDefault();
}

// 리스트 초기화
$form.addEventListener("reset", resetList);

function resetList(event) {
  $list.innerHTML = "";
  MockLists.splice(0, MockLists.length);
}

// 문제 6번
// 리스트 수정
function editList(event) {
  const list = event.target.parentNode;
  const listId = list.getAttribute("data-role");
  const editListIndex = MockLists.findIndex(
    (list) => list.id === parseInt(listId)
  );
  const $isExistInput = document.querySelectorAll(".liinput");
  if ($isExistInput.length == 1) {
    event.preventDefault();
    return;
  } else {
    const $editInput = document.createElement("input");
    const $editSaveBtn = document.createElement("button");
    $editSaveBtn.innerText = "저장";
    $editInput.className = "liinput";

    $editSaveBtn.addEventListener("click", function () {
      MockLists[editListIndex].content = $editInput.value;
      $list.innerHTML = "";
      for (let list of MockLists) {
        renderList({ ...list });
      }
      list.removeChild($editInput);
      list.removeChild($editSaveBtn);
      event.preventDefault();
    });
    list.append($editInput, $editSaveBtn);
    event.preventDefault();
  }
}

// 리스트 삭제
function deleteList(event) {
  const list = event.target.parentNode;
  const listId = list.getAttribute("data-role");
  const deleteListIndex = MockLists.findIndex(
    (list) => list.id === parseInt(listId)
  );
  MockLists.splice(deleteListIndex, 1);
  $list.innerHTML = "";
  for (let list of MockLists) {
    renderList({ ...list });
  }
  event.preventDefault();
}
