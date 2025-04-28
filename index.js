let myLibrary = [];
const listBookEl = document.getElementById("list-book")
const bookCard = document.getElementById("bookCard")
const btnAddBook = document.getElementById("btn-add-book")
const searchBtn = document.getElementById("search-btn")

addBookToLibrary("tes", "udin", 120, false);
addBookToLibrary("javascript", "ucup", 110, false);
addBookToLibrary("python", "uus", 20, false);
function Book(id, title, author, pages, isRead){
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead
}


function addBookToLibrary(title, author, pages, isRead){
  const book = new Book(crypto.randomUUID(),title, author, pages, isRead=false)

  myLibrary.push(book)
}

function deleteBookFromLibrary(bookId){
  return myLibrary = myLibrary.filter((book)=> book.bookId !== bookId)
}

function editStatusReadingBook(bookId) {
  const book = myLibrary.find(b => b.id === bookId);
  if (book) {
    book.isRead = !book.isRead; // toggle status
  }
}

searchBtn.onclick = () => {
  let query = document.getElementById("search-book").value
  searchBook(query)
};
function searchBook(query){
  const filteredBooks = myLibrary.filter(book => 
    book.title.toLowerCase().includes(query)
  );
    renderBooks(filteredBooks)
  
}


function renderBooks(books = myLibrary) {
  const listBookEl = document.getElementById("list-books");
  listBookEl.innerHTML = ""; // reset

  books.map(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.setAttribute("data-id", book.id); 

    const title = document.createElement("h2");
    title.className = "book-title";
    title.textContent = book.title;

    const author = document.createElement("p");
    author.className = "book-author";
    author.innerHTML = `<strong>Author:</strong> ${book.author}`;

    const pages = document.createElement("p");
    pages.className = "book-pages";
    pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;

    const status = document.createElement("p");
    status.className = "book-status";
    status.innerHTML = `<strong>Status:</strong> ${book.isRead ? "Read" : "Not Read"}`;

    const actions = document.createElement("div");
    actions.className = "book-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✏️ Edit";

    editBtn.onclick = ()=> {
      editStatusReadingBook(book.id)
      renderBooks()
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑️ Delete";

    // Optional: tambahkan event listener
    deleteBtn.addEventListener("click", () => {
      // contoh: hapus buku dari array
      deleteBookFromLibrary(book.id)
      // alert("data berhasil dihapus")
      renderBooks(); // render ulang
    });

    // Tempel semuanya
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(actions);

    listBookEl.appendChild(card);
  });
}

renderBooks()

console.log(myLibrary);



btnAddBook.onclick = (e)=> {
  e.preventDefault();
  const title = document.getElementById("title").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value
  const isRead = document.getElementById("title").value

  addBookToLibrary(title, author, pages, isRead)
  renderBooks();

}
// function handleSubmit(e) {
//   e.preventDefault();
//   const title = document.getElementById("title").value
//   const author = document.getElementById("author").value
//   const pages = document.getElementById("pages").value
//   const isRead = document.getElementById("title").value

//   const data = {
//     id: crypto.randomUUID(),
//     title: title,
//     author: author,
//     pages: pages,
//     isRead: isRead
//   }
//   addBookToLibrary(title, author, pages, isRead)
//   renderBooks();
// }