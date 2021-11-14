# weather-app
weather-app created with js

Allows users to search for their local weather via city, country or zip.  Issue with Zip displays both the American address, but also the city code that equates to the same number. This flaw results in both an American location appearing in the weather search and an internationl location.  By default the api should only be gathering the American address per the Open Weather MAP API documentation https://openweathermap.org/current#zip, however I cannot get this to work.

Future updates will include geo locator where, the placeholder for the city/zip will be the coordinates of the user's location, if authorized. In addition to this would like to convert the longitude/latitude to display the city name.

