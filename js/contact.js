var LPAWS = {};

AWS.config.region = 'us-east-1';
//////////////////////////////////////////////
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:d5e877e5-7fd4-4bf5-9928-ff712514f064'
});

LPAWS.sendToTopic = function () {
    var sns = new AWS.SNS({apiVersion: '2010-03-31'});
    var fullMessage =
        "Name: " + document.querySelector('#name').value + "\n" +
        "Subject: " + document.querySelector('#subject').value + "\n" +
        "Email: " + document.querySelector('#mail').value + "\n" +
        "Message: " + document.querySelector('#message').value + "\n";

    var params = {
        Message: fullMessage.toString(),
        Subject: 'Penny Royalty Email Question From ' + document.querySelector('#name').value,
        TopicArn: 'arn:aws:sns:us-east-1:159241008783:Get_Stammered_Contact_Form'
    };
    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
            window.location.replace('thanks.html');
        }
    });
};

$('form').submit(function (event) {
    event.preventDefault();
    LPAWS.sendToTopic();
    return false;
});