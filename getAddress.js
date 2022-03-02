// Get Address
  function getAddress(latitude, longitude){
    let finalAddress = ""
    var request = new XMLHttpRequest();
    // Opening a GET request to the API
    request.open("GET", `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=e59a6a9e818b473885d143bca5a4b6f3`, false);
    // Load the request
    request.onload = function() {
      // Accessing the JSON data
      // Checking if we have status 200 good to go otherwise error
      if (request.status >= 200 && request.status < 400) {
        // Looping the data
        let response = JSON.parse(request.response)
        address = response["features"][0]["properties"]
        if (address["result_type"] === "building"){
          finalAddress += address["house_number"] + " "
          finalAddress += address["street"] + " "
          finalAddress += address["city"] + " "
          finalAddress += address["county"] + " "
          finalAddress += address["country"] + " "
        }
        else{
          finalAddress += address["formatted"]
        }
        // Request send
      }
      else {
        // Showing error for the status
        console.log("error", request.status);
      }
      
      
    };
    request.send()
    return finalAddress;
  }