$(function () {
   $.get('/allcartnumber/',function (response) {
       if(response.status==1){
           $('#cartnum').html(response.cartnumber);
       }else if(response.status==0) {
            $('#cartnum').html(response.cartnumber);
       }
   })
});