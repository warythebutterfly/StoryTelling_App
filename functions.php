<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'C:/xampp/htdocs/story/PHPMailer-master/src/Exception.php';
require 'C:/xampp/htdocs/story/PHPMailer-master/src/PHPMailer.php';
require 'C:/xampp/htdocs/story/PHPMailer-master/src/SMTP.php';

function signup_data($con) {
    if($_SERVER['REQUEST_METHOD'] == "POST"){

        $first_name = $_POST['firstname'];
        $last_name = $_POST['lastname'];
        $email = $_POST['email'];
        $password = $_POST['password'];
		$confirmPassword = $_POST['confirmPassword'];
        $isStoryTeller = isset($_POST['isStoryTeller']);
		$isStorySeeker = isset($_POST['isStoryseeker']);
		$isAdmin = $_POST['isAdmin'];

		if( $password != $confirmPassword){
			echo 'password do not match';
			die;
		}else{
			$hashed_password = password_hash($password, PASSWORD_DEFAULT);
		

		// if ($first_name == "" || $last_name == "" || $email == "" || $hashed_password == "" ) {
		// 	$msg = "<script>alert('There are no fields to generate a report')</Script>";
		// 	  return $msg;
		// }

		// if(empty($email) && empty($password) )
		// {
		// 	echo "<script>alert('There are no fields to generate a report');</script>"; 
		// }

			$sql = "SELECT * FROM users WHERE Email='$email' ";

			$result = mysqli_query($con, $sql);

			$user_data = mysqli_fetch_assoc($result);

			//check if the email has been used before
			if (mysqli_num_rows($result) > 0 && $user_data['isStoryTeller'] == 1)  {

					header("Location:signup.php?error=The email already exists, please try another");
					exit();
				}
	
				elseif (mysqli_num_rows($result) > 0 && $user_data['isStoryseeker'] == 1){
					header("Location:signup.php?error=The email already exists, please try another");
					exit();
				}
				else {

			//save to database
			
			$query = "insert into users (
				Email,
				FirstName,
				LastName,
				Password,
				isStoryTeller,
				isStoryseeker,
				isAdmin) values 
			(
			'$email',
			'$first_name',
			'$last_name',
			'$hashed_password',
			'$isStoryTeller',
			'$isStorySeeker',
			'$isAdmin')";			

			mysqli_query($con, $query);

			//email_sender($email, $first_name, 'Hi,<br>You have just signed up on the Story Telling app.','Signup confirmed');
			
			// echo '$("#btnSubmitForm").html("<i class = "fa fa-spinner fa-spin"></i> Please Wait").css("margin", "10px");
			// $("#btnSubmitForm").attr("disabled", "disabled");
			// window.setTimeout(function() {
			 
			//   swal("Signup Successful", "You will be redirected shortly", "success");
			//   $("#btnSubmitForm").removeAttr("disabled");
			// 			$("#btnSubmitForm").html("Sign Up");
			// console.log("i got here;");
			// //window.setTimeout(window.location.assign("st_index.html"), 10000);
			// }, 3000);';

			//header("Location:signin.php");

			//echo '<script> alert("Registered successfully!");document.location="signin.php"</script>';
			//echo '<script></script>';
			//die;
		}
	}
            
    }
}

function login_data($con){
	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		//something was posted
		$email = $_POST['email'];
		$password = $_POST['password'];

		// if(empty($email) && empty($password))
		// {
		// 	echo "<script>alert('There are no fields to generate a report')</script>"; 
		// }

			//read from database
			$query = "select * from users where Email = '$email' limit 1";
			$result = mysqli_query($con, $query);

			if($result)
			{
				if($result && mysqli_num_rows($result) > 0)
				{

					$user_data = mysqli_fetch_assoc($result);
					

					if(password_verify($password, $user_data['Password']))
					{
						if(isset($_POST['remember']))
						{
							setcookie('email',$email, time()+60*60*7);
							setcookie('password',$password, time()+60*60*7);
           				}

						$_SESSION['id'] = $user_data['id'];

            			header("Location:index.php");						
					}
				}
			}			
			// echo '<div class="alert alert-danger alert-dismissible mt-3" id="flash-msg">
			// <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			// <strong>Error !</strong> Wrong email or password !</div>';		
	}
}

	function user_login_check($con)
	{
	
		if(isset($_SESSION['id']))
		{
	
			$id = $_SESSION['id'];
			$query = "select * from users where id = '$id' limit 1";
	
			$result = mysqli_query($con, $query);

			if($result && mysqli_num_rows($result) > 0)
			{
				$user_data = mysqli_fetch_assoc($result);
				return $user_data;
			}
		}
	
		//redirect to login
		header("Location:signin.php");
		die;
	
	}

	function add_story($con){

		if(isset($_POST['addStory']))
		{

		$title = $_POST['title'];

		$Location =$_POST['location'];

		$filename = uploadFile();

		$Category = $_POST['category'];

		$Body = $_POST['body'];

		$Is_Approved = $_POST['isApproved'];

		if(isset($_SESSION['id']))
			{
				$user_id = $_SESSION['id'];
				$query = "insert into stories (userid, Title, Location, Category, Body, ImageUrl, IsApproved) values 
												('$user_id','$title', '$Location','$Category','$Body','$filename','$Is_Approved')";

				$result = mysqli_query($con,$query);
				if ($result){
				echo "<script>alert('Story Added Successfully')</script>";
				die;
				}
				else{
					echo "<script>alert('Story not added')</script>";
					die;
					}				
			}				
			else{
				echo "user logged out";
				die;
			}
		}
	}

	function uploadFile(){
		// Check if the form was submitted
		if($_SERVER["REQUEST_METHOD"] == "POST"){
			// Check if file was uploaded without errors
			if(isset($_FILES["photo"]) && $_FILES["photo"]["error"] == 0){
				$allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png");
				$filename = $_FILES["photo"]["name"];
				$filetype = $_FILES["photo"]["type"];
				$filesize = $_FILES["photo"]["size"];
			
				// Verify file extension
				$ext = pathinfo($filename, PATHINFO_EXTENSION);
				if(!array_key_exists($ext, $allowed)) die("Error: Please select a valid file format.");
			
				// Verify file size - 5MB maximum
				$maxsize = 5 * 1024 * 1024;
				if($filesize > $maxsize) die("Error: File size is larger than the allowed limit.");
			
				// Verify MYME type of the file
				if(in_array($filetype, $allowed)){
					// Check whether file exists before uploading it
					if(file_exists("C:/xampp/htdocs/story/uploads/" . $filename)){
						echo $filename . " is already exists.";
					} else{
						move_uploaded_file($_FILES["photo"]["tmp_name"], "C:/xampp/htdocs/story/uploads/" . $filename);
						echo "Your file was uploaded successfully.";
						
					} 
				} else{
					echo "Error: There was a problem uploading your file. Please try again."; 
				}
				
			} else{
				echo "Error: " . $_FILES["photo"]["error"];
				return "";
			}
		}
		return $filename;
	}



	function email_sender($toMailAddress, $toName, $body, $subject)
	{
			//Instantiation and passing `true` enables exceptions
			$mail = new PHPMailer(true);

				try {
						//Server settings
						$mail->SMTPDebug = 0;                      //Enable verbose debug output
						$mail->isSMTP();                                            //Send using SMTP
						$mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
						$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
						$mail->Username   = 'oladipupojuwon99@gmail.com';                     //SMTP username
						$mail->Password   = 'Systems@10';                               //SMTP password
						$mail->SMTPSecure = 'tls';         		//Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
						$mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

						//Recipients
						$mail->setFrom('ogunderostephen@gmail.com', 'Story Telling App - Joey Zaza');
						$mail->addAddress($toMailAddress, $toName);     //Add a recipient

						//Content
						$mail->isHTML(true);                                  //Set email format to HTML
						$mail->Subject = $subject;
						$mail->Body    = $body;
						$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

						$mail->send();
						//echo 'Message has been sent';
						} catch (Exception $e) {
						//echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
					} 	
	}