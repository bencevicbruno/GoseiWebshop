<?php

    $first_name = $_POST['first-name'];
    $last_name = $_POST['last-name'];
    $email = $_POST['email'];
    $phone = $_POST['phone-number'];
    $message = $_POST['comment'];

    $email_subject = 'New Form submission';
    $email_body = 'You have received a new message from the user $first_name $last_name. \n Here is the message: \n $message.';

?>

<?php

    $to = 'adzic.karlo74@gmail.com';
    $header = 'From: $email \r\n';
    $header .= 'Reply-To: $email \r\n';
    mail($to, $email_subject, $email_body, $header); 

?>