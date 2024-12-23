/* var xhr = new XMLHttpRequest();
var vhr = new XMLHttpRequest();
var cardinner = document.getElementsByClassName("card");

var titleinput = document.getElementById("titleInput").value;
var descinput = document.getElementById("descriptionInput").value;

xhr.open("GET", "http://localhost:8000/notes");

vhr.open("POST", "db.json");

// display data by click on button
function displayData() {
  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.response);

      for (let i = 0; i < data.length; i++) {
        document.getElementById("cards").innerHTML += `
      <div class="card" style="width: 18rem">
      <div class="card-body">
          <h5 class="card-title">${data[i].title}</h5>
          <p class="card-text">${data[i].body}</p>
        </div>
        <div class="text-center m-2">
          <button type="button" class="btn btn-outline-warning">Edit</button>
          <button type="button" class="btn btn-outline-danger">Delete</button>
        </div>
        </div>
      `;
      }

      //console.log(JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4) {
      console.log("Faild data loading ", xhr.status);
    }
  });
  xhr.send();
}

function addnote() {
  vhr.setRequestHeader("Content-type", "application/json");
  vhr.addEventListener("readystatechange", function () {
    if (vhr.readyState === 4 && vhr.status === 200) {
      var vhrdata = JSON.stringify({
        title: titleInput,
        body: descinput,
      });
    }
  });

  vhr.send(data);
}

document.addEventListener("DOMContentLoaded", function () {
  displayData();
});

function displayData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/notes");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var notes = JSON.parse(xhr.responseText);
      displayNotes(notes);
    } else {
      console.error("Error fetching notes:", xhr.responseText);
    }
  };
  xhr.send();
}

// Function to display notes in the card section
function displayNotes(notes) {
  var cardContainer = document.getElementById("card");
  cardContainer.innerHTML = "";
  notes.forEach((note) => {
    var cardHTML = `
            <div class="card">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.description}</p>
                <button onclick="deleteNote(${note.id})" class="btn btn-danger">Delete</button>
                <button onclick="editNote(${note.id}, '${note.title}', '${note.description}')" class="btn btn-warning">Edit</button>
            </div>
        `;
    cardContainer.innerHTML += cardHTML;
  });
} */
document.addEventListener("DOMContentLoaded", function () {
  displayData(); // Fetch all notes on page load
});

function displayData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/notes");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const notes = JSON.parse(xhr.responseText);
      displayNotes(notes);
    } else {
      console.error("Error fetching notes:", xhr.responseText);
    }
  };
  xhr.send();
}

function displayNotes(notes) {
  const cardContainer = document.getElementById("cards");
  cardContainer.innerHTML = "";
  notes.forEach((note) => {
    const cardHTML = `
      <div class="card"  data-id="${note.id}" style="width: 18rem">
      <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text">${note.description}</p>
        </div>
        <div class="text-center m-2">
          <button type="button" class="btn btn-outline-warning edit-btn">Edit</button>
          <button type="button" class="btn btn-outline-danger delete-btn">Delete</button>
        </div>
        </div>
      `;
    cardContainer.innerHTML += cardHTML;
  });
}

document.getElementById("cards").addEventListener("click", function (event) {
  const target = event.target;
  const card = target.closest(".card");
  if (card) {
    const id = card.getAttribute("data-id");
    if (target.classList.contains("delete-btn")) {
      deleteNote(id);
    } else if (target.classList.contains("edit-btn")) {
      const title = card.querySelector(".card-title").textContent;
      const description = card.querySelector(".card-text").textContent;
      editNote(id, title, description);
    }
  }
});

function addNote() {
  const title = document.getElementById("titleInput").value;
  const description = document.getElementById("descriptionInput").value;
  if (title.length < 6 || description.length < 20) {
    alert(
      "Title must be at least 6 characters and description at least 20 characters."
    );
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/notes");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 201) {
      displayData(); // Refresh notes after adding
    } else {
      console.error("Failed to add note:", xhr.responseText);
    }
  };
  const data = JSON.stringify({ title: title, description: description });
  xhr.send(data);
}

function deleteNote(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `http://localhost:3000/notes/${id}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      displayData(); // Refresh notes after deleting
    } else {
      console.error("Failed to delete note:", xhr.responseText);
    }
  };
  xhr.send();
}

function editNote(id, oldTitle, oldDescription) {
  const newTitle = prompt("Enter new title:", oldTitle);
  const newDescription = prompt("Enter new description:", oldDescription);
  if (
    !newTitle ||
    !newDescription ||
    newTitle.length < 6 ||
    newDescription.length < 20
  ) {
    alert(
      "Title must be at least 6 characters and description at least 20 characters."
    );
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `http://localhost:3000/notes/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      displayData(); // Refresh notes after editing
    } else {
      console.error("Failed to update note:", xhr.responseText);
    }
  };
  const data = JSON.stringify({ title: newTitle, description: newDescription });
  xhr.send(data);
}
