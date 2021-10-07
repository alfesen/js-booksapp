{
  'use strict'

  const select = {
    templateOf: {
      book: '#template-book'
    },
    containerOf: {
      bookList: '.books-list'
    }
  }

  const templates = {
    templateBooks: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  }

  function render(){
      for(let book of dataSource.books){
          const generateHTML = templates.templateBooks(book);
          element = utils.createDOMFromHTML(generateHTML);
          const bookList = document.querySelector(select.containerOf.bookList);
          bookList.appendChild(element);
      }
  }

  render();
}