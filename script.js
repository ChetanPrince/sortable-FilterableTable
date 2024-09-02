//  look for an api to search for this sort of data after clicking search button
        // In this case user will search for a country Name and directly search for that item through api 
        

//  and upon retreiving then after clicking add button the data should be saved in local storage

    //then the data should have headings exact matching to the retreived data which means either i should have th already mentioned after reading apu docs or those should dynamically be added if api suggests so doing 

//  then on each heading for each method add an event listener and upon click the function should reflect so each button will have its functionality so if else statements will guide the user 




const button = document.getElementsByTagName("button");
button.addEventListener("click", ()=>{

    const table = document.querySelector(".output, tbody[0]");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>Item1</td><td>item2</td><td>item3</td><td>item4</td>`
    table.appendChild(tr);
    // tr.innerHTML= `<td>${input[0]}</td>
    // <td>${input[1]}</td>
    // <td>${input[2]}</td>
    // <td>${input[3]}</td>`
})