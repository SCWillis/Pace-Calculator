//Create Variables

//target metric variables
var targetList = $(".target");
var	inputList = $("input.entry");
var targetValue = "";

//input list variables
var distanceList = $("input.distance");
var timeList = $("input.time");
var paceList = $("input.pace");

//type of distance
var distType = "Miles";

//input values
var distance = 0;
var totalTime = 0;
var totalPace = 0;

//static variables
var hToS = 3600;
var mToS = 60;

//initially disable the calc button
// $("#calculate").prop("disabled", true);

//check the metric we are calculating
function getTarget(){
	for(var i = 0; i < targetList.length; i++){
		if(targetList[i].checked === true){
			targetValue = targetList[i].value;
			// console.log(targetValue);
			// return targetValue;
		}
	}
}
function adjVisuals(){
	getTargetBlock(targetValue);
	// var inputList = $("input.entry");
	for(var i = 0; i < inputList.length; i++){

		if(inputList[i].classList.contains(targetValue)){
			
			$(inputList[i]).addClass("void");
			// console.log($(inputList[i]).value);
			// $(inputList[i]).prop("disabled",true);//this gets re-commented
			//sets value of disabled input to 0;
			$(inputList[i]).val("");
		}else{

			$(inputList[i]).removeClass("void");
			// $(inputList[i]).prop("disabled",false);
		}
	}
}



//check that there is the correct input available
function checkDistanceInput(){
	var hasInput = false;
	if($(distanceList).val() > 0){
		hasInput = true;
	}
	console.log(hasInput);
	return hasInput;
}

function checkTimeInput(){
	var hasInput = false;
	for(var i = 0; i < timeList.length; i++){
		if($(timeList[i]).val() > 0){
			hasInput = true;
		}
	}
	console.log(hasInput);
	return hasInput;
}

function checkPaceInput(){
	var hasInput = false;
	for(var i = 0; i < paceList.length; i++){
		if($(paceList[i]).val() > 0){
			hasInput = true;
		}
	}
	console.log(hasInput);
	return hasInput;
}



//gather the data
function getDistInput(){
	distType = $("select").val();
	distance = Number($("#distanceInput").val());
	return distance;
	// console.log(distType);
	// console.log(distance);

}
function getTimeInput(){
	var timeHrs = Number($("#hrsTime").val() * hToS);
	var timeMin = Number($("#minTime").val() * mToS);
	var timeSec = Number($("#secTime").val());
	//console.log(timeHrs + timeMin + timeSec);
	totalTime = timeHrs+timeMin+timeSec;
	return totalTime;
	// console.log(totalTime);
}

function getPaceInput(){
	var paceHrs = Number($("#hrsPace").val() * hToS);
	var paceMin = Number($("#minPace").val() * mToS);
	var paceSec = Number($("#secPace").val());
	// console.log(paceHrs + paceMin + paceSec);
	totalPace = paceHrs+paceMin+paceSec;
	return totalPace;
	// console.log(totalPace);	
}

function getTargetBlock(val){
	if(val === 'distance'){
		$('#distanceBlock').addClass("activeInput");
	}else{
		$('#distanceBlock').removeClass("activeInput");
	}

	if(val === 'time'){
		$('#timeBlock').addClass("activeInput");
	}else{
		$('#timeBlock').removeClass("activeInput");
	}

	if(val === 'pace'){
		$('#paceBlock').addClass("activeInput");
	}else{
		$('#paceBlock').removeClass("activeInput");
	}
}

function resetTargetBlock(){
	var blocks = $(".inputBlock");
	for(var i = 0; i < blocks.length; i++){
		$(blocks[i]).removeClass("activeInput");
	}
}



//calculate the data
function calculateTime(dist, pace){
	var time = (pace*dist);
	time = time.toFixed(2);
	console.log(time + ": Time");
	return time;
}

function calculateDistance(time, pace){
	var dist = (time/pace);
	dist = dist.toFixed(2);
	// console.log(dist + ": dist");
	return dist;
}

function calculatePace(time, dist){
	var pace = (time/dist);
	pace = pace.toFixed(2);
	console.log(pace + ": pace");
	return pace;
}



//format the data
function formatTime(time){
	var t = time;
	var hrs = 0;
	var min = 0;
	var sec = 0;
	
	while(t > 0){
		
		if(t >= hToS){
		
			hrs += 1;
			t -= hToS;
		
		}else{

			if(t >= mToS){
		
				min += 1;
				t -= mToS;
		
			}else{

				if(t > 0){
					sec += 1;
					t -= 1;
				}	
			}
		}
	}
	return [hrs, min, sec];
	// console.log("hr: "+hrs+"min: "+min+"sec: "+sec);
}

function displayData(data){
	var d = data;
	if(targetValue === "distance"){
		$("#distanceInput").val(d);
	}
	if(targetValue == "time"){
		var h = $("#hrsTime"); 
		h.val(d[0]);

		var m = $("#minTime");
		m.val(d[1]);

		var s = $("#secTime");
		s.val(d[2]);
		// console.log($("#hrsTime").val());
	}
	if(targetValue === "pace"){
		$("#hrsPace").val(d[0]);
		$("#minPace").val(d[1]);
		$("#secPace").val(d[2]);

	}
}



function init(){
	//check input
	var checkD = checkDistanceInput();
	var checkT = checkTimeInput();
	var checkP = checkPaceInput();


	//get input
	var d = getDistInput();
	var t = getTimeInput();
	var p = getPaceInput();
	

	//calcuate and display distance
	if(targetValue === "distance"){
		if(checkP && checkT){
			var distFinal = calculateDistance(t,p);
			displayData(distFinal);
		}else{
			alert("need more info");
		}
	}

	//calcuate and display time
	if(targetValue === "time"){
		if(checkP && checkD){
			var t = calculateTime(d,p);
			var formatedT = formatTime(t);
			displayData(formatedT);
		}else{
			alert("need more info");
		}
	}

	//calcuate and display pace
	if(targetValue === "pace"){
		if(checkD && checkT){
			var p = calculatePace(t,d);
			var formatedP = formatTime(p);
			displayData(formatedP);
		}else{
			alert("need more info");
		}
	}

	resetTargetBlock();

	// calculateDistance(t,p);
	// var c = calculateTime(d,p);
	// var f = formatTime(c);
	// displayData(f);
	// calculatePace(t,d);	
}


//reset the variables and input
function reset(){
	//Reset Variables
	//target metric variables
	var targetList = $(".target");
	var	inputList = $("input.entry");
	var targetValue = "";

	//input list variables
	var distanceList = $("input.distance");
	var timeList = $("input.time");
	var paceList = $("input.pace");

	//type of distance
	var distType = "Miles";

	//input values
	var distance = 0;
	var totalTime = 0;
	var totalPace = 0;

	//reset all input vals
	for(var i = 0; i < inputList.length; i++){
		$(inputList[i]).val("");
	}

	//reset all the radio buttons
	for(var i = 0; i < targetList.length; i++){
		if(targetList[i].checked = false){
			targetValue = targetList[i].value;
		}
	}

}


//set up OnClick code

$(".target").on("click", function(){
	getTarget();
	adjVisuals();
})

$("#calculate").on("click", function(){
	init();
})

$("#reset").on("click", function(){
	reset();
})