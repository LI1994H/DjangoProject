$('input[type="submit"]').click(function () {
       var filename=$('input[type="file"]').val();
       var patt=RegExp("(.jpg)|(.jpeg)|(.gif)|(.bmp)|(.png)");
       var result= patt.test(filename);
       if (result){
           $('form').attr('onsubmit',"return ture");
       }else{
           $('p').text('文件为空或类型错误 请选择图片文件').css("color","red")
       }
});