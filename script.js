// selectors

let namedata = document.getElementById("item-name");  //input value
let date = document.getElementById("deadline");       //date input
let priority = document.getElementById("priority");   //priority input
let btn = document.getElementById("addItem");         //button click
let array = [];                                       //empty array to store today/future task
let completearray = [];                               //empty array to store completed task

//----------------------------------------------------------------------------------------------

// date condition check
var d1 = new Date();
console.log(d1);

const datesAreOnSameDay = (first, second) => first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
//----------------------------------------------------------------------------------------------

// Get data from local storage in form of object
let objStr = localStorage.getItem("data");
if (objStr != null) {
  array = JSON.parse(objStr);
  console.log(array);
}

//Add a new task
btn.onclick = () => {
// -----------------------------------------------------

let date2 = new Date(date.value);
console.log(datesAreOnSameDay(d1, date2));
// -----------------------------------------------------

  let nameVal = namedata.value;
  let dateVal = date.value;
  let priorityVal = priority.value;

  if (nameVal && dateVal && priorityVal) {
    document.getElementById("error").innerHTML = "";
    let todoData = {
      ItemName: nameVal,
      Deadline: dateVal,
      Priority: priorityVal,
    };
    array.push(todoData);
    saveData(array);
    console.log(array);
  } else {
    console.log("error");
    document.getElementById("error").innerHTML = "Please Fill All The Inputs";
  }
  namedata.value = "";
  date.value = "";
  priority.value = "";
};

// store task data in local storage in form of string
function saveData(array) {
  let str = JSON.stringify(array);
  localStorage.setItem("data", str);
  showData();
}

// show To-Do data in table
function showData() {
  let tableData = "";
  document.getElementById("t-body").innerHTML = "";
  document.getElementById("t-future").innerHTML = "";

  array.forEach((e, i) => {
    tableData += `
        <tr>
            <td>${i + 1}. ${e.ItemName}</td>
            <td>${e.Deadline}</td>
            <td>${e.Priority}</td>
            <td><button onclick="completeToDo(${i})"><i class='fa fa-check-square-o' style='font-size:18px;color:white'></i></button>
            <button onclick="deleteData(${i})"><i class="fa fa-trash-o" style='font-size:18px;color:white'></i></button></td>
        </tr>
        `;
    document.getElementById("t-body").innerHTML = tableData;
  });


  // if (datesAreOnSameDay(d1, date2) == true) {
    
  // } else {
  //   array.forEach((e, i) => {
  //     tableData += `
  //         <tr>
  //             <td>${i + 1}. ${e.ItemName}</td>
  //             <td>${e.Deadline}</td>
  //             <td>${e.Priority}</td>
  //             <td><button onclick="completeToDo(${i})"><i class='fa fa-check-square-o' style='font-size:18px;color:white'></i></button>
  //             <button onclick="deleteData(${i})"><i class="fa fa-trash-o" style='font-size:18px;color:white'></i></button></td>
  //         </tr>
  //         `;
  //     document.getElementById("t-future").innerHTML = tableData;
  //   });
  // }

  let checkData = "";
  document.getElementById("t-complete").innerHTML = "";
  completearray.forEach((e, i) => {
    checkData += `
        <tr>
            <td>${i + 1}. ${e.ItemName}</td>
            <td>${e.Deadline}</td>
            <td>${e.Priority}</td>
            <td><button onclick="deleteCompleteData(${i})"><i class="fa fa-trash-o" style='font-size:18px;color:white'></i></button></td>
        </tr>
        `;
    document.getElementById("t-complete").innerHTML = checkData;
  });
}
showData();

//Delete an existing task
function deleteData(id) {
  console.log("delete");
  array.splice(id, 1);
  saveData(array);
}

// Delete a complete task
function deleteCompleteData(id) {
  console.log("deleteComplete");
  completearray.splice(id, 1);
  saveData(completearray);
}

// complete an existing task
let completeId = null;
function completeToDo(id) {
  // alert('check')
  console.log("check");
  const remove = array.splice(id, 1);
  completearray.push(remove[0]);
  showData();
}
