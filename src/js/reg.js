import $ from "./lib/jquery.js";

let flag=true;

$('.agreement-input').on('click',function () { 

  flag=!flag;

  $('#reg-a').attr('disabled',flag);

  if(!flag){
    $('#reg-a').attr('style','background-image:linear-gradient(90deg,#f90,#ff5000);');
  }else{
    $('#reg-a').attr('style','background-image:linear-gradient(90deg,#999,#666);');
  }
  
})