# StarshoftSoftware Ionic Technical Test

**By** David López Castellote

## Webapp deploy

:point_right: https://starshotsoftware-test.firebaseapp.com/

## Android APK Download

[Download link](https://github.com/Dellos7/starshotsoftware-test-app/blob/master/releases/android/StarshoftSoftwareIonicTestApp.apk?raw=true)

or

<img src="github/apk_download_qr.jpg" alt="Apk QR download" width="200"/>

## Additional Questions

1. **If instead to get the mock data from arrays in the application, we have an external API, which method would do you recommend for this case (websockets or http requests) ? Could you tell me why did you choose it and in which case is better use one or another?**

I think that choosing websockets or http requests to get data from an external API is something that depends on what we are building and especially what kind of APi we are consuming. 

I mean, in order to set up the websockets alternative, we should have an API that supports the websockets implementation. If the server-side does not support it, we just can't use websockets. 

However, in my opinion websockets are probably always a better alternative than HTTP requests (but always taking into account what do we want to achieve and the features we are implementing. Sometimes websockets are just no sense) because the client-side does not have to keep making calls all the time to the server in order to ask if we have new data or if something has been updated. In this case, when something changes or gets updated on the server, it would just send the update to the clients connected through the websocket and they would update the data and UI accordingly.

2. **Could you tell us honestly which difficulties have you found at time to do the app?**

The great part of the *difficulties* that I've found while building the app have been when building the chart. I honestly had never worked with charts in an Ionic app, and I didn't even know what library could I use. So I had to make a little bit of research to find a good chart library for webapps and I finally chose [Chart.js](https://www.chartjs.org/). So I had to learn the basis of the library and apply them to the app. I also spent some time building the chart because I had to think up of a method to get random colors for the graph and also to show the % of the data in the graph.

I also faced little issues in order to update the timeout of the observable and validating at the same time the form because there is a bug in angular that does not update the form validation immediately when using the `(ngModelChange)` directive and I had to figure out what was happening.

Then, I started doing the optional part of the application (storing the data of the chart in a local SQLite database). I started using the native ionic plugin in order to set up the database and perform SQL queries in order to retrieve the data, but then I realized that this kind of native plugins don't work in the browser. As I wanted to deploy the app as a webapp and be able to run it through the browser, I quit this plugin and the code and then used the [Ionic Storage](https://ionicframework.com/docs/storage/) plugin. This plugin allows to store JSON data in DB, both in browser and devices. It's also possible to configure priorize SQLite as DB if available.

3. **What do you think we could improve in the app? (feel free to explain whatever you want, this question is to know more about your thought).**

For instance, in the welcome page of the app, it says that I have to use 1 directive and at least 1 pipe at my choice. In my opinion it's not clear if we have to just use them (I mean, use the built-in pipes of angular or the ones from ionic) or create them and then use them. If we have to just use them, and not create our own ones, the time spent developing the app is less.

4. **How much time did you spend doing the test? How long do you think the test is intended to be done?**

I think that I finally spent between about 7 hours since I created the project until I uploaded the app to the Firebase hosting and built the apk. But I added some additional stuff in the chart page and I tried to polish all the features, put comments in the code, made the optional part of the test, etc. I mean, I think that I could have done it in less time, achieving the minimal features, but worst done.

About the intended time to do the test, perhaps if I had ever used a chart library, if I dind't have created my own pipes/directives, dind't have put the refresh countdown, didn't have done the optional part, I could have done it in 2-3 hours or so