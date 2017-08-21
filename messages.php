<?php
session_start();
require_once 'Classes/Message.php';
require_once 'Classes/User.php';
require_once 'Classes/Data.php';

$data = new Data();
$json = json_decode(file_get_contents('php://input'));
$message = htmlspecialchars($json->message);
$id = $json->id;
if (!empty($_SESSION['user']) && !empty($message) && $message !== "") {
    $user = $data->getUser($_SESSION['user']);
    $data->addMessage(new Message($user->getName(), $message, date("Y-m-d H:i:sa")));
}

$messages['messages'] = $data->getMessages($id);
if (($i  = count($messages['messages'])) !== 0) {
    $messages['id'] = $messages['messages'][$i - 1]['id'];
} else {
    $messages['id'] = $id;
}
echo json_encode($messages);