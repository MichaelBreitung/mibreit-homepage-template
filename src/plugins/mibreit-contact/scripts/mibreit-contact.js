var mibreitContact = function (smtp = false) {
  var form = mibreitFormValidator.getElement('#contact');
  var formReply = mibreitFormValidator.getElement('#form-reply');
  var emailElement = mibreitFormValidator.getElement("input[name='email']");
  var privacyElement = mibreitFormValidator.getElement("input[name='privacy']");
  var subjectElement = mibreitFormValidator.getElement("input[name='subject']");
  var homepageElement = mibreitFormValidator.getElement("input[name='homepage']");
  var messageElement = mibreitFormValidator.getElement("textarea[name='message']");
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
    subject: {
      required: 'Bitten nennen Sie den Betreff',
    },
    message: {
      required: 'Bitte geben Sie eine Nachricht ein',
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
    subject: {
      required: 'Do not forget to enter a subject',
    },
    message: {
      required: 'Please enter a message',
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
  validator.addValidator(subjectElement, mibreitFormValidator.EInputType.TEXT, messages.subject);
  validator.addValidator(messageElement, mibreitFormValidator.EInputType.TEXT, messages.message);

  mibreitFormValidator.addClickEventListener(submitButton, function (event) {
    formReply.innerText = '';
    event.preventDefault();
    if (validator.validate()) {
      var formData = new FormData(form);
      formData.append('lang', language);

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            formReply.innerText = this.responseText;
            emailElement.value = '';
            homepageElement.value = '';
            subjectElement.value = '';
            messageElement.value = '';
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

      if (smtp)
      {
        xhttp.open('POST', '/scripts/mibreit-contact/mibreit-email-v2.php', true);
      }
      else {
        xhttp.open('POST', '/scripts/mibreit-contact/mibreit-email.php', true);
      }
      
      xhttp.send(formData);
    }
  });
};
