document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! Your registration has been received.");
    this.reset();
  });
