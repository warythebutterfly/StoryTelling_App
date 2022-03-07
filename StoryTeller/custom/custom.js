console.log("This script is properly referenced");

function signIn(){

    $("#btnSubmitForm").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
    $("#btnSubmitForm").attr("disabled", "disabled");
    window.setTimeout(function() {
     
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
    console.log("i got here;");
    //window.setTimeout(window.location.assign("st_index.html"), 10000);
    }, 3000);
};

function signUp(){

    $("#btnSubmitForm").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
    $("#btnSubmitForm").attr("disabled", "disabled");
    window.setTimeout(function() {
     
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
    console.log("i got here;");
    //window.setTimeout(window.location.assign("st_index.html"), 10000);
    }, 3000);
};
