$(function () {
   $.get('/allcartnumber/',function (response) {
       if(response.status==1){
           $('#cartnum').html(response.cartnumber);
       }
   })
});