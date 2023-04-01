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
  $("#project-name-input").val(""),
    $("#project-type-input").val(""),
    $("#date-select").val(""),
    getData();
});

function clearList() {
  $("#project-list").children().remove("tr");
  $(
    '<tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Due Date</th><th scope="col">Remove</th></tr>'
  ).appendTo($("#project-list"));
}

function getData() {
  clearList();
  projectListLocalStorage = JSON.parse(localStorage.getItem("Projects"));
  for (let i = 0; i < projectListLocalStorage.length; i++) {
    var newTrEl = $("<tr>");
    newTrEl.attr("data-value", i);
    newTrEl.appendTo($("#project-list"));
    Object.values(projectListLocalStorage[i]).forEach(function (val) {
      $("<th>" + val + "</th>").appendTo(newTrEl);
    });
    $('<th class="remove">X</th>').appendTo(newTrEl);
  }
  $(".remove").on("click", function (event) {
    var parentElement = $(this).parent();
    var parentData = parentElement.data().value;
    projectListLocalStorage.splice(parentData, 1);
    localStorage.setItem("Projects", JSON.stringify(projectListLocalStorage));
    getData();
  });
  for (let j = 0; j < projectListLocalStorage.length; j++) {
    var checkDueDate = $("*[data-value=" + j + "]")
      .children()
      .eq(2)
      .text();
    if (dayjs().isBefore(checkDueDate, "day")) {
      $("*[data-value=" + j + "]").addClass("bg-success");
    } else if (dayjs().isAfter(checkDueDate, "day")) {
      $("*[data-value=" + j + "]").addClass("bg-danger");
    } else {
      $("*[data-value=" + j + "]").addClass("bg-warning text-black");
    }
  }
}

if (localStorage.getItem("Projects") == null) {
  projectListLocalStorage = [];
  console.log("hello");
} else {
  getData();
}
