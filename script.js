let selectedRow = null;
const btn = document.getElementById("submit");
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    let formData = getData();
    // get inputs from container class
  const inputs = document.querySelectorAll(".container input");
  let allFieldsFilled = true;    //  go through each input to trim space before and after the content and says if conditino is empty that every input field is empty
  inputs.forEach(input=>{
    if(input.value.trim()===""){
        allFieldsFilled = false;
    }
})

//  out of the loop conditio is checked if all fields are filled and then alert is displayed with return keyword
if(!allFieldsFilled){
    alert("kindly fill the required fields");
    return;
}

 // further condition is checked if selected row is null and emptu then savedData constant is parsed into local storage and get any data if is available or it is empty array
 
 if(selectedRow === null){
    const savedData = JSON.parse(localStorage.getItem("studentData"))||[];
    //  const rollNoExists check inside savedData amd .some method check if student roll no is equal to formDat.studentRollNo
    const rollNoExists = savedData.some(data=>data.studentRollNo === formData.studentRollNo);
    // then if condition check if not roll no exists exists then saveData function is applied or else alert is diplayed
    if(!rollNoExists){
        saveData(formData);
    }else{
        alert("Student Roll No already exists");

    }
 }else{
     //  else updateData function with formData is displayed and clearData function is executed
    updateData(formData);
 }
 clearData();
});

function getData(){
    return{
        name: document.getElementById("studentName").value,
        rollNo: document.getElementById("studentRollNo").value,
        ranking: document.getElementById("studentRanking").value,
        grade: document.getElementById("studentGrade").value,
        attendance: document.getElementById("studentAttendance").value,
        marks: document.getElementById("studentMarks").value
    };
}


function saveData(formData){
    const table = document.querySelector(".output tbody");
    const tr  = document.createElement("tr");
    tr.innerHTML = `<td>${formData.name}</td><td>${formData.rollNo}</td><td>${formData.ranking}</td><td>${formData.grade}</td><td>${formData.attendance}%</td><td>${formData.marks}</td><td id="edit" onClick="edit(this)"><button>Edit</button></td><td id="delete" onClick="deleteRow(this)"><button>delete</button></td>`;
    table.appendChild(tr);
let savedData = JSON.parse(localStorage.getItem("studentData"))||[];
savedData.push(formData);
localStorage.setItems("studentData", JSON.stringify(savedData));


    
}
function clearData(){
    document.getElementById("studentName").value = "";
    document.getElementById("studentRollNo").value="";
    document.getElementById("studentRanking").value="";
    document.getElementById("studentGrade").value="";
    document.getElementById("studentAttendance").value="";
    document.getElementById("studentMarks").value="";
}
function edit(td){
    selectedRow = td.parentElement;
    console.log(selectedRow);
    document.getElementById("studentName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("studentRollNo").value=selectedRow.cells[1].innerHTML;
    document.getElementById("studentRanking").value=selectedRow.cells[2].innerHTML;
    document.getElementById("studentGrade").value=selectedRow.cells[3].innerHTML;
    document.getElementById("studentAttendance").value=parseInt(selectedRow.cells[4].innerHTML);
    document.getElementById("studentMarks").value=selectedRow.cells[5].innerHTML;
}
function updateData(formData){
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.rollNo;
    selectedRow.cells[2].innerHTML = formData.ranking;
    selectedRow.cells[3].innerHTML = formData.grade;
    selectedRow.cells[4].innerHTML = formData.attendance+"%";
    selectedRow.cells[5].innerHTML = formData.marks;
    let savedData = JSON.parse(localStorage.getItem("studentData"))||[];
    const updatedData = savedData.filter(data=>data.studentRollNo!==formData["studentRollNo"]);
    updatedData.push(formData);
    localStorage.setItem("studentData", JSON.stringify(updatedData));
    selectedRow = null;
}
function deleteRow(td){
    selectedRow = td.parentElement;
    const table = document.querySelectorAll(".output tbody");
    if(confirm("Are you sure you want to delete this record?")){  
        selectedRow.remove();
    }
    console.log(selectedRow);
    selectedRow = null;
}
windows.onload=loadData;
function loadData(){

}