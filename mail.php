<?php
header('Content-Type: application/json');
$recipient = "yustlviv@ukr.net";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$design = trim($_POST["design"]);
$date = trim($_POST["date"]);


$message = "Ім'я: $name\nТелефон: $phone\nНаявний дизайн-проект: $design\n\n\nДата: $date";

$pagetitle = "New message from your website";
mail($recipient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recipient");