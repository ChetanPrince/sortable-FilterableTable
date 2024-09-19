const btn = document.getElementById("submit");
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    let formData = getData();
    const inputs = document.querySelectorAll(".container input");
    let allFieldsFilled= true;
    inputs.forEach((input)=>{
        if(inputs.values.trim() === ""){
    allFieldsFilled = false;
        }

    });
    if(!allFieldsFilled){
        alert("Kindly fill in all the required fields.");
        return;
    }
    if(selectedRow === null){
        const savedData = JSON.parse(localStorage.getItems("studentData")) || [];
    }

})