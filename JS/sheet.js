"use strict";

if (document.getElementById("calendar") != null) {

/* Calendar Setup */

/* Set the date displayed in the calendar */
var thisDay = new Date();

/* Write the calendar to the element with the id "calendar" */
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

/* Function to generate the calendar table */
function createCalendar(calDate) {
   var calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   return calendarHTML;
}

/* Function to write the calendar caption */
function calCaption(calDate) {
   //monthName array contains the list of month names
   var monthName = ["January", "February", "March", "April", 
                    "May", "June", "July", "August", "September", 
                    "October", "November", "December"];

   //Determine the current month
   var thisMonth = calDate.getMonth();

   //Determine the current year
   var thisYear = calDate.getFullYear();

   //write the caption
   return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
}

/* Function to write a table row of weekday abbreviations */
function calWeekdayRow() {
   //Array of weekday abbreviations
   var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   var rowHTML = "<tr>";

   //Loop through the dayName array
   for (var i = 0; i < dayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   }
   
   rowHTML += "</tr>";
   return rowHTML;
}

/*Function to calculate the number of days in the month */
function daysInMonth(calDate) {
   // Array of days in each month
   var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];

   // Extract the four digit year and month value
   var thisYear = calDate.getFullYear();
   var thisMonth = calDate.getMonth();

   // Revise the days in February for leap years
   if (thisYear % 4 === 0) {
      if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
         dayCount[1] = 29;
      }
   }

   // Return the number of days for the current month
   return dayCount[thisMonth];
}

/* Function to write table rows for each day of the month */
function calDays(calDate) {
   // Determine the starting day of the month
   var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   var weekDay = day.getDay();

   // Write blank cells preceding the starting day
   var htmlCode = "<tr>";
   for (var i = 0; i < weekDay; i++) {
      htmlCode += "<td></td>";
   }

   // Write cells for each day of the month
   var totalDays = daysInMonth(calDate);

   var highlightDay = calDate.getDate();
   for (var i = 1; i <= totalDays; i++) {
      day.setDate(i);
      weekDay = day.getDay();

      if (weekDay === 0) htmlCode += "<tr>";
      if (i === highlightDay) {
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + "</td>";
      } 
      else {
         htmlCode += "<td class='calendar_dates'>" + i + "</td>";
      }
      if (weekDay === 6) htmlCode += "</tr>";
   }
 
   return htmlCode;
}
}

/* Notes Page */
if (document.querySelector(".submit") != null) {
let submit = document.querySelector(".submit");
let notesElem = document.querySelector('.note-box');
let title = document.querySelector("#text");
let desc = document.querySelector('#desc');
let notes = JSON.parse(localStorage.getItem("note-box"));
if(notes){
    notes.forEach(element => {
        addNotes(element)
    });
}
submit.addEventListener("click", (e)=>{
    e.preventDefault();
    addNotes()
})
function addNotes(obj) {
    let noteBox=document.createElement("div");
    noteBox.classList.add("noteBox");
    let titleval=title.value;
    let descVal=desc.value;
    if(obj){
        titleval=obj.title;
        descVal=obj.desc;
    }
    if(titleval){
        noteBox.innerHTML=`<h3>${titleval}</h3>
                                    <p class="ptag">${descVal}</p>
                             <button class="deletes">Delete</button>`;
        notesElem.appendChild(noteBox);
        updateLs()
    }
    let deletes =noteBox.querySelector(".deletes");
    deletes.addEventListener('click', ()=>{
        noteBox.remove();
        updateLs();
    })
}
function updateLs() {
    let noteBox=document.querySelectorAll(".noteBox");
    let arr=[];
   noteBox.forEach(element => {
        arr.push({
            title:element.children[0].innerText,
            desc:element.children[1].innerText
        })
    });
    localStorage.setItem("notes", JSON.stringify(arr));
}
}

/* Goals Page */
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
   if (document.getElementById("input-box") != null) {
   if (inputBox.value === "") {
      alert("You must write something");
   }
   else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      listContainer.appendChild(li);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
   }
}
   inputBox.value = "";
}
if (document.getElementById("input-box") != null) {
listContainer.addEventListener("click", function(e){
   if(e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
   }
   else if(e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
   }
}, false);
}


/* Toggle Menu */
var navLinks = document.getElementById("navLinks");
function showMenu(){
   navLinks.style.right = "0";
}
function hideMenu(){
   navLinks.style.right = "-200px";
}
