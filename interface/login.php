<?php
  $username=$_REQUEST['username'];
  $password=$_REQUEST['password'];
  include('./conn.php');  //作用是连接数据库
  $select="select * from user where username='$username' and password='$password'";
  //echo $select;
  $res=$conn->query($select);//执行查询 获得一个数据库
  //var_dump($res);
  if($res->num_rows>0){
    //echo '<script>alert("登陆成功");</script>';
    echo '<script>location.href="http://localhost/liu/www.tmall.com/src/index.html";</script>';
  }else{
    echo '<script>alert("账号或密码输入错误");</script>';
    echo '<script>location.href="../src/login.html";</script>';
  }
?>