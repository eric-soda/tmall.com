import $ from './lib/jquery.esm.js';

$.ajax({
  type: "get",
  url: "http://localhost/liu/www.tmall.com/interface/getitems.php",
  dataType: "json"
}).then(res => {
  // console.log(res);
  let template = '';

  res.forEach(el => {
    let pic = JSON.parse(el.picture);
    console.log(pic);
    template += `
    <a href="http://localhost/liu/www.tmall.com/src/detail.html?id=${el.id}">
    <img src="./${pic[0].src}" alt="">
    <div>${el.title}</div>
    <span>￥${el.price}</span>
  </a>`;

  });


  $('.item').html(template);

}).catch(xhr => {
  console.log(xhr.status);
});