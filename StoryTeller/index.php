<?php
session_start();

      include("C:/xampp/htdocs/story/connection.php");
      include("C:/xampp/htdocs/story/functions.php");

      //$login_check = user_login_check($con);
?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="../custom/custom.css">

    </head>
    <body>
        <header>
            <h1>Story Teller Index</h1>
            <h2>Nothing to see here yet...</h2>

            <nav>
                <a href="index.html">Index Page</a>
                <a href="addstory.php">Add Story Page</a>
                <a href="signin.html">Sign In</a>
                <a href="signup.html">Sign Up</a>
            </nav>
        </header>
    </body>
</html>