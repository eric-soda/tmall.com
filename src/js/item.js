import $ from './lib/jquery.esm.js';

let id = location.search.split('=')[1];
console.log(id);

$.ajax({
  type: "get",
  url: "../interface/getitem.php",
  data: { id },
  dataType: "json"
}).then(res => {
  let pic = JSON.parse(res.picture);

  let template = `
  <h1>商品详情</h1>
  <h2>${res.title}</h2>
  <div>
    <img src="./${pic[2].src}">
  </div>
  <div>价格:${res.price}</div>
  <div>
    <input type="number" id="num" value="1" min="1" max="99">
    <input type="button" id="additem" value="加入购物车">
  </div>
  <div>
    ${res.details}
  </div>

  `;

  $('body').html(template);
}).catch(xhr => {
  console.log(xhr.status);
});