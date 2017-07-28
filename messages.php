<?php
session_start();
include_once 'Classes/Message.php';
include_once 'Classes/User.php';
include_once 'Classes/Data.php';
$data = new Data();
$message = htmlspecialchars(file_get_contents('php://input'));
if (!empty($_SESSION['user']) && !empty($message)) {
    $user = $data->getUser($_SESSION['user']);
    $data->addMessage(new Message($user->getName(), $message));
}

$messages = $data->getMessages();
foreach ($messages as $m) :?>
    <article>
        <p><?php echo $m->getUser();?> : <?php echo $m->getMessage() ?></p>
    </article>
<?php endforeach; ?>
