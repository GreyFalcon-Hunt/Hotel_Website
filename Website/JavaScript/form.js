var startDate=document.querySelector('#startDate');
var endDate=document.querySelector('#endDate');

//Validation block-------------------------
var email=document.querySelector("#email");
var email_msg=document.querySelector("#email_msg");


function email_focus()
{
    email_msg.style.display="block";
}

function email_blur()
{
    email_msg.style.display="none";
}

email.addEventListener("focus",email_focus);
email.addEventListener("blur",email_blur);

//date limiter ------------------------------
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day; 
    startDate.value=maxDate;
    endDate.value=maxDate;  
    startDate.setAttribute("min",maxDate);
    endDate.setAttribute("min",maxDate);

    startDate.addEventListener("change",function(){ document.querySelector("#endDate").setAttribute("min",startDate.value); });
    endDate.addEventListener("change",function(){ document.querySelector("#startDate").setAttribute("max",endDate.value); });
 

//find no of days-----------------------------

function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1]-1, mdy[2]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    return Math.round((second-first)/(1000*60*60*24));
}




//Arrival time------------------------------------
var time=document.querySelector('.time');



startDate.addEventListener("change",display_time);
endDate.addEventListener("change",display_time);



function display_time() {
    if(startDate.value!=='' && endDate.value!=='')
    {
        time.style.display="block";
    }

}


//Rooms Data
var roomtype=document.querySelector("#roomType");
var norooms=document.querySelector("#noRooms");
var noadults=document.querySelector("#noAdults");
var nochild=document.querySelector("#noChild");
var breakfast=document.querySelector("#check");
var roommsg=document.querySelector("#roommsg");
var totalPrice=document.querySelector(".totalPrice");
//Romm msg------------------------------------------------
var RoomMsg={
    "Studio":"*1 Adult 1 child",
    "OneBedRoom":"*2 Adults 2 children",
    "TwoBedRoom":"*4 Adults 2 children"
}

roomtype.addEventListener("change",()=>{
    roommsg.innerHTML=RoomMsg[roomtype.value];
});



//Cost calculation -----------------------------------------------

var RoomRent={
    "Studio":150,
    "OneBedRoom":200,
    "TwoBedRoom":400
}

var FoodRate={
    "Breakfast":100
}


function cost_calculate()
{
    var nodays=datediff(parseDate(startDate.value), parseDate(endDate.value))+1;
    var room_cost=RoomRent[roomtype.value]*parseInt(norooms.value)*nodays;
    var food_cost=0;
    if(breakfast.checked){
        food_cost=(parseInt(noadults.value)+parseInt(nochild.value))*FoodRate["Breakfast"]*nodays;
    }
    else{
        food_cost=0;
    }

    var tot_cost=room_cost+food_cost;
    totalPrice.innerHTML="$"+tot_cost;
}

cost_calculate();

breakfast.addEventListener("change",cost_calculate);
roomtype.addEventListener("change",cost_calculate);
noadults.addEventListener("change",cost_calculate);
norooms.addEventListener("change",cost_calculate);
nochild.addEventListener("change",cost_calculate);
startDate.addEventListener("change",cost_calculate);
endDate.addEventListener("change",cost_calculate);


//------------------Reset Button
var reset=document.querySelector('#reset');

reset.addEventListener("click",()=>{ setTimeout(()=>{
    startDate.value=maxDate;
    endDate.value=maxDate;
    cost_calculate();
},1000)});



