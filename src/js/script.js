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

  class BooksList {
    constructor(){
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
    }

    initData(){
      const thisBookList = this;

      thisBookList.data = dataSource.books;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      console.log('thisBookList.favoriteBooks: ', thisBookList.favoriteBooks)
    }

    getElements(){
      const thisBookList = this;

      thisBookList.bookList = document.querySelector(select.containerOf.bookList);
      thisBookList.bookImage = document.querySelector(select.containerOf.bookImage);
      thisBookList.filterForm = document.querySelector(select.containerOf.filters);
    }

    render(){
      const thisBookList = this;

      for(let book of thisBookList.data){
        book.ratingBgc = thisBookList.determineRangeBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generateHTML = templates.templateBooks(book);
        const element = utils.createDOMFromHTML(generateHTML);
        thisBookList.bookList.appendChild(element);
      }
      
      thisBookList.initActions();
    }

    initActions(){
      const thisBookList = this;
      
      
      thisBookList.bookList.addEventListener('dblclick', function(event){
          console.log('clicked');
          event.preventDefault();
          const target = event.target.offsetParent;
          if(!target.classList.contains(thisBookList.bookImage)){
            const bookId = target.getAttribute('data-id');
            if(!thisBookList.favoriteBooks.includes(bookId)){
              target.classList.add('favorite');
              thisBookList.favoriteBooks.push(bookId);
            } else {
              target.classList.remove('favorite');
              const bookIndexOf = thisBookList.favoriteBooks.indexOf(bookId);
              thisBookList.favoriteBooks.splice(bookIndexOf, 1);
            }
          }
        });
        thisBookList.bookList.addEventListener('click', function (event){
          event.preventDefault();
        });
      
      thisBookList.filterForm.addEventListener('click', function (event){
        const target = event.target;
        if(target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter'){
          if(target.checked){
            thisBookList.filters.push(target.value);
          } else {
            const filterIndexOf = thisBookList.filters.indexOf(target.value);
            thisBookList.filters.splice(filterIndexOf, 1);
          }
          console.log(target.value);
        }

        thisBookList.filterBooks();
      });
    }
    

    filterBooks() {
      const thisBookList = this;

      for (const bookId in thisBookList.data) {
            
        const book = thisBookList.data[bookId];

        const filtered = document.querySelector('.book__image[data-id="' + book.id + '"]');

        filtered.classList.remove('hidden');

        for (const filter of thisBookList.filters) {
          const detailValue = book.details[filter];

          if (!detailValue) {
            filtered.classList.add('hidden');
            break;
          }
        }
      }
    }

    determineRangeBgc(rating) {

      let background = '';
      
      if(rating <= 6) background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      else if(rating > 6 && rating <= 8) background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      else if (rating > 8 && rating <= 9) background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      else if (rating > 9) background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';

      return background;
    }

  }

  // eslint-disable-next-line no-unused-vars
  const app = new BooksList();
}