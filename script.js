// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let timeBlock = $(".time-block");
  let toDo = $(".description");

  $(document).ready(function () {
    $(".saveBtn").on("click", function (event) {
      let taskText = $(event.target).siblings(".description").val();
      let key = $(this).parent().attr("id");
      localStorage.setItem(key, taskText);
    });
  });

  timeBlock.each(function (i) {
    let currentHour = dayjs().format("HH");
    let id = timeBlock[i].id;
    // separates the hour in the id and converts it into an integer to be compared to currentHour
    let hour = parseInt(id.split("-")[1]);
    if (currentHour == hour) {
      $(this).addClass("present");
    } else if (currentHour > hour) {
      $(this).addClass("past");
    } else {
      $(this).addClass("future");
    }
  });

  timeBlock.each(function (i) {
    let key = timeBlock[i].id;
    // ensures that if text boxes
    if (localStorage.getItem(key) === undefined) {
      toDo.eq(i).text("");
    } else {
      toDo.eq(i).text(localStorage.getItem(key));
    }
  });

  let date = $("#currentDay");
  date.text(dayjs().format("MMMM D, YYYY"));
});
