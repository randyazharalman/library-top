import Book from "./book.js";

class Library {
  constructor(){
    this.books = this.loadFromStorage();
  }

  getBook = () => {
    return this.books
  }
  addBook = (title, author, pages, isRead) => {
    const duplicate = this.findDuplicate(title)
    if(duplicate){
      return false
    }
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, isRead)
    this.books.push(newBook);
    this.saveToStorage();
    return true;
  }

  removeBook = (bookId) => {
    this.books = this.books.filter(b => b.id !== bookId);
    this.saveToStorage()
    return true
  }

  updateBook = (data) => {
    const book = this.books.find(b => b.id === data.id)

    if(book){
      book.title = data.title;
      book.author = data.author;
      book.pages = data.pages;
      book.isRead = data.isRead;
      return true
    }
  }

   findDuplicate = (title) => {
    return this.books.some(b => b.title.toLowerCase() === title)
  }

  findBooks = (query) => {
    const lowerQuery = query.toLowerCase();
    return this.books.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) 
    );
  }

  validateField = (title, author, pages, isRead) => {
    if(title === '' || author === '' || pages === '' || isRead === ''){
      return true
    }
  }
  saveToStorage = () => {
    localStorage.setItem('libraryData', JSON.stringify(this.books));
  }

  loadFromStorage = () => {
    const data = localStorage.getItem('libraryData');
    return data ? JSON.parse(data) : [];
  }
}




export default Library