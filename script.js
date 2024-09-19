const btn = document.getElementById("submit");
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    let formData = getData();
    // get inputs from container class
  const inputs = document.querySelectorAll(".container input");
  let allFieldsFilled = true;    //  go through each input to trim space before and after the content and says if conditino is empty that every input field is empty
  inputs.forEach(input=>{
    if(input.ariaValueMax.trim()===""){
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
        savedData(formData);
    }else{
        alert("Student Roll No already exists");

    }
 }else{
     //  else updateData function with formData is displayed and clearData function is executed
    updateData(formData);
 }
 clearData();
});