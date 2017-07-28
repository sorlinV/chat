<?php session_start(); ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chat</title>
</head>
<body>
<?php if (!empty($_SESSION['user'])) : ?>
    <main id="chat"></main>
    <form action="" id="chatForm">
        <input type="text" id="textChat">
        <input type="submit" value="sub">
    </form>
    <form action="action.php" method="POST">
        <input type="submit" name="deco" value="deco">
    </form>
    <script>
        document.querySelector("#chatForm").addEventListener("submit", function (e) {
            e.preventDefault();
            xhr = new XMLHttpRequest();
            xhr.open("POST", "messages.php", true);
            xhr.send(document.querySelector('#textChat').value);
            document.querySelector('#textChat').value = "";
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 200) {
                    $rep = xhr.responseText;
                    document.querySelector('#chat').innerHTML = $rep;
                }
            });
        });


        setInterval(function(){
            xhr = new XMLHttpRequest();
            xhr.open("GET", "messages.php", true);
            xhr.send();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 200) {
                    $rep = xhr.responseText;
                    document.querySelector('#chat').innerHTML = $rep;
                }
            });
        }, 10);
    </script>
<?php else : ?>
    <form action="action.php" method="POST">
        <label for="name"> Username:</label>
        <input type="text" name="name">
        <label for="password"> Password:</label>
        <input type="password" name="password">
        <label for="password2"> Confirm Password:</label>
        <input type="password" name="password2">
        <input type="submit" value="Register">
    </form>
    <form action="action.php" method="POST">
        <label for="name"> Username:</label>
        <input type="text" name="name">
        <label for="password"> Password:</label>
        <input type="password" name="password">
        <input type="submit" value="Connect">
    </form>
<?php endif; ?>
</body>
</html>