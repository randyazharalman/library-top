import Library from './js/library.js';
const listBookEl = document.getElementById("list-book")
const bookCard = document.getElementById("bookCard")
const btnAddBook = document.getElementById("btn-add-book")
const searchBtn = document.getElementById("search-btn")
const modal = document.getElementById("modal")
const addBookModalBtn = document.getElementById("add-book-modal-btn");
const modalTitle = document.getElementById("modal-title");
const addBookForm = document.getElementById("add-book-form");
const closeModalBtn = document.getElementById("close-modal-btn")



const library = new Library();

searchBtn.onclick = () => {
  let query = document.getElementById("search-book").value;
  const filteredBooks = library.findBooks(query)
  renderBooks(filteredBooks)
  searchBook(query)
};

function renderBooks(books = library.getBook()) {
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
    status.innerHTML = `<strong>Status:</strong> ${book.isRead ? "Read" : "Not read"}`;

    const actions = document.createElement("div");
    actions.className = "book-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✏️ Edit";
    editBtn.onclick = ()=> {
    btnAddBook.remove()
    modal.style.display = "block";
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

      const validate = library.validateField(updatedData.title, updatedData.author, updatedData.pages, updatedData.isRead)
      if(validate){
        alert("Field cannot be empty") 
        return
      }
      library.updateBook(updatedData)
      modal.style.display = "none";
      addBookForm.appendChild(btnAddBook)
      btnEdit.remove()
      renderBooks()
      resetForm()
    }
      
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑️ Delete";

    deleteBtn.addEventListener("click", () => {
      let deleteConf = confirm("Delete "+ book.title + "? ")
      if(deleteConf){
        library.removeBook(book.id)
        renderBooks();
      }
    });

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


btnAddBook.onclick = (e)=> {
  e.preventDefault();

  const title = document.getElementById("title").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value
  const isRead = document.getElementById("isRead").checked;

  if(library.validateField(title, author, pages,isRead)){
    alert("Field cannot be empty") 
    return
  }

  library.addBook(title, author, pages, isRead);
  modal.style.display ="none"
  renderBooks();
  resetForm()
}

addBookModalBtn.onclick = ()=> {
  modal.style.display = "block";
  addBookForm.appendChild(btnAddBook)
  editBtn = document.querySelector('.btn-edit').remove();
  btnAddBook.append()
}



function resetForm() {
  const title = document.getElementById("title").value = null
  const author = document.getElementById("author").value = null
  const pages = document.getElementById("pages").value = null
  const isRead = document.getElementById("isRead").checked = false;
  
}

closeModalBtn.onclick = () => modal.style.display ="none"
window.onclick = (e) => {
  if(e.target == modal ){
    modal.style.display = "none";
    resetForm()
  }
}

renderBooks()

console.log(library.getBook());
