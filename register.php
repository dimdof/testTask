<?php
function writeLog($email, $exist){
    $log = 'log.txt';
    $str = '[' . date("d.m.Y H:i:s") . '] Пользователь ' . $email;
    if ($exist){
        $str .= ' уже существует';
    } else {
        $str .= ' не найден в базе';
    }
    $str .= PHP_EOL;
    file_put_contents($log, $str, FILE_APPEND | LOCK_EX);
}


$users = ['user@mail.ru', 'happybara@yandex.ru', 'dobronya@gmail.com'];

if (isset($_POST['email'])){
    $email = trim($_POST['email']);
    $newUser = true;
    foreach ($users as $user){
        if ($user == $email){
            $newUser = false;
            break;
        }
    }
    if ($newUser){
        writeLog($email, false);
        echo 0;
    } else {
        writeLog($email, true);
        echo 1;
    }
}