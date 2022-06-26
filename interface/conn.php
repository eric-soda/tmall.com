<?php
header('content-type:text/html;charset=utf-8');
//header('content-type:application/json;charset=utf-8');

$mysql_conf=array(
  'host'=>'localhost:3306', //主机名端口号
  'user'=>'root',//登录用户名
  'pass'=>'root',//登录密码
  'db'=>'soda'//数据库名
);
$conn= @new mysqli($mysql_conf['host'],$mysql_conf['user'],$mysql_conf['pass']);
//var_dump($conn);
if($conn->connect_error){//->的意思是对象访问属性 .操作符代表连接符不能再次使用  if是用来判断错误
  die('连接错误'.$conn->connect_errno);//结束进程，终止向下访问并输出错误代码
}

//设置查询字符集
$conn->query('set names utf-8');

//选择数据库
$selected=$conn->select_db($mysql_conf['db']);

if(!$selected){
  die('数据库连接错误'.$conn->error);  //弹出错误信息
}


?>