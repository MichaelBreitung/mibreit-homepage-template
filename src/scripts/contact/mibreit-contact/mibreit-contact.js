$(function () {
  var form = $("#contact");
  var formReply = $("#form-reply");

  var language = $("html").attr("lang");

  var providedSubject = new URLSearchParams(window.location.search).get("subject");
  if (providedSubject) {
    $("input[name='subject']").val(providedSubject);
  }

  var messagesGerman = {
    email: {
      required: "Bitte geben Sie eine Email Address ein",
      email: "Bitte geben Sie eine <em>valide</em> Email Address ein",
    },
    subject: {
      required: "Bitten nennen Sie den Betreff",
    },
    message: {
      required: "Bitte geben Sie einen Nachricht ein",
    },
    privacy: {
      required: "← erforderlich",
    },
  };

  var messagesEnglish = {
    email: {
      required: "Please enter an email address",
      email: "Please enter <em>valid</em> eamil address",
    },
    privacy: {
      required: "← Required",
    },
  };

  // setup validator
  $(form).validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
      },
      subject: {
        required: true,
      },
      privacy: {
        required: true,
      },
    },
    messages: language === "de" ? messagesGerman : messagesEnglish,
    invalidHandler: function (form) {
      $(formReply).empty();
    },
    submitHandler: function (event, validator) {
      var formData = $(form).serialize();
      formData += "&lang=" + language;

      $(formReply).empty();
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: formData,
      })
        .done(function (response) {
          $(formReply).text(response);

          // Clear the form.
          $("#email").val("");
          $("#homepage").val("");
          $("#subject").val("");
          $("#message").val("");
          $("#privacy").prop("checked", false);
        })
        .fail(function (data) {
          if (data.responseText !== "") {
            $(formReply).text(data.responseText);
          } else {
            if (language === "de") {
              $(formReply).text(
                "Ein Fehler ist aufgetreten und die Nachricht wurde nicht gesendet."
              );
            } else {
              $(formReply).text("An error occured and your message could not be sent.");
            }
          }
        });
    },
  });
});
