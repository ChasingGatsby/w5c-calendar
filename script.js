// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  let timeBlock = document.querySelectorAll(".time-block");
  let toDo = document.querySelectorAll(".description");

  $(document).ready(function () {
    $(".saveBtn").on("click", function (event) {
      let taskText = $(event.target).siblings(".description").val();
      let key = this.parentNode.id;
      localStorage.setItem(key, taskText);
    });
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  for (i = 0; i < timeBlock.length; i++) {
    let currentHour = dayjs().format("HH");
    let id = timeBlock[i].id;
    let hour = parseInt(id.split("-")[1]);
    if (currentHour == hour) {
      timeBlock[i].classList.add("present")
    } else if (currentHour < hour) {
      timeBlock[i].classList.add('past')
    } else {
      timeBlock[i].classList.add('future')
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (i = 0; i < timeBlock.length; i++) {
    let key = timeBlock[i].id;
    if (localStorage.getItem(key) === undefined) {
      toDo[i].textContent = "";
    } else {
      toDo[i].textContent = localStorage.getItem(key);
    }
  }
  // TODO: Add code to display the current date in the header of the page.
  let date = $("#currentDay");
  date.text(dayjs().format("MMMM D, YYYY"));
});
