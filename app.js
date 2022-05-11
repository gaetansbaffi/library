let myLibrary = [];

const container = document.querySelector(".container");
const newBookButton = document.querySelector(".newBtn");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let exampleBook = new Book("test", "book", 165, false);
myLibrary.push(exampleBook);

Book.prototype.changeReadStatus = (book) => {
  book.read = true;
  generateCard(myLibrary);
};

function addBookToLibrary(title, author, pages, read) {
  let userBook = new Book(title, author, pages, read);
  myLibrary.push(userBook);
}

//UI
function generateCard(library) {
  let index = 0;
  container.innerHTML = "";

  library.forEach((book) => {
    let card = document.createElement("div");
    let cardHeader = document.createElement("h3");
    let cardText = document.createElement("p");
    let btns = document.createElement("div");
    btns.className = "cardBtns";
    let removeBtn = document.createElement("button");
    let readBtn = document.createElement("button");

    card.className = "card";
    removeBtn.textContent = "Delete";
    removeBtn.className = "delete";
    removeBtn.setAttribute("data", index);

    readBtn.textContent = "Update";
    readBtn.className = "read";
    cardHeader.innerHTML = `<strong>${book.title}</strong> by <em>${book.author}</em>`;
    cardText.textContent = `This book is ${book.pages} long and ${
      book.read ? "I have read it" : "I have not read it yet"
    }`;

    card.appendChild(cardHeader);
    card.appendChild(cardText);
    card.appendChild(btns);
    btns.appendChild(removeBtn);
    btns.appendChild(readBtn);
    container.appendChild(card);
    index++;
  });

  let deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      removeCard(e);
    });
  });
  let readBtns = document.querySelectorAll(".read");

  readBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      readBook(e);
    });
  });
}

function removeCard(index) {
  let button = index.target;
  console.log(button.getAttribute("data"));
  myLibrary.splice(parseInt(button.getAttribute("data")), 1);
  generateCard(myLibrary);
}

function readBook(e) {
  let data = parseInt(e.target.previousSibling.getAttribute("data"));
  console.log(myLibrary[data]);
  myLibrary[data].changeReadStatus(myLibrary[data]);
  generateCard(myLibrary);
}

function showForm() {
  let form = document.querySelector("form");
  let submitBtn = document.querySelector(".submitBtn");
  form.classList.toggle("hidden");
  submitBtn.addEventListener("click", addBook);
}

function addBook(e) {
  const form = document.querySelector("#myForm");
  let formData = new FormData(form);
  e.preventDefault();
  let book = {};
  for (const pair of formData) {
    book[pair[0]] = pair[1];
  }
  book.read ? (book.read = true) : (book.read = false);
  book = new Book(book.title, book.author, book.pages, book.read);
  myLibrary.push(book);
  container.innerHTML = "";
  generateCard(myLibrary);
  form.classList.toggle("hidden");
}
generateCard(myLibrary);
newBookButton.addEventListener("click", showForm);
