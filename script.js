// So far problem is the data needs to check whether inputs are empty if are then submit button should show an error and if are filled then should proceed with saving and then onwards



const button = document.getElementsByTagName("button")[0];
button.addEventListener("click", ()=>{
    const formData = getData();
    const table = document.querySelector(".output tbody");
    const tr = document.createElement("tr");
    const inputs = document.querySelectorAll(".container input");
    inputs.forEach(input=>{
        console.log(typeof input.value);

        if(input.value === ""){
            alert("kindly fill the required fields");
        }
        else{
            tr.innerHTML = `<td>${formData.name}</td><td>${formData.studentRollNo}</td><td>${formData.studentRanking}</td><td>${formData.studentGrade}</td><td><button onclick="edit()">Edit</button></td><td><button onclick="deleteRow">Delete</button></td>`
            table.appendChild(tr);
            saveData(formData);
            clearData();
        }
    })
});


function getData(){
    return{
        name: document.getElementById("studentName").value,
        studentRollNo: document.getElementById("studentRollNo").value,
        studentRanking: document.getElementById("studentRanking").value,
        studentGrade: document.getElementById("studentGrade").value
    };
}
function clearData(){
    document.getElementById("studentName").value = "";
    document.getElementById("studentRollNo").value="";
    document.getElementById("studentRanking").value="";
    document.getElementById("studentGrade").value = "";
}
// function saveData(formData){
//   let savedData = JSON.parse(localStorage.getItem("studentData"))|| [];
//   savedData.push(formData);
//   localStorage.setItem("studentData", JSON.stringify(savedData));
// }

// function loadData(){
//     const savedData = JSON.parse(localStorage.getItem("studentData")) || [];
//     const table = document.querySelector(".output tbody");
//     savedData.forEach((data)=>{
//         const tr = document.createElement("tr");
//         tr.innerHTML = `<td>${data.name}</td><td>${data.studentRollNo}</td><td>${data.studentRanking}</td><td>${data.studentGrade}</td>`;
//         table.appendChild(tr);
    
// });}


// window.onload = loadData;
