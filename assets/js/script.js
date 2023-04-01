$("#current-time").text(dayjs().format("MMM DD, YYYY [at] hh:mm:ssA"));
setInterval(function () {
  $("#current-time").text(dayjs().format("MMM DD, YYYY [at] hh:mm:ssA"));
}, 1000);

$(function () {
  $("#date-select").datepicker();
});

$(function () {
  $("project-type-input").selectmenu();
});

var projectListLocalStorage = [];

$("#add-project-btn").click(function () {
  var projectDetails = {
    name: $("#project-name-input").val(),
    type: $("#project-type-input").val(),
    date: $("#date-select").val(),
  };
  projectListLocalStorage.push(projectDetails);
  localStorage.setItem("Projects", JSON.stringify(projectListLocalStorage));
  clearList();
  getData();
});

function clearList() {
  $("#project-list").children().remove("tr");
  $(
    '<tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Due Date</th><th scope="col">Remove</th></tr>'
  ).appendTo($("#project-list"));
}

function getData() {
  projectListLocalStorage = JSON.parse(localStorage.getItem("Projects"));
  for (let i = 0; i < projectListLocalStorage.length; i++) {
    var newTrEl = $("<tr>");
    newTrEl.attr("data", i);
    newTrEl.appendTo($("#project-list"));
    Object.values(projectListLocalStorage[i]).forEach(function (val) {
      $("<th>" + val + "</th>").appendTo(newTrEl);
    });
    $("<th>X</th>").appendTo(newTrEl);
  }
}

if (localStorage.getItem("Projects") == null) {
  projectListLocalStorage = [];
  console.log("hello");
} else {
  getData();
}
