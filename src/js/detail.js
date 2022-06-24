import $ from './lib/jquery.esm.js';
import cookie from './lib/cookie.js'
let id = location.search.split('=')[1];
console.log(id);

$.ajax({
  type: "get",
  url: "http://localhost/liu/www.tmall.com/interface/getitem.php",
  data: {
    id
  },
  dataType: "json"
}).then(res => {
  let det = JSON.parse(res.details);
  let pic = JSON.parse(res.picture);

  let title = `
  <h1>${res.title}</h1>
  `;

  let prices = `
  <dl class="tm_promo-panel">
  <dt class="tb_promo">618狂欢</dt>
  <dd>
    <em class="tm-yen">¥</em>
    <span class="tm-price">${res.price}</span>
    <em class="tm-promo-type "><s></s>狂欢价</em>
  </dd>
</dl>
  `;

  let details = `
  <img src="./${det[0].src}" alt="">
  `;

  let picture = `
  <img src="./${pic[0].src}" alt="">
  `

  $('.img_box').html(details);
  $('.tb_detail-hd').prepend(title);
  $('.tm_panel').prepend(prices);
  $('.picture').html(picture);

  $('.tb-btn-add').on('click', function () {
    addItem(res.id, $('#num').val());
  })
}).catch(xhr => {
  console.log(xhr.status);
});

function addItem(id, num) {
  let product = {
    id,
    num
  };
  let shop = cookie.get('shop'); //从cookie获取数据

  if (shop) {
    shop = JSON.parse(shop);
    if (shop.some(el => el.id == id)) {
      let index = shop.findIndex(elm => elm.id == id); // 获得商品对象在数组中的索引
      let count = parseInt(shop[index].num);
      count += parseInt(num);
      shop[index].num = count;
    } else {
      shop.push(product);
    }
  } else {
    shop = [];
    shop.push(product);
  }

  cookie.set('shop', JSON.stringify(shop));
}