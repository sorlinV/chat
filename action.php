<?php
/**
 * Created by PhpStorm.
 * User: isidoris-simplon
 * Date: 28/07/17
 * Time: 08:20
 */
session_start();
include_once 'Classes/Data.php';
include_once 'Classes/User.php';

$post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
$data = new Data();

if (!empty($post['name']) && !empty($post['password']) && !empty($post['password2']) && $post['password'] === $post['password2']) {
    $data->addUser(new User($post['name'], $post['password']));
}

if (!empty($post['name']) && !empty($post['password'])) {
    $data->connectUser($post['name'], $post['password']);
}

if (!empty($post['deco'])) {
    unset($_SESSION['user']);
}
header('location: index.php');