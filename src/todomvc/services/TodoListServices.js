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
    // return $.ajax({
    //     url: '/todoitems',
    //     type: 'post',
    //     dataType: 'json',
    //     data: newItem,
    //     success: data => {
    //       return data;
    //     },
    //     error: err => {
    //       console.log(err);
    //   }
    // });

    return $.post('/todoitems', newItem, (res) => {
        return res;
    });
}