$ ->
  $.get 'example.php', (data)->
      if data.errors?
        alert "There was an error!"
      else
        $("#content").text data.message
    , 'json'

if x is true and (y is true or z is true)
  console.log 'hello, world'

a = 'A'
myFunc = ->
  a = 'AAA'
  b = 'BBB'

someName = 'user[firstName]'
someId = 'firstName'
someValue = 'Bob Example'
field = "<input type='text' name='#{someName}' id='#{someId}' value='#{escape someValue}'>"
console.log field

###
My Awesome Library v1.0
Copyright: Me!
Released under the MIT License
###