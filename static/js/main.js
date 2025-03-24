// Custom js

// Copyright year
document.addEventListener("DOMContentLoaded", function () {
  var yearSpan = document.getElementById("js-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
