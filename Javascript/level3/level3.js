/* 
레시피 재료 추가하기
*/

const $inputIngredient = document.getElementsByName("ingredient")[0];
const $inputWeight = document.getElementsByName("weight")[0];
const $buttonAdd = document.querySelector("form button");
const $buttonSubmit = document.getElementById("submit_button");

const $table = document.querySelector("table");

$buttonAdd.addEventListener("click", (e) => {
  const $existIngredient = document.querySelectorAll(".ingredientName");
  const isExist = Array.from($existIngredient).some((x) => {
    return x.innerText === $inputIngredient.value;
  });
  if (isExist) {
    alert("이미 존재하는 재료명입니다");
    $inputIngredient.value = "";
    $inputWeight.value = "";
    e.preventDefault();
    return;
  }
  const $tr = document.createElement("tr");
  const $td1 = document.createElement("td");
  const $td2 = document.createElement("td");
  const $td3 = document.createElement("td");
  const $deleteBtn = document.createElement("button");
  $deleteBtn.innerText = "삭제";
  $deleteBtn.addEventListener("click", (e) => {
    $tr.remove();
  });
  $td1.innerText = $inputIngredient.value;
  $td1.className = "ingredientName";
  $td2.innerText = $inputWeight.value;
  $td2.className = "ingredientWeight";
  $td3.append($deleteBtn);
  $tr.append($td1, $td2, $td3);
  $table.append($tr);
  $inputIngredient.value = "";
  $inputWeight.value = "";
  e.preventDefault();
});

$buttonSubmit.addEventListener("click", (e) => {
  const $ul = document.getElementById("ingredient-list");
  $ul.innerHTML = "";
  const $existIngredient = document.querySelectorAll(".ingredientName");
  const $existWeight = document.querySelectorAll(".ingredientWeight");
  for (let i = 0; i < $existIngredient.length; i++) {
    const $li = document.createElement("li");
    $li.innerText = `${$existIngredient[i].innerText} : ${$existWeight[i].innerText}`;
    $ul.append($li);
  }
  e.preventDefault();
});
