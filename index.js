let myLibrary = [];
const listBookEl = document.getElementById("list-book")
const bookCard = document.getElementById("bookCard")
const btnAddBook = document.getElementById("btn-add-book")
const searchBtn = document.getElementById("search-btn")
const addBookModal = document.getElementById("add-book-modal")
const addBookModalBtn = document.getElementById("add-book-modal-btn");
const modalTitle = document.getElementById("modal-title");
const addBookForm = document.getElementById("add-book-form")


function Book(id, title, author, pages, isRead){
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead
}


function addBookToLibrary(title, author, pages, isRead){
  const book = new Book(crypto.randomUUID(),title, author, pages,isRead)

  myLibrary.push(book);
  addBookModal.style.display ="none"
  
}

addBookToLibrary("go", "udin", 120, false);
addBookToLibrary("javascript", "ucup", 110, false);
addBookToLibrary("python", "uus", 20, true);

function deleteBookFromLibrary(bookId){
  return myLibrary = myLibrary.filter((book)=> book.id !== bookId)
}

function updateData(data){
  const book = myLibrary.find(b => b.id === data.id)

  if(book) {
    book.title = data.title;
    book.author = data.author;
    book.pages = data.pages;
    book.isRead = data.isRead
  }
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
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );
    renderBooks(filteredBooks)
}


function renderBooks(books = myLibrary) {
  const listBookEl = document.getElementById("list-books");
  listBookEl.innerHTML = ""; 

  books.map(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.setAttribute("data-id", book.id); 
    card.style.borderColor= `${book.isRead ? "#88D66C" : "tomato"}`;

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
      btnAddBook.remove()
      addBookModal.style.display = "block";
      const oldBtn = document.querySelector(".btn-edit");
  if (oldBtn) oldBtn.remove();
      modalTitle.innerHTML = "Edit Book";
      const title = document.getElementById("title").value = book.title;
      const author = document.getElementById("author").value = book.author;
      const pages = document.getElementById("pages").value = book.pages;
      const isRead = document.getElementById("isRead").checked = book.isRead;

  const btnEdit = document.createElement("button");
      btnEdit.textContent = "Update Book";
      btnEdit.className = "btn-edit"
      addBookForm.appendChild(btnEdit)
      btnEdit.onclick = (e) => {
        e.preventDefault()
        const updatedTitle = document.getElementById("title").value;
        const updatedAuthor = document.getElementById("author").value;
        const updatedPages = document.getElementById("pages").value;
        const updatedIsRead = document.getElementById("isRead").checked;
    
        const updatedData = {
          id: book.id, 
          title: updatedTitle,
          author: updatedAuthor,
          pages: updatedPages,
          isRead: updatedIsRead
        };
  
        updateData(updatedData);
        renderBooks()
        addBookModal.style.display = "none";
        resetForm()
      }
      
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑️ Delete";

    deleteBtn.addEventListener("click", () => {
      let deleteConf = confirm("Delete "+ book.title + "? ")
      if(deleteConf){
        deleteBookFromLibrary(book.id)
        renderBooks();
      }
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
  const isRead = document.getElementById("isRead").checked;

  if(title === '' || author === '' || pages === '' || isRead === ''){
    alert("tidak boleh kosong") 
    return
  }

  addBookToLibrary(title, author, pages, isRead)
  renderBooks();
  resetForm()
}

addBookModalBtn.onclick = ()=> {
  addBookModal.style.display = "block"
}


window.onclick = (e) => {
  if(e.target == addBookModal ){
    addBookModal.style.display = "none";
    resetForm()
  }
}

function resetForm() {
  const title = document.getElementById("title").value = null
  const author = document.getElementById("author").value = null
  const pages = document.getElementById("pages").value = null
  const isRead = document.getElementById("isRead").checked = false;

}