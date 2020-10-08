// console.log('welcome to notes app');
shownotes();
// if the user add a note then add it to the local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt');
    let notes = localStorage.getItem('notes');
    // i am storing the data (notes) in one of the data structure which is ARRAY
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    // updating the local storage after getting the array of notes 
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // clearing the written data on the text area after clicking the button
    addtxt.value = "";
    // console.log(notesObj);
    // after cicking we want to display the notes also
    shownotes();
})

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Notes ${index+1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`
        
    });

    let noteselem = document.getElementById('notes');
    if(notesObj.length != 0){
        noteselem.innerHTML = html;
    } 
    else{
        noteselem.innerHTML = `Nothing to show ! Go to the ADD NOTES above`;
    }
}

// function for deleting the notes
function deleteNote(index){
    // console.log('i am deleting' , index);
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index , 1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    shownotes();
}

let search = document.getElementById('searchtxt');
search.addEventListener("input" , function(){
    let inputVal = search.value;
    console.log('input event fired' , inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardtxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardtxt);
        if(cardtxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})