const container = document.querySelector(".container");
const newBookButton = document.querySelector(".newBtn");
const form = document.querySelector("form");
class Library {
  constructor(books) {
    this.books = books;
  }

  displayBooks() {
    container.innerHTML = "";
    for (const book of this.books) {
      let card = document.createElement("div");
      let title = document.createElement("h4");
      let author = document.createElement("h4");
      let infos = document.createElement("p");
      let removeBtn = document.createElement("button");
      let updateBtn = document.createElement("button");

      card.className = "card";
      removeBtn.textContent = "Delete";
      removeBtn.className = "delete";
      updateBtn.textContent = "Update";
      updateBtn.className = "update";
      title.textContent = book.title;
      author.textContent = book.author;
      infos.textContent = `This book is ${book.pages} pages long and ${
        book.read ? "i have read it" : "i have not read it"
      }`;
      card.append(title);
      card.append(author);
      card.append(infos);
      card.append(removeBtn);
      card.append(updateBtn);
      container.append(card);
      removeBtn.addEventListener("click", (e) => this.removeBook(e));
      updateBtn.addEventListener("click", (e) => this.updateBook(e));
    }
  }

  addBook() {
    //Show Form
    form.classList.toggle("hidden");

    let submitBtn = document.querySelector(".submitBtn");
    submitBtn.addEventListener("click", (e) => createBook(e));

    const createBook = (e) => {
      let data = new FormData(form);
      e.preventDefault();
      let book = new Book();
      for (const item of data) {
        console.log(item);
        console.log((book[item[0]] = item[1]));
      }
      form.classList.toggle("hidden");
      myLibrary.books.push(book);
      console.log(this);
      return this.displayBooks();
    };
  }

  removeBook(e) {
    let bookTitle = e.target.parentElement.firstChild.textContent;
    for (let index = 0; index < this.books.length; index++) {
      if (bookTitle === this.books[index].title) {
        this.books.splice(index, 1);
        this.displayBooks();
      }
    }
  }

  updateBook(e) {
    let bookTitle = e.target.parentElement.firstChild.textContent;
    for (let index = 0; index < this.books.length; index++) {
      if (bookTitle === this.books[index].title) {
        if (this.books[index]._read === false) {
          this.books[index]._read = true;
        } else this.books[index]._read = false;

        this.displayBooks();
      }
    }
  }
}

class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get read() {
    return this._read;
  }

  set read(value) {
    if (value === "on") {
      this._read = true;
    } else {
      this._read = false;
    }
  }
}

let LOTR = new Book("the lord of the rings", "JRR Tolkien", 300, true);

let myLibrary = new Library([LOTR]);
myLibrary.displayBooks();
newBookButton.addEventListener("click", () => myLibrary.addBook());
