import $ from "./lib/jquery.js";

$(function () { 
  $('.login-password>.password-hd>li').on('click',function () { 

    $(this).addClass('active').siblings().removeClass('active');

    let index=$('.login-password>.password-hd>li').index(this);

    $('.login-password>form').eq(index).addClass('display').siblings().removeClass('display');
   })
 })