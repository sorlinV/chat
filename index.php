<?php session_start(); ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <style>
        #chat {
            background-color: lightgray;
            height: 50vh;
            overflow-y: scroll
        }

        .mt-5 {
            background: lightblue;
            padding: 10px;
        }
    </style>
    <title>Chat</title>
</head>
<body class="container">
<?php if (!empty($_SESSION['user'])) : ?>
    <aside>
        <form action="action.php" method="POST" class="col-xs-12 col-md-10 offset-md-1 form-inline">
            <input type="submit" value="Logout" name="deco" class="btn btn-primary col-md-2">
        </form>
    </aside>
    <main>
        <div id="chat" class="col-xs-12 col-md-10 offset-md-1"></div>
        <form action="" id="chat-form" class="col-xs-12 col-md-10 offset-md-1 form-inline">
            <input type="text" id="message" class="col-md-10 form-control">
            <input type="submit" value="SEND" class="btn btn-primary">
        </form>
    </main>
    <script src="chat.js"></script>
<?php else : ?>
    <div class="mt-5">
        <h2 class="text-center">Register : </h2>
        <form action="action.php" method="POST">
            <label for="name">Name : </label>
            <input type="text" name="name" method="POST" class="form-control">
            <label for="password">Password : </label>
            <input type="password" name="password" class="form-control">
            <label for="password">Confirm password : </label>
            <input type="password" name="password2" class="form-control">
            <input type="submit" value="REGISTER" class="btn btn-primary">
        </form>
    </div>
    <div class="mt-5">
        <h2 class="text-center">Login : </h2>
        <form action="action.php" method="POST">
            <label for="name">Name : </label>
            <input type="text" name="name" method="POST" class="form-control">
            <label for="password">Password : </label>
            <input type="password" name="password" class="form-control">
            <input type="submit" value="LOGIN"  class="btn btn-primary">
        </form>
    </div>
<?php endif; ?>
</body>
</html>