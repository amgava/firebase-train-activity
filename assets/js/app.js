// Initialize Firebase
var config = {
    apiKey: "AIzaSyBnign3vNdS11FjPie-zRnGUAKfaCCDGG0",
    authDomain: "train-b0477.firebaseapp.com",
    databaseURL: "https://train-b0477.firebaseio.com",
    projectId: "train-b0477",
    storageBucket: "train-b0477.appspot.com",
    messagingSenderId: "174740479629"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var destination;
var firstTrain;
var frequency;


// New Train Data
$("#add-new").on("click", function(event) {

    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-departure").val().trim();
    frequency = $("#frequency").val().trim();

    var addTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(addTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-departure").val("");
    $("#frequency").val("");

});


// Database
database.ref().on('child_added', function(childSnapshot) {

    var childTrainName = childSnapshot.val.trainName;
    var childDestination = childSnapshot.val().destination;
    var childFirstTrain = childSnapshot.val().firstTrain;
    var childFrequency = childSnapshot.val().frequency;

    console.log(childTrainName);
    console.log(childDestination);
    console.log(childfirstTrain);
    console.log(childFrequency);


    var firstTrainConverted = moment(childFirstTrain, "HH:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
    var remainder = timeDiff % childFrequency;
    var minutesAway = childFrequency - remainder;
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");


    var newRow = $("<tr>").append(
        $("<td>").text(childTrainName),
        $("<td>").text(childDestination),
        $("<td>").text(childFirstTrain),
        $("<td>").text(childFrequency),
        $("<td>").text(minutesAway),
        $("<td>").text(nextArrival)
    );

    $("#train-data > tbody").append(newRow);
});