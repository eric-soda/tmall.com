import $ from './lib/jquery.esm.js';
import cookie from './lib/cookie.js';
let shop = cookie.get('shop');

shop = JSON.parse(shop);

let idList = shop.map(el => el.id).join();

$.ajax({
  type: "get",
  url: "../interface/shop.php",
  data: {
    idList
  },
  dataType: "json"
}).then(res => {
  let template = '';
  res.forEach((el, i) => {

    let pic = JSON.parse(el.picture);

    let current = shop.filter(elm => elm.id === el.id);

    template += `  <div class="shop_product">
    <input type="checkbox" id-data=${el.id} class="check">
    <div class="product_img">
      <a href=""> <img src="./${pic[0].src}" alt=""></a>
    </div>
    <div class="product_info">
      <a href="">${el.title}</a>
    </div>
    <div class="product_message">
      <div class="product_price" >
        ￥${(+el.price).toFixed(2)}
      </div>
      <div class="product_amount">
        <a href="#" class="reduce" id-date=${el.id}>-</a>
        <input type="text" value="${current[0].num}" class="text text-amount J_ItemAmount" data-max="85" data-now="2"
          autocomplete="off">
        <a href="#" class="add" id=${el.id}>+</a>
      </div>
      <div class="product_prices">￥${(el.price * current[0].num).toFixed(2)}</div>
      <div class="user_operate">
        <span><a href="">移入收藏夹</a></span>
        <span class="removeitem" data-id = ${el.id}><a href="">删除</a></span>
      </div>
    </div>
    </div>`;
  });


  $('.main_mid_product').html(template);



  $('.add').on('click', function () {
    let num = $(this).siblings('.text-amount').val();
    num++;
    $(this).siblings('.text-amount').val(num);
    let id = shop.filter(el => el.id == $(this).attr('id'));

    addItem(id[0].id, $('.text-amount').val())
    location.reload();
  });

  $('.reduce').on('click', function () {
    let num = $(this).siblings('.text-amount').val();
    num--;
    if (num < 1) {
      num = 1;
    }
    $(this).siblings('.text-amount').val(num);
    let id1 = shop.filter(el => el.id == $(this).attr('id-date'));
    reduceItem(id1[0].id, $('.text-amount').val())
    location.reload();
    console.log(id1);
  });

  $('.main_mid_product .removeitem').on('click', function () {
    let res = shop.filter(el => el.id != $(this).attr('data-id')); // 筛选被点击的元素
    cookie.set('shop', JSON.stringify(res)); // 剩余内容写回cookie
    location.reload(); // 刷新页面
  });

  let allCheck = $('.all-check');
  let item = $(':checkbox:not(.all-check)')

  allCheck.on('click', function () {
    item.prop('checked', $(this).prop('checked'));
    allCheck.prop('checked', $(this).prop('checked'));

  });

  item.on('click', function () {
    allCheck.prop('checked', isAllCheck());
    // let id = shop.filter(el => el.id == $(this).attr('id-data'));
    // console.log(id[0].id);

  });

  function isAllCheck() {
    let elm = Array.from(item);
    return elm.every((el) => $(el).prop('checked'));
  }

  // // 计算总价----------------------------------
  let pricearr = [];
  let numarr = [];
  $('.check').on({
    change() {
      console.log($(this));
      let prices = +$(this).parent().find('.product_prices').html().replace(/[￥]/g, "");
      let num = +$(this).parent().find('.text').val();
     
     
      // 判断是否选中
      if (this.checked) {
        // 选中的放入数组
        pricearr.push(prices);
        numarr.push(num);
      } else {
        // 没选中的从数组中删除
        let priceres = pricearr.filter(el => {
          return el !== prices;
        });
        let numres = pricearr.filter(el => {
          return el !== prices;
        });
        pricearr = priceres;
        numarr = numres;
      }
      // console.log(arr);
      // 判断数组是否为空
      if (pricearr) {
        // 数组不为空的遍历之后加总
        let allprice = 0;
        let allnum = 0;
        pricearr.forEach(el => {
          allprice += el;
        });
        numarr.forEach(el => {
          allnum += el;
        });
        // 添加到页面
        $('#total').html(allprice);
        $('.product_select>em').html(allnum);
        $('#total').html(allprice);
      }
    }
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
      count++;
      shop[index].num = count;
    }
    cookie.set('shop', JSON.stringify(shop));
  }
}

function reduceItem(id, num) {
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
      count--;
      shop[index].num = count;
    }
    cookie.set('shop', JSON.stringify(shop));
  }
}