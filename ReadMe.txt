Hello, my name is Joshua Rodriguez and this is where I'll explain the basics of my selenium webdriver tests.

oldtest.js was my first iteration on one of the test portal sites. 
The captcha blocked me from progressing on the commmercial site so I moved over to the broker site.

brokertest.js was a more refined version of the old test. 
It goes from the login page through to submitting the claim.
I got rid of sleep functions by using waits until it found an element on the following page.
I have not had any timeout errors since the change.
I also implemented taking screenshots on the physical damage and claims page to test functionality.
My issue with this is that it only takes a screenshot of a specific section instead of the entire window. 
I think I found a 3rd party library (ashot) to possibly work around it and I will change this based on where Rob wants it implemented in the future.

My next two files, referredTest.js and premiumTest.js will focus on whether it refers you to an underwriter or gives you the premium on the spot.
On the premium side my goal is to also get through to the payment screen but since you have to send an email to yourself to confirm the claim it might cause a problem.
These tests will also add more logic to them so that there is some variability to the tests.

My newest implementation, worstCaseScenario.js, tests the limits of all the functionality on the broker site.
It adds each <15lb, 15-55lb, and 55+lb drones with all insurance information and popups filled out.
It is completely annotated so it is alot easier to understand in comparison to the other files.

How to run the tests:
Open files on visual studio then input "Node worstCaseScenario.js" in the terminal and click enter and the chrome window should pop up within a few seconds.

If any errors occur, close the window, rerun the test case and let me know the error.

Contact jrodriguez@Global-Aero.com or 2016630202 for any suggestions or concerns. Any input would be appreciated!

