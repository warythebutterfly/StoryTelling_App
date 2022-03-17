
console.log("this script is properly referenced");
var id = 0;
var studentId = 0;
var identifier = "";
var identityNumber = 0;
var staffId = 0;
var password = "";
// $("#btnSubmit").attr("disabled", true);
const selectElement = document.querySelector('.loginSelect');

const togglePassword = document.querySelector('#togglePassword');
const showpassword = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("show password got here")
    // toggle the type attribute
    const type = showpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    showpassword.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');

});

selectElement.addEventListener('change', (event) => {

    loginSelect = event.target.value;

    console.log(loginSelect);
    if (loginSelect == "Student") {
        id = 1;
        identifier = "Student"
        console.log(id);
        $("#btnLogin").attr("disabled", false);



    }
    else if (loginSelect == "Staff") {
        id = 2;
        identifier = "Staff";
        $("#btnLogin").attr("disabled", false);
    }
    else if (loginSelect == "") {
        $("#btnLogin").attr("disabled", true);
    }
    else {
        $("#btnLogin").attr("disabled", true);
    }

});


$("#btnLogin").click(function (e) {
    e.preventDefault();
    if ($("#password").val() !== "" && $("#ID").val() !== "") {
        $("#btnLogin").html("<i class = 'fa fa-spinner'></i> Please Wait").css('margin', '10px');
        $("#btnLogin").attr("disabled", "disabled");

        console.log('i am here')
        //if (id == 1) {
        //    studentId = $("#ID").val();
        //}
        //if (id == 2) {
        //    staffId = $("#ID").val();
        //}
        identityNumber = parseInt($("#ID").val());
        password = $("#password").val();


        console.log(identityNumber);
        var dataObject = {
            role: identifier,
            id: identityNumber,
            password: password
        };
        console.log("hmmm")
        console.log(dataObject);

        $.ajax({
            url: "/Authentication/Login",
            data: dataObject,
            type: "POST",
            dataType: "json",
            success: function (response) {
                console.log("hmmm2");
                console.log(response);
                if (response.statusCode == "00") {
                    //console.log('response.statusCode == "00"');
                    console.log(response.data);
                    console.log(response.data.identifier);

                    $("#btnLogin").removeAttr("disabled");

                    $("#btnLogin").html("Login");

                    if (response.data.identifier == "Student") {
                        window.location.href = "/Student/index";
                    }
                    else {
                        window.location.href = "/Staff/index";
                    }
                   
                }
                else if (response.StatusCode == "01") {
                    $('#response_message').show();
                    $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong> " + response.message + "</div>");
                    $("#btnLogin").removeAttr("disabled");
                    $("#btnLogin").html("Login");
                }
                else if (response.statusCode == "02") {
                    $('#response_message').show();
                    $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong> " + response.message + "</div>");
                    $("#btnLogin").removeAttr("disabled");
                    $("#btnLogin").html("Login");
                }
                else {
                    $('#response_message').show();
                    $('#response_message').html("<div class='alert alert-danger'> <strong> Error!</strong> A fatal error occured! Please try again.</div>");
                    $("#btnLogin").removeAttr("disabled");
                    $("#btnLogin").html("Login");
                }
            },
            error: function (response) {
                //console.log("error in ajax");
                //alert('A fatal error occured');
                $('#response_message').html("<div class='alert alert-danger'> <strong> Error!</strong> A fatal error occurred! Please try again.</div>");
                $("#btnLogin").removeAttr("disabled");
                $("#btnLogin").html("Login");
            }
        });

    }
    else {
        $('#response_message').show();
        $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong>All fields are required</div>");
        $("#btnLogin").removeAttr("disabled");
        $("#btnLogin").html("Login");
    }
});

$("#loginForm").submit(function () {

    $("#studentLoginForm").show();
    $("#staffLoginForm").hide();
    //     // $("#btnStudentLogin").text("Double Click To Show Create User Form")
    // });

});

// console.log("i got here 1");
//     $("#btnStaffLogin").click(function (e) {
//   e.preventDefault();
//  $("#staffLoginForm").show();
//  			$("#studentLoginForm").hide();

// });




// console.log("this script is properly referenced");

// $(document).ready(function () {

//     //var menu = document.getElementById("party");
//     //menu.addEventListener("change", generateData);

//     //function generateData() {
//     //    console.log("got to generate data function");
//     //    if (menu.value == '1') {
//     //        console.log(menu.value)
//     //        party = menu.value;
//     //    } else if (menu.value == '2') {
//     //        console.log(menu.value)
//     //        party = menu.value;
//     //    } else if (menu.value == '3') {
//     //        console.log(menu.value)
//     //        party = menu.value;
//     //    }
//     //    else if (menu.value == '4') {
//     //        console.log(menu.value)
//     //        party = menu.value;
//     //    }
//     //    else if (menu.value == '5') {
//     //        console.log(menu.value)
//     //        party = menu.value;
//     //    }

//     //}



//     $("#btnSubmit").click(function (e) {
//         e.preventDefault();
//         console.log("i got here");
//         var rbs = document.querySelectorAll('input[name="choice"]');

//         for (var rb of rbs) {
//             if (rb.checked) {
//                 sex = rb.value;
//                 break;
//             }
//         }
//         console.log(sex);






//         firstName = $("#firstname").val();

//         lastName = $("#lastname").val();

//         email = $("#email").val();

//         console.log(firstName);

//         //$("#btnSubmit").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait");
//         //$("#btnSubmit").attr("disabled", "disabled");
//         var dataObject = {
//             FirstName: firstName,
//             LastName: lastName,
//             Sex: sex,
//             Email: email,
//             Party: party,
//         };

//         console.log(dataObject)
//         $.ajax({
//             url: "/Home/Vote",
//             data: dataObject,
//             type: "POST",
//             success: function (response) {
//                 alert(response);


//             },
//             error: function () {
//                 console.log("A fatal error occured");
//                 alert('A fatal error occured');

//             }
//         })

//     })
// });