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

export function addTodoItem(newItem) {
    return $.ajax({
        url: '/todoitems',
        type: 'post',
        data: JSON.stringify(newItem),
        contentType: 'application/json', //use contentType: 'application/json' instead of dataType: 'json'
        success: data => {
          return data;
        },
        error: err => {
          console.log(err);
      }
    });

    //with data format error
    // return $.post('/todoitems', JSON.stringify(newItem), (res) => {
    //     return res;
    // }, 'application/json');
}