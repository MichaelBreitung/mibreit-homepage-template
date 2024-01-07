mibreitFormValidator.documentReady(function () {
  var form = mibreitFormValidator.getElement('#mailing-list');
  var formReply = mibreitFormValidator.getElement('#form-reply');
  var emailElement = mibreitFormValidator.getElement("input[name='email']");
  var unsubscribeElement = mibreitFormValidator.getElement("input[name='unsubscribe']");
  var privacyElement = mibreitFormValidator.getElement("input[name='privacy']");
  var submitButton = mibreitFormValidator.getElement("input[name='submit']");
  var language = document.documentElement.lang;

  var providedSubject = new URLSearchParams(window.location.search).get('subject');
  if (providedSubject) {
    subjectElement.value = providedSubject;
  }

  var messagesGerman = {
    email: {
      required: 'Bitte geben Sie eine Email Address ein',
      invalid: 'Bitte geben Sie eine valide Email Address ein',
    },
    privacy: {
      required: '← erforderlich',
    },
  };

  var messagesEnglish = {
    email: {
      required: 'Please enter an email address',
      invalid: 'Please enter valid email address',
    },
    privacy: {
      required: '← Required',
    },
  };

  var messages;
  if (language === 'de') {
    messages = messagesGerman;
  } else {
    messages = messagesEnglish;
  }

  var validator = mibreitFormValidator.createFormValidator();
  validator.addValidator(emailElement, mibreitFormValidator.EInputType.EMAIL, messages.email);
  validator.addValidator(privacyElement, mibreitFormValidator.EInputType.CHECKBOX, messages.privacy);

  mibreitFormValidator.addClickEventListener(submitButton, function (event) {
    event.preventDefault();
    if (validator.validate()) {
      var formData = new FormData(form);
      formData.append('lang', language);
      formData.append('email', emailElement.value );

      if (typeof unsubscribeElement !== "undefined" && unsubscribeElement.checked)
      {
        formData.append('unsubscribe', 1);
      }
     
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            formReply.innerText = this.responseText;
            emailElement.value = '';
            privacyElement.checked = false;
          } else {
            console.log('failure', this.responseText);
            if (this.responseText !== '') {
              formReply.innerText = this.responseText;
            } else {
              if (language === 'de') {
                formReply.innerText = 'Ein Fehler ist aufgetreten und die Nachricht wurde nicht gesendet.';
              } else {
                formReply.innerText = 'An error occured and your message could not be sent.';
              }
            }
          }
        }
      };
      xhttp.open('POST', '/scripts/mibreit-mailing-list/mibreit-mailing-list.php', true);
      xhttp.send(formData);
    }
  });
});
