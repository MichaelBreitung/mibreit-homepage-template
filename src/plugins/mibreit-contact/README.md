# Contact Form

Included under "scripts", you'll find two PHP files called "mibreit-email.php" and "mibreit-email-v2.php". Per default, "mibreit-email.php" is used to send contact emails. It uses PHPs built-in "mail" function. This approach is not recommended though and on some servers, it might not work. It is why I also provide a version 2, using [PHPMailer](https://github.com/PHPMailer/PHPMailer).

## How to use Version 2

Since this version depends on PHPMailer, you first must install it. It's not included with this repository. To install PHPMailer, you need to setup _Composer_ first by running ``composer install`` inside the "src/plugins/" folder.

Once you installed the dependencies, you can open the "page-data.json" and insert your SMTP information. Then, rebuild the site using _gulp_ and you are ready to go.