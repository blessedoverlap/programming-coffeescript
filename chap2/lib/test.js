(function() {
  var a, field, myFunc, someId, someName, someValue;

  $(function() {
    return $.get('example.php', function(data) {
      if (data.errors != null) {
        return alert("There was an error!");
      } else {
        return $("#content").text(data.message);
      }
    }, 'json');
  });

  if (x === true && (y === true || z === true)) {
    console.log('hello, world');
  }

  a = 'A';

  myFunc = function() {
    var b;
    a = 'AAA';
    return b = 'BBB';
  };

  someName = 'user[firstName]';

  someId = 'firstName';

  someValue = 'Bob Example';

  field = "<input type='text' name='" + someName + "' id='" + someId + "' value='" + (escape(someValue)) + "'>";

  console.log(field);

  /*
  My Awesome Library v1.0
  Copyright: Me!
  Released under the MIT License
  */


}).call(this);
