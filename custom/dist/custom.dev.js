"use strict";

console.log("This script is properly referenced");
$('#loginForm').submit(function (e) {
  e.preventDefault(); //console.log("before contact form");

  var data = {
    email: $('#email').val(),
    password: $('#password').val()
  };
  console.log(data);

  if (data.email != "" && data.password != "") {
    signIn();
  } else {
    swal("Not yet", "All fields are required", "warning");
  }
});
$('#signUpForm').submit(function (e) {
  e.preventDefault(); //console.log("before contact form");

  var data = {
    firstname: $('#email').val(),
    lastname: $('#email').val(),
    email: $('#email').val(),
    password: $('#password').val(),
    confirmPassword: $('#confirmpassword').val()
  };
  console.log(data);

  if (data.email != "" && data.password != "" && data.firstname != "" && data.lastname != "" && data.confirmPassword != "") {
    if (data.password == data.confirmPassword) signUp();else swal("Not yet", "Passwords do not match", "warning");
  } else {
    swal("Not yet", "All fields are required", "warning");
  }
}); //  $('#addStoryForm').submit(function (e) {
//     e.preventDefault();
//     //console.log("before contact form");
//     var data = {
//         title:$('#storytitle').val(),
//         storyLocation:$('#storylocation').val(),
//         locationImage: $('#img').val(),
//         storyType: $('#storytype').val(),
//         body:$('#storybody').val(),
//     }
//     console.log(data); 
//     if(data.title != "" || data.storyLocation != "" || data.locationImage != "" || data.storyType != "" || data.body != ""){
//        createStory();
//     }
//     else{
//       swal("Not yet", "All fields are required!", "warning");
//     }
// });

$('#contactForm').submit(function (e) {
  e.preventDefault(); //console.log("before contact form");

  var data = {
    // firstname:$('#storytitle').val(),
    name: $('#name').val(),
    email: $('#email').val(),
    subject: $('#subject').val(),
    body: $('#message').val()
  };
  console.log(data);

  if (data.name != "" && data.email != "" && data.subject != "" && data.body != "") {
    contact();
  } else {
    swal("Not yet", "All fields are required!", "warning");
  }
});

function signIn() {
  $("#btnSubmitForm").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
  $("#btnSubmitForm").attr("disabled", "disabled");
  window.setTimeout(function () {
    // swal({
    //   title:"Login Succeessful",
    //   type: "success",
    //   showCancelButton:true
    // },
    // function(isConfirm){
    //   debugger;
    //   setTimeout(function(){
    //   })
    // }
    // )
    swal("Signin Successful", "You will be redirected shortly", "success");
    $("#btnSubmitForm").removeAttr("disabled");
    $("#btnSubmitForm").html("Sign In");
    console.log("i got here;"); //window.setTimeout(window.location.assign("st_index.html"), 10000);
  }, 3000);
}

;

function signUp() {
  $("#btnSubmitForm").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
  $("#btnSubmitForm").attr("disabled", "disabled");
  window.setTimeout(function () {
    // swal({
    //   title:"Login Succeessful",
    //   type: "success",
    //   showCancelButton:true
    // },
    // function(isConfirm){
    //   debugger;
    //   setTimeout(function(){
    //   })
    // }
    // )
    swal("Signup Successful", "You will be redirected shortly", "success");
    $("#btnSubmitForm").removeAttr("disabled");
    $("#btnSubmitForm").html("Sign Up");
    console.log("i got here;"); //window.setTimeout(window.location.assign("st_index.html"), 10000);
  }, 3000);
}

;

function createStory() {
  $("#btnadd").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
  $("#btnadd").attr("disabled", "disabled");
  window.setTimeout(function () {
    // swal({
    //   title:"Login Succeessful",
    //   type: "success",
    //   showCancelButton:true
    // },
    // function(isConfirm){
    //   debugger;
    //   setTimeout(function(){
    //   })
    // }
    // )
    swal("Created Successfully", "Thank you for sharing your unique voice and original story", "success");
    $("#btnadd").removeAttr("disabled");
    $("#btnadd").html("Create Story");
    console.log("i got here;"); //window.setTimeout(window.location.assign("st_index.html"), 10000);
  }, 3000);
}

;

function editStory() {
  $("#btnedit").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
  $("#btnedit").attr("disabled", "disabled");
  window.setTimeout(function () {
    swal("Updated Successfully", "Thank you for sharing your unique voice and original story", "success");
    $("#btnedit").removeAttr("disabled");
    $("#btnedit").html("Save changes");
    console.log("i got here;"); //window.setTimeout(window.location.assign("st_index.html"), 10000);
  }, 3000);
}

;

function contact() {
  $("#btncontact").html("<i class = 'fas fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
  $("#btncontact").attr("disabled", "disabled");
  window.setTimeout(function () {
    // swal({
    //   title:"Login Succeessful",
    //   type: "success",
    //   showCancelButton:true
    // },
    // function(isConfirm){
    //   debugger;
    //   setTimeout(function(){
    //   })
    // }
    // )
    swal("Sent Successfully", "Thank you for contacting us. We would get back to you shortly", "success");
    $("#btncontact").removeAttr("disabled");
    $("#btncontact").html("Save Message");
    console.log("i got here;"); //window.setTimeout(window.location.assign("st_index.html"), 10000);
  }, 3000);
}

;