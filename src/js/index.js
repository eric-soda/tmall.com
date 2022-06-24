import $ from './lib/jquery.esm.js';

$.ajax({
  type: "get",
  url: "../../interface/getitems.php",
  dataType: "json"
}).then(res => {
  // console.log(res);
  let template = '';

  res.forEach(el => {
    let pic = JSON.parse(el.picture);
    console.log(pic);
    template += `
    <a href="">
    <img src="./${pic[0].src}" alt="">
    <div>${el.title}</div>
    <span>￥${el.price}</span>
  </a>`;

  });


  $('.item').html(template);

}).catch(xhr => {
  console.log(xhr.status);
});