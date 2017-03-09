  var config = {
    apiKey: "AIzaSyAK_Rmn-dB1QAwaC1ZKlQXkz8ELZoQkoq4",
    authDomain: "train-times-bc9b8.firebaseapp.com",
    databaseURL: "https://train-times-bc9b8.firebaseio.com",
    storageBucket: "train-times-bc9b8.appspot.com",
    messagingSenderId: "815016804364"
  };

  firebase.initializeApp(config);

  var database=firebase.database();

// 1) retrieve user inputs and set up as variables
// 2) 
  //for user submission
  var trName = "";
  var destination = ""; 
  var firstTrainTime = 0;
  var tFrequency = 0;
  // var firstTrain;
  // var currentTime = $.now();
  // var time = currentTime;

  //update display according to user submission
  // var minAway;
  // var nextArrival;
  // var timeConverted; 




// database.ref().($.on("snapshot"){

// }

//needed functions: 
//- one to update with firebase(snapshot)
//		-> submit on click
// 

$("#submitbutton").on("click", function(event){
	event.preventDefault();

	trName = $("#trn-nm-input").val().trim();
	destination = $("#destination-input").val().trim();
	tFrequency = $("#frequency-input").val().trim();
	firstTrainTime = moment($("#traintime-input").val().trim(), "HH:mm").format("X");
	//before adding to database
		//add validation on input
		//make sure it is correct before adding

	database.ref().push({
		trName: trName,
		destination: destination,
		tFrequency: tFrequency,
		firstTrainTime,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

});
database.ref().on("child_added", function(snapshot){


	

	console.log(snapshot.val());
	console.log(snapshot.val().trName);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().tFrequency);

	// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "X").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment().format("HH:mm");
    console.log("current time:" + currentTime);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + Math.round(diffTime*.0000036));

    // Time apart (remainder)
    var tFrequency = parseInt(snapshot.val().tFrequency);
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + nextTrain);

    var upcomingTrain = (moment(nextTrain).format("HH:mm"));

	$("#table-for-info").append("<tr>" 
      + "<td>" + snapshot.val().trName + "</td>"
      + "<td>" + snapshot.val().destination + "</td>"
      + "<td>" + snapshot.val().tFrequency + "</td>"
      + "<td>" + nextTrain + "</td>"
      + "<td>" + tMinutesTillTrain + "</td>"
      + "</tr>");
   


});
