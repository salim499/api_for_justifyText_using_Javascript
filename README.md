# justifyText_using_Javascript

This project consists in creating a rest API with nodeJs which allows users to justify a text past in body of request to the server without using particular libraries.

### How to test this API  ? #

To test this API you can use POSTMAN

for more informations about POSTMAN [https://www.postman.com/](https://www.postman.com/ "https://www.postman.com/, ")

### how does this api work  ? #

first the user must register, and for that he must send a nickname or an email address in a json body object for example: {"email": "name@firebase.fr"} to  https://justfytextapi.herokuapp.com/api/token in our case.

once the user sends his nickname he will receive a jwt token in json format.

after that the user can send a text to justify it in to https://justfytextapi.herokuapp.com/api/token, but for that he must include the token in the header, once he post the text, he get back the result as justify text.

### rules of our api #

a user has the right to use up to 80000 words in every 24 hours, but he can not use more then that number.


### link of our api #

the link to authentification :
[https://justfytextapi.herokuapp.com/api/token](https://justfytextapi.herokuapp.com/api/token "https://justfytextapi.herokuapp.com/api/token, ").

the link to justify the text : 
[ https://justfytextapi.herokuapp.com/api/justify]( https://justfytextapi.herokuapp.com/api/justify " https://justfytextapi.herokuapp.com/api/justify, ").

### demonstration #
clique in the url to get and see my video of demonstartion
[ https://ufile.io/av7ttbb1]( https://ufile.io/av7ttbb1 " https://ufile.io/av7ttbb1, ").

 
