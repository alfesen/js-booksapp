{ /* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars


  'use strict';

  const select = {
    templateOf: {
      book: '#template-book'
    },
    containerOf: {
      bookList: '.books-list',
    },
    bookImages: {
      bookImage: '.books-list .book__image'
    }
  };

  const templates = {
    templateBooks: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  function render(){
    for(let book of dataSource.books){
      const generateHTML = templates.templateBooks(book);
      let element = utils.createDOMFromHTML(generateHTML);
      const bookList = document.querySelector(select.containerOf.bookList);
      bookList.appendChild(element);
    }

    initActions();
  }

  render();

  const favoriteBooks = [];

  function initActions(){
    const bookImages = document.querySelectorAll(select.bookImages.bookImage);

    for(let book of bookImages){
    
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = book.getAttribute('data-id');
        if(!book.classList.contains('favorite')){
          book.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          book.classList.remove('favorite');
          const bookIndexOf = favoriteBooks.indexOf(book);
          favoriteBooks.splice(bookIndexOf, 1);
        }
        console.log(favoriteBooks);
      });
        book.addEventListener('click', function (event){
        event.preventDefault();
      });
    }

  }
}