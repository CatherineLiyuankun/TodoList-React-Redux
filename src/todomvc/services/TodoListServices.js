import $ from 'jquery';

export function getTodoList() {
    return $.ajax({
        url: '/todoitems',
        type: 'get',
        dataType: 'json',
        success: data => {
          return data;
        },
        error: err => {
          console.log(err);
      }
    });
    
    // $.get('/todoitems', (data) => {
    //     return data;
    // }, 'json');
   }