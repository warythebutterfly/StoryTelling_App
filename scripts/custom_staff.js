//GET ALL STUDENT USERS
console.log("custom staff script is properly referenced");
$("#showInlineForm").click(function () {
    //e.preventDefault();
    console.log("i got here");
    $("#companiesFormContainer").show();

});
//var table = null;
var studentIdentityNumber = 0;
var studentEmail = '';
var studentPlacement = '';
var staffName = "";


$.ajax({
    url: "/Staff/GetAllStudentsApplications",
    type: "GET",
    success: function (response) {
        console.log(response);
        dataset = response.data;

        var table = $('#tbl_studentsapplications').DataTable({
            dom: 'Blfrtip',
            data: dataset,
            responsive: true,
            "buttons": [
                {
                    extend: 'pdf',
                    text: 'rgu applications pdf',
                    exportOptions: {
                        modifier: {
                            page: 'current'
                        },
                    }
                },
                {
                    extend: 'excel',
                    title: 'rgu applications excel',
                    filename: 'rgu_applications_excel'
                }, {
                    extend: 'csv',
                    filename: 'rgu_applications.pdf'
                },
                {
                    extend: 'copy',
                }

            ],
            columns: [
                { "data": "identityNumber" },
                { "data": "firstname" },
                { "data": "surname" },
                {
                    "data": "email",
                    "render": function (data, type, row, meta) {
                        return "<a href='mailto:" + data + "'>" + data + "</a >";
                    }
                },
                { "data": "relevantSkills" },
                { "data": "degreeLevel" },
                { "data": "firstChoicePlacement" },
                { "data": "secondChoicePlacement" },
                { "data": "thirdChoicePlacement" },
                {
                    "data": "assignedPlacementChoice",
                    "render": function (data, type, row, meta) {
                        if (row.assignedPlacementChoice === "")
                            return "<em>Awaiting automated match-making</em>";
                        else {
                            return row.assignedPlacementChoice;
                        }
                    }
                },
                { "data": null }
            ],
            "columnDefs": [
                {
                    "targets": [10],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        if (row.assignedPlacementChoice === "") {
                            return "";
                        }
                        else {
                            return "<a class='approve' id='approve' title='approve' data-toggle='modal' data-target='#approveModal', href='#'><i class='fa fa-pencil-square-o'></i></a> &emsp;&emsp; <a class='disapprove' id='disapprove' title='Disapprove' data-toggle='modal' data-target='#disapproveModal', href='#'><i class='fa fa-ban'></i></a>"
                        }
                    },

                }

            ],
            "order": [[0, "asc"]],
            //"iDisplayLength": 15,
            "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "all"]],
            "paging": true,



        });

        var rowCount = $('#tbl_studentsapplictions tr').length;
        console.log(rowCount);

        $('#tbl_studentsapplications tbody').on('click', 'tr', function (e) {
            e.preventDefault();
            console.log("got hereeeeeeeeeeee")
            //console.log(table.row($(this).parents('tr')));
            console.log(table.row(this).data());
            var student = table.row(this).data();
            console.log(student);
            studentIdentityNumber = student.identityNumber
            studentEmail = student.email;
            var studentFirstname = student.firstname;
            var studentSurname = student.surname;
            studentPlacement = student.assignedPlacementChoice;
            console.log(studentFirstname + studentSurname + studentPlacement);
            //var user = table.row($(this).parents('tr')).data();
            //console.log(user);
            //var identityNumber = user.identityNumber;
            //console.log(user);
            //studentIdentityNumber = identityNumber;
            //userName = user.Username;
            //userName = username;
            //studentFirstname = user.firstname;
            //firstName = firstname;
            //studentLastname = user.surname;
            //studentPlacement = user.assignedPlacementChoice;
            //lastName = lastname;
            //userFirstName = user.FirstName;
            //userLastName = user.LastName;
            $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?");
            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?");

            //$("#delete_modal_body").html("Are you sure you want to delete " + user\firstName + " " + userLastName + "?");


            try {
                staffName = getStaffName();

                console.log(staffName);
            } catch (e) {
                staffName = "";
                console.log(staffName);
            }


            $("#sendMail").click(function (e) {
                e.preventDefault();
                console.log('the send mail button got me here');
                $("#sendMail").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
                $("#sendMail").attr("disabled", "disabled");

                console.log("i am here again");
                //console.log(requiredSkills);
                var dataObject = {
                    userId: studentIdentityNumber,
                    assignedPlacementChoice: studentPlacement,

                };
                console.log("hmmm")
                console.log(dataObject);

                $.ajax({
                    url: "/Staff/AddUserAndPlacement",
                    data: dataObject,
                    type: "POST",
                    success: function (response) {
                        console.log(response);
                        if (response.statusCode == "00") {
                            if (staffName != "") {
                                $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.data.bold());

                                $("#sendMail").removeAttr("disabled").delay(10000);
                                $("#sendMail").html("Send Email").delay(10000);
                                $("#disapprove").hide();
                                window.open('mailto:' + studentEmail + '?subject=' + staffName + ' from Placement Allocation App');

                            }
                            else {
                                $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.data.bold());

                                $("#sendMail").removeAttr("disabled").delay(10000);
                                $("#sendMail").html("Send Email").delay(10000);
                                $("#disapprove").hide();
                                window.open('mailto:' + studentEmail + '?subject=Placement Allocation App');

                            }


                        }
                        else if (response.StatusCode == "01") {
                            $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());

                            $("#sendMail").removeAttr("disabled");
                            $("#sendMail").html("Send Email");
                        }
                        else if (response.StatusCode == "02") {
                            $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());

                            $("#sendMail").removeAttr("disabled");
                            $("#sendMail").html("Send Email");
                        }
                        else {
                            $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());

                            $("#sendMail").removeAttr("disabled");
                            $("#sendMail").html("Send Email");
                        }
                    },
                    error: function () {
                        $("#approve_modal_body").html("Error occured while trying to confirm" + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold());

                        $("#sendMail").removeAttr("disabled");
                        $("#sendMail").html("Send Email");
                    }
                });


            });

            $("#dispproveStudent").click(function (e) {
                e.preventDefault();
                console.log('the disapprove student button got me here');


                console.log("i am here again");
                //console.log(requiredSkills);
                //studentPlacement = "";
                var dataObject = {
                    userId: studentIdentityNumber,
                    assignedPlacementChoice: studentPlacement,

                };
                console.log("hmmm")
                console.log(dataObject);

                $.ajax({
                    url: "/Staff/UpdateUserAndPlacementTable",
                    data: dataObject,
                    type: "PUT",
                    success: function (response) {
                        console.log(response);
                        if (response.statusCode == "00") {
                            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.data.bold());

                            $("#disapproveStudent").removeAttr("disabled");
                            $("#disapproveStudent").html("Yes");
                            $("#approve").hide();
                            $("#disapprove").hide();

                        }
                        else if (response.StatusCode == "01") {
                            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());

                            $("#disapproveStudent").removeAttr("disabled");
                            $("#disapproveStudent").html("Yes");
                        }
                        else if (response.StatusCode == "02") {
                            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());
                            $("#disapproveStudent").removeAttr("disabled");
                            $("#disapproveStudent").html("Yes");
                        }
                        else {
                            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());
                            $("#disapproveStudent").removeAttr("disabled");
                            $("#disapproveStudent").html("Yes");
                        }
                    },
                    error: function () {
                        $("#disapprove_modal_body").html("Error occured while trying to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + ". Please try again.");
                        $("#disapproveStudent").removeAttr("disabled");
                        $("#disapproveStudent").html("Send Email");
                    }
                });


            });


        });

      

        //$("#disapproveStudent").click(function (e) {
        //    e.preventDefault();
        //    console.log('the disapprove student button got me here');


        //    console.log("i am here again");
        //    //console.log(requiredSkills);
        //    studentPlacement = "";
        //    var dataObject = {
        //        UserId = studentIdentityNumber,
        //        assignedPlacementChoice: studentPlacement,


        //    };
        //    console.log("hmmm")
        //    console.log(dataObject);

        //    $.ajax({
        //        url: "/Staff/UpdateUserAndPlacementTable",
        //        data: dataObject,
        //        type: "PUT",
        //        success: function (response) {
        //            console.log(response);
        //            if (response.statusCode == "00") {
        //                $('#response_message').show();
        //                $('#response_message').html("<div class='alert alert-success'> <strong> Success!</strong> " + response.message + "</div>");


        //            }
        //            else if (response.StatusCode == "01") {
        //                $('#response_message').show();
        //                $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong> " + response.message + "</div>");

        //            }
        //            else if (response.StatusCode == "02") {
        //                $('#response_message').show();
        //                $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong> " + response.message + "</div>");

        //            }
        //            else {
        //                $('#response_message').show();
        //                $('#response_message').html("<div class='alert alert-danger'> <strong> Error!</strong> A fatal error occured. Please try again.</div>");

        //            }
        //        },
        //        error: function () {
        //            $('#response_message').show();
        //            $('#response_message').html("<div class='alert alert-danger'> <strong> Error!</strong>A fatal error occured. Please try again.</div>");

        //        }
        //    });


        //});

    }


});


$.ajax({
    url: "/Staff/GetAllStudents",
    type: "GET",
    success: function (response) {
        console.log(response);
        dataset = response.data;
        //data: jQuery.parseJSON(dataset)

        //if ($.fn.DataTable.isDataTable("#tbl_backofficeuser")) {
        //    $('#tbl_backofficeuser').DataTable().clear().destroy();
        //}
        var table = $('#tbl_students').DataTable({
            dom: 'Blfrtip',
            data: dataset,
            responsive: true,
            "buttons": [
                {
                    extend: 'pdf',
                    text: 'rgu students pdf',
                    exportOptions: {
                        modifier: {
                            page: 'current'
                        },
                    }
                },
                {
                    extend: 'excel',
                    title: 'rgu students excel',
                    filename: 'rgu_students_excel'
                }, {
                    extend: 'csv',
                    filename: 'rgu_students.pdf'
                },
                {
                    extend: 'copy',
                }

            ],
            columns: [
                { "data": "identityNumber" },
                { "data": "firstname" },
                { "data": "surname" },
                {
                    "data": "email",
                    "render": function (data, type, row, meta) {
                        return "<a href='mailto:" + data + "'>" + data + "</a >";
                    }
                },
                { "data": "relevantSkills" },
                { "data": "degreeLevel" },
                { "data": "firstChoicePlacement" },
                { "data": "secondChoicePlacement" },
                { "data": "thirdChoicePlacement" },
                //{
                //    "data": "assignedPlacementChoice",
                //    "render": function (data, type, row, meta) {
                //        if (row.assignedPlacementChoice === "")
                //            return "<em>Awaiting automated match-making</em>";
                //        else {
                //            return row.assignedPlacementChoice;
                //        }
                //    }
                //},
                //{ "data": null }
            ],
            //"columnDefs": [
            //    {
            //        "targets": [10],
            //        "data": null,
            //        "render": function (data, type, row, meta) {
            //            if (row.assignedPlacementChoice === "") {
            //                return "";
            //            }
            //            else {
            //                return "<a class='approve' id='approve' title='approve' data-toggle='modal' data-target='#approveModal', href='#'><i class='fa fa-pencil-square-o'></i></a> &emsp;&emsp; <a class='disapprove' title='Disapprove' data-toggle='modal' data-target='#disapproveModal', href='#'><i class='fa fa-ban'></i></a>"
            //            }
            //        },

            //    }

            //],
            "order": [[0, "asc"]],
            //"iDisplayLength": 15,
            "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "all"]],
            "paging": true,



        });
    }

});

//console.log(table);

var studentIdentityNumber = 0;
var studentFirstname = "";
var studentLastname = "";
var studentPlacement = "";
//var userName = "";

//$('.approve').on('click', function () {
//    var $row = jQuery(this).closest('tr');
//    var $columns = $row.find('td');

//    $columns.addClass('row-highlight');
//    var values = "";

//    jQuery
//});



$.ajax({
    url: "/Staff/GetAllMatches",
    type: "GET",
    success: function (response) {
        console.log(response);
        dataset = response.data;
        //data: jQuery.parseJSON(dataset)

        //if ($.fn.DataTable.isDataTable("#tbl_backofficeuser")) {
        //    $('#tbl_backofficeuser').DataTable().clear().destroy();
        //}
        var table = $('#tbl_matches').DataTable({
            dom: 'Blfrtip',
            aaData: dataset,
            responsive: true,
            "buttons": [
                {
                    extend: 'pdf',
                    text: 'rgu matches pdf',
                    exportOptions: {
                        modifier: {
                            page: 'current'
                        },
                    }
                },
                {
                    extend: 'excel',
                    title: 'rgu matches excel',
                    filename: 'rgu_matches_excel'
                }, {
                    extend: 'csv',
                    filename: 'rgu_matches.pdf'
                },
                {
                    extend: 'copy',
                }

            ],
            columns: [
                { "data": "identityNumber" },
                { "data": "firstname" },
                { "data": "surname" },
                {
                    "data": "email",
                    "render": function (data, type, row, meta) {
                        return "<a href='mailto:" + data + "'>" + data + "</a >";
                    }
                },
                { "data": "relevantSkills" },
                {
                    "data": "assignedPlacementChoice"
                },
                {
                    "data": "dateSubmitted"
                },
                { "data": null },


            ],
            "columnDefs": [
                {
                    "targets": [7],
                    "data": null,
                    "render": function (data, type, row, meta) {
                       
                            return "<a class='approve' id='approve' title='approve' data-toggle='modal' data-target='#approveModal', href='#'><i class='fa fa-pencil-square-o'></i></a> &emsp;&emsp; <a class='disapprove' id='disapprove' title='Disapprove' data-toggle='modal' data-target='#disapproveModal', href='#'><i class='fa fa-ban'></i></a>"
                        
                    },

                }

            ],
            "order": [[0, "asc"]],
            //"iDisplayLength": 15,
            "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "all"]],
            "paging": true,



        });
        //$("#numberOfStudents").html(dataset.length);
        //{
        //    "targets": [6],
        //    "data": null,
        //    "defaultContent": "<em>Awaiting automated match-making</em>"
        //},


        $('#tbl_matches tbody').on('click', 'tr', function (e) {
            e.preventDefault();
            console.log("got hereeeeeeeeeeee")
            //console.log(table.row($(this).parents('tr')));
            console.log(table.row(this).data());
            var student = table.row(this).data();
            console.log(student);
            studentIdentityNumber = student.identityNumber
            studentEmail = student.email;
            var studentFirstname = student.firstname;
            var studentSurname = student.surname;
            studentPlacement = student.assignedPlacementChoice;
            console.log(studentFirstname + studentSurname + studentPlacement);
            //var user = table.row($(this).parents('tr')).data();
            //console.log(user);
            //var identityNumber = user.identityNumber;
            //console.log(user);
            //studentIdentityNumber = identityNumber;
            //userName = user.Username;
            //userName = username;
            //studentFirstname = user.firstname;
            //firstName = firstname;
            //studentLastname = user.surname;
            //studentPlacement = user.assignedPlacementChoice;
            //lastName = lastname;
            //userFirstName = user.FirstName;
            //userLastName = user.LastName;
            $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?");
            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?");

            //$("#delete_modal_body").html("Are you sure you want to delete " + user\firstName + " " + userLastName + "?");


            try {
                staffName = getStaffName();

                console.log(staffName);
            } catch (e) {
                staffName = "";
                console.log(staffName);
            }


            $("#sendMail").click(function (e) {
                e.preventDefault();
                console.log('the send mail button got me here');
                $("#sendMail").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
                $("#sendMail").attr("disabled", "disabled");

                console.log("i am here again");
                //console.log(requiredSkills);
                var dataObject = {
                    userId: studentIdentityNumber,
                    assignedPlacementChoice: studentPlacement,

                };
                console.log("hmmm")
                console.log(dataObject);

                $.ajax({
                    url: "/Staff/AddUserAndPlacement",
                    data: dataObject,
                    type: "POST",
                    success: function (response) {
                        console.log(response);
                        if (response.statusCode == "00") {
                            if (staffName != "") {
                                $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.data.bold());

                                $("#sendMail").removeAttr("disabled").delay(10000);
                                $("#sendMail").html("Send Email").delay(10000);
                                $("#disapprove").hide();
                                window.open('mailto:' + studentEmail + '?subject=' + staffName + ' from Placement Allocation App');

                            }
                            else {
                                $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.data.bold());

                                $("#sendMail").removeAttr("disabled").delay(10000);
                                $("#sendMail").html("Send Email").delay(10000);
                                $("#disapprove").hide();
                                window.open('mailto:' + studentEmail + '?subject=Placement Allocation App');

                            }


                        }
                        else if (response.StatusCode == "01") {
                            $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());

                            $("#sendMail").removeAttr("disabled");
                            $("#sendMail").html("Send Email");
                        }
                        else if (response.StatusCode == "02") {
                            $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());

                            $("#sendMail").removeAttr("disabled");
                            $("#sendMail").html("Send Email");
                        }
                        else {
                            $("#approve_modal_body").html("Send a confirmation email to " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());

                            $("#sendMail").removeAttr("disabled");
                            $("#sendMail").html("Send Email");
                        }
                    },
                    error: function () {
                        $("#approve_modal_body").html("Error occured while trying to confirm" + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold());

                        $("#sendMail").removeAttr("disabled");
                        $("#sendMail").html("Send Email");
                    }
                });


            });

            $("#dispproveStudent").click(function (e) {
                e.preventDefault();
                console.log('the disapprove student button got me here');


                console.log("i am here again");
                //console.log(requiredSkills);
                //studentPlacement = "";
                var dataObject = {
                    userId: studentIdentityNumber,
                    assignedPlacementChoice: studentPlacement,

                };
                console.log("hmmm")
                console.log(dataObject);

                $.ajax({
                    url: "/Staff/UpdateUserAndPlacementTable",
                    data: dataObject,
                    type: "PUT",
                    success: function (response) {
                        console.log(response);
                        if (response.statusCode == "00") {
                            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.data.bold());

                            $("#disapproveStudent").removeAttr("disabled");
                            $("#disapproveStudent").html("Yes");
                            $("#approve").hide();
                            $("#disapprove").hide();

                        }
                        else if (response.StatusCode == "01") {
                            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());

                            $("#disapproveStudent").removeAttr("disabled");
                            $("#disapproveStudent").html("Yes");
                        }
                        else if (response.StatusCode == "02") {
                            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());
                            $("#disapproveStudent").removeAttr("disabled");
                            $("#disapproveStudent").html("Yes");
                        }
                        else {
                            $("#disapprove_modal_body").html("Are you sure you want to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + "?<br><br>" + response.message.bold());
                            $("#disapproveStudent").removeAttr("disabled");
                            $("#disapproveStudent").html("Yes");
                        }
                    },
                    error: function () {
                        $("#disapprove_modal_body").html("Error occured while trying to disapprove " + studentSurname.bold() + " " + studentFirstname.bold() + " regarding assigned placement at " + studentPlacement.bold() + ". Please try again.");
                        $("#disapproveStudent").removeAttr("disabled");
                        $("#disapproveStudent").html("Send Email");
                    }
                });


            });


        });



    }


});


$.ajax({
    url: "/Staff/GetAllCompanies",
    type: "GET",
    success: function (response) {
        console.log(response);
        dataset = response.data;
        //data: jQuery.parseJSON(dataset)

        //if ($.fn.DataTable.isDataTable("#tbl_backofficeuser")) {
        //    $('#tbl_backofficeuser').DataTable().clear().destroy();
        //}
        table = $('#tbl_companies').DataTable({
            dom: 'Blfrtip',
            aaData: dataset,
            responsive: true,
            "buttons": [
                {
                    extend: 'pdfHtml5',
                    text: 'rgu companies pdf',
                    exportOptions: {
                        modifier: {
                            page: 'current'
                        },
                    }
                },
                {
                    extend: 'excel',
                    title: 'rgu placement history excel',
                    filename: 'rgu_placement_history_excel'
                }, {
                    extend: 'csv',
                    filename: 'rgu_placement_history_csv',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'copy',
                },
                {
                    extend: 'colvis'
                },

            ],
            columns: [
                { "data": "id" },
                { "data": "organization" },
                { "data": "type" },
                { "data": "location" },
                { "data": "address" },
                { "data": "contactName" },
                {
                    "data": "contactEmail",
                    "render": function (data, type, row, meta) {
                        return "<a href='mailto:" + data + "'>" + data + "</a >";
                    }
                },
                { "data": "requiredSkills" },

            ],
            "order": [[0, "asc"]],
            "iDisplayLength": 15,
            "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "all"]],
            "paging": true,



        });
        //$("#numberOfCompanies").html(dataset.length);





    }


});
var organization = "";
var placementType = "";
var companyLocation = "";
var address = "";
var contactName = "";
var contactEmail = "";
var requiredSkills = "";
var numberOfRequiredSkills = 0;

$('#requiredSkills').on('change', function (event) {
    //console.log("skill set got here");
    //skillSet = $(this).val();
    requiredSkills = $(this).val().toString();
    numberOfRequiredSkills = $(this).val().length;

    if (numberOfRequiredSkills == 0) {
        $("#requiredSkillsMessage").html("Please select 5 required skills")
    }
    if (numberOfRequiredSkills == 1) {
        $("#requiredSkillsMessage").html("You have selected " + "(" + numberOfRequiredSkills + " skill).")
        //$('#requiredSkillsMessage[value=' + requiredSkills + ']').text();
    }
    if (numberOfRequiredSkills > 1) {
        $("#requiredSkillsMessage").html("You have selected " + "(" + numberOfRequiredSkills + " skills).")
    }

    //$('#skillsets').val(skillSet);
});

$('#placementType').on('change', function () {
    //console.log("skill set got here");
    placementType = $(this).val();
    console.log(degree);
    //$('#degreelevels').val(degree);

});

$("#btnAddCompany").click(function (e) {
    e.preventDefault();
    console.log('the button got me here');


    organization = $("#organization").val();
    placementType = placementType;
    companyLocation = $("#location").val();
    address = $("#address").val();
    contactName = $("#contactName").val();
    contactEmail = $("#contactEmail").val();
    requiredSkills = requiredSkills;

    if (organization != "" || companyLocation != "" || placementType != "" || requiredSkills != "") {

        if (numberOfRequiredSkills > 4 && numberOfRequiredSkills < 6) {
            $("#btnAddCompany").html("<i class = 'fa fa-spinner fa-spin'></i> Please Wait").css('margin', '10px');
            $("#btnAddCompany").attr("disabled", "disabled");
            console.log("i am here again");
            //console.log(requiredSkills);
            var dataObject = {
                organization: organization,
                type: placementType,
                location: companyLocation,
                address: address,
                contactName: contactName,
                contactEmail: contactEmail,
                requiredSkills: requiredSkills
            };
            console.log("hmmm")
            console.log(dataObject);

            $.ajax({
                url: "/Staff/Add",
                data: dataObject,
                type: "POST",
                success: function (response) {
                    console.log(response);
                    if (response.statusCode == "00") {
                        $('#response_message').show();
                        $('#response_message').html("<div class='alert alert-success'> <strong> Success!</strong> " + response.message + "</div>");
                        $("#btnAddCompany").removeAttr("disabled");
                        $("#btnAddCompany").html("Add Company");

                        $("#organization").val("");
                        $("#placementType").val("");
                        $("#location").val("");
                        $("#address").val("");
                        $("#contactName").val("");
                        $("#contactEmail").val("");

                    }
                    else if (response.StatusCode == "01") {
                        $('#response_message').show();
                        $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong> " + response.message + "</div>");
                        $("#btnAddCompany").removeAttr("disabled");
                        $("#btnAddCompany").html("Add Company");
                        $("#organization").val("");
                        $("#placementType").val("");
                        $("#location").val("");
                        $("#address").val("");
                        $("#contactName").val("");
                        $("#contactEmail").val("");
                    }
                    else if (response.StatusCode == "02") {
                        $('#response_message').show();
                        $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong> " + response.message + "</div>");
                        $("#btnAddCompany").removeAttr("disabled");
                        $("#btnAddCompany").html("Add Company");
                        $("#organization").val("");
                        $("#placementType").val("");
                        $("#location").val("");
                        $("#address").val("");
                        $("#contactName").val("");
                        $("#contactEmail").val("");
                    }
                    else {
                        $('#response_message').show();
                        $('#response_message').html("<div class='alert alert-danger'> <strong> Error!</strong> A fatal error occured. Please try again.</div>");
                        $("#btnAddCompany").removeAttr("disabled");
                        $("#btnAddCompany").html("Add Company");
                        $("#organization").val("");
                        $("#placementType").val("");
                        $("#location").val("");
                        $("#address").val("");
                        $("#contactName").val("");
                        $("#contactEmail").val("");
                    }
                },
                error: function () {
                    $('#response_message').show();
                    $('#response_message').html("<div class='alert alert-danger'> <strong> Error!</strong>A fatal error occured. Please try again.</div>");
                    $("#btnAddCompany").removeAttr("disabled");
                    $("#btnAddCompany").html("Add Company");

                }
            });
        }
        else {
            $('#response_message').show();
            $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong> You have to select 5 required  Skills.</div>");

        }
    }
    else {
        $('#response_message').show();
        $('#response_message').html("<div class='alert alert-warning'> <strong> Warning!</strong> Asterisk fields are required.</div>");
    }
});
