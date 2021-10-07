{ /* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars


  'use strict';

  const select = {
    templateOf: {
      book: '#template-book'
    },
    containerOf: {
      bookList: '.books-list',
      bookImage: '.book__image',
      filters: '.filters',
    },
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
    const bookImages = document.querySelectorAll(select.containerOf.bookImage);
    const filterForm = document.querySelector(select.containerOf.filters);
    for(let book of bookImages){
    
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = book.getAttribute('data-id');
        if(!event.target.offsetParent.classList.contains('favorite')){
          book.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          book.classList.remove('favorite');
          const bookIndexOf = favoriteBooks.indexOf(book);
          favoriteBooks.splice(bookIndexOf, 1);
        }
        console.log('favoriteBooks: ', favoriteBooks);
      });
      book.addEventListener('click', function (event){
        event.preventDefault();
      });
    }
    filterForm.addEventListener('click', function (event){
      const target = event.target;
      if(target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter'){
        if(target.checked){
            console.log('target checked')
          filters.push(target.value);
        } else {
          const filterIndexOf = filters.indexOf(target.value);
          filters.splice(filterIndexOf, 1)
        }
        console.log(target.value);
      }
      filterBooks();
    });
  }

  const filters = [];
  

  function  filterBooks() {

    for (const bookId in dataSource.books) {
           
      const book = dataSource.books[bookId];

      const filtered = document.querySelector('.book__image[data-id="' + book.id + '"]');

      filtered.classList.remove('hidden');

      for (const filter of filters) {
        const detailValue = book.details[filter];

        if (!detailValue) {
          filtered.classList.add('hidden');
          break;
        }
      }
    }
  }
}
