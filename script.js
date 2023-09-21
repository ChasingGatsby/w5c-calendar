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
  let timeBlock = $(".time-block");
  let toDo = $(".description");

  $(document).ready(function () {
    $(".saveBtn").on("click", function (event) {
      let taskText = $(event.target).siblings(".description").val();
      let key = $(this).parent().attr('id');
      localStorage.setItem(key, taskText);
    });
  });
  //

  timeBlock.each(function(i) {
    let currentHour = dayjs().format("HH");
    let id = timeBlock[i].id;
    let hour = parseInt(id.split("-")[1]);
    if (currentHour == hour) {
      $(this).addClass('present')
    } else if (currentHour < hour) {
      $(this).addClass('past')
    } else {
      $(this).addClass('future')
    }
  })

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  timeBlock.each(function(i) {
    let key = timeBlock[i].id;
    if (localStorage.getItem(key) === undefined) {
      toDo.eq(i).text("");
    } else {
      toDo.eq(i).text(localStorage.getItem(key));
    }
  })
  // TODO: Add code to display the current date in the header of the page.
  let date = $("#currentDay");
  date.text(dayjs().format("MMMM D, YYYY"));
});
