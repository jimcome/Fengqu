<?php
include "conn.php";

$result = $conn->query("select * from taobaogoods"); //获取数据的结果集(记录集)

$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);
