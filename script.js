const btn = document.getElementById("submit");
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    let formData = getData();
    // get inputs from container class
    const inputs = document.querySelectorAll(".container input");
    let allFieldsFilled = true;
  inputs.forEach((input)=>{
    if(input.value.trim()===""){
        allFieldsFilled = false;
    }
});
    //  go through each input to trim space before and after the content and says if conditino is empty that every input field is empty

    //  out of the loop conditio is checked if all fields are filled and then alert is displayed with return keyword
 if(!allFieldsFilled){
    alert("Kindly fill all the fields with appropriate data!");
 }
 // further condition is checked if selected row is null and emptu then savedData constant is parsed into local storage and get any data if is available or it is empty array
 if(selectedRow === null){
    const savedData = JSON.parse(localStorage.getItem("studentData"))||[];
    const rollNoExists = savedData.some(data=>data.studentRollNo === formData.studentRollNo);
    if(!rollNoExists){
        savedData(formData);
    }else{alert("student Roll No already exists.")}
 }
 else{
    updataData(formData);
 }
 clearData();
 
    //  const rollNoExists check inside savedData amd .some method check if student roll no is equal to formDat.studentRollNo

        // then if condition check if not roll no exists exists then saveData function is applied or else alert is diplayed
     
    //  else updateData function with formData is displayed and clearData function is executed
    

});