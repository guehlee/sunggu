$(document).ready(function () {
  console.log("Ready!");
});

document.addEventListener("DOMContentLoaded", function () {
  const viewProject = document.getElementById("openSidebar");
  const sidebar = document.querySelector(".sidebar");

  if (viewProject && sidebar) {
    viewProject.addEventListener("click", function (event) {
      sidebar.classList.add("show");
      event.stopPropagation(); // Prevent this click from triggering the outside-click logic
    });

    // Close sidebar on outside click
    document.addEventListener("click", function (event) {
      if (
        sidebar.classList.contains("show") &&
        !sidebar.contains(event.target)
      ) {
        sidebar.classList.remove("show");
      }
    });

    // Prevent clicks *inside* the sidebar from closing it
    sidebar.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }
});
