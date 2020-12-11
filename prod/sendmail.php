<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $subject = !empty($_POST['form']) ? $_POST['form'] : 'STO-auto';

    // $name = !empty($_POST['name']) ? $_POST['name'] : '';
    // $phone = !empty($_POST['phone']) ? $_POST['phone'] : '';
    // $email = !empty($_POST['email']) ? $_POST['email'] : '';
    $message = !empty($_POST['message']) ? $_POST['message'] : '';

    // $body = $name ? "<b>Имя:</b> " . $name . "<br>" : '';
    // $body .= $phone ? "<b>Телефон:</b> " . $phone . "<br>" : '';
    // $body .= $email ? "<b>E-mail:</b> " . $email . "<br>" : '';
    $body .= $message ? "<b>Сообщение:</b><br> " . $message . "<br>" : '';

    $body .= "<hr>";
    $body .= "<b>Browser:</b> " . $_SERVER['HTTP_USER_AGENT'] . "<br>";
    $body .= "<b>Ip - Местоположение:</b> " . '<a href="http://www.ip-adress.com/ip_tracer/' . $_SERVER['REMOTE_ADDR'] . '">' . $_SERVER['REMOTE_ADDR'] . '</a>';

    $to = "i.shablovskiy@axora.by";
    /*$copyTo = "";*/

    $headers = "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: sto-auto.b2bsfera.by <no-reply>\r\n";
    $success = mail($to, $subject, $body, $headers);
    /*$successCopy = mail($copyTo, $subject, $body, $headers);*/
    if ($success) {
        header('Location: spasibo.html');
    } else {
        header('Location: index.html');
    }
} else {
    header('Location: index.html');
}
?>