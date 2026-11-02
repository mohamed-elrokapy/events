// Demo registration form: validates in the browser and shows an inline success state.
// Nothing is sent to a server. Connect a real endpoint (or a Brevo form) before using it for real.
(function () {
  var form = document.getElementById("register-form");
  var success = document.getElementById("success");
  var successTitle = document.getElementById("success-title");
  var again = document.getElementById("again");

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var fields = [
    {
      input: document.getElementById("name"),
      error: document.getElementById("name-error"),
      validate: function (v) {
        return v ? "" : "Enter your name.";
      },
    },
    {
      input: document.getElementById("email"),
      error: document.getElementById("email-error"),
      validate: function (v) {
        if (!v) return "Enter your email address.";
        return EMAIL_RE.test(v) ? "" : "Enter a valid email address, for example name@example.com.";
      },
    },
    {
      input: document.getElementById("job"),
      error: document.getElementById("job-error"),
      validate: function (v) {
        return v ? "" : "Enter your job title.";
      },
    },
  ];

  function check(field) {
    var message = field.validate(field.input.value.trim());
    field.error.textContent = message;
    if (message) field.input.setAttribute("aria-invalid", "true");
    else field.input.removeAttribute("aria-invalid");
    return message === "";
  }

  fields.forEach(function (field) {
    var touched = false;
    field.input.addEventListener("blur", function () {
      touched = true;
      check(field);
    });
    field.input.addEventListener("input", function () {
      if (touched) check(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var firstInvalid = null;
    fields.forEach(function (field) {
      if (!check(field) && !firstInvalid) firstInvalid = field.input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var name = fields[0].input.value.trim();
    successTitle.textContent = "Thank you, " + name;
    form.hidden = true;
    success.hidden = false;
    success.focus();
    form.reset();
  });

  again.addEventListener("click", function () {
    success.hidden = true;
    form.hidden = false;
    fields[0].input.focus();
  });
})();
