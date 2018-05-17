var webdriver = require('selenium-webdriver');
 
//will add compatability for othr browsers in future
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

// links chrome to testing site
driver.get('http://testingportal.na-onbaseappsys.global.local/DTM/US/SNK/Home');


//driver.findElement(webdriver.By.name('q')).sendKeys('simple programmer');
// sample code to fill text box, still curious to why q and how to correctly use name

// uses xpath to go to path(nest page) based on button click
driver.findElement(webdriver.By.xpath("//button[@type='button']")).click();

//gets to application fields page
//have to figure out how to automatically pick between indiv or org in different cases

//also how to randomly generate names, probably a func for it
//driver.findElement(webdriver.By.name('firstname')).sendKeys('josh');


driver.findElement(webdriver.By.id("application_insured_firstNameOfApplicant")).click();
//driver.findElement(webdriver.By.name('firstName')).clear();
driver.findElement(webdriver.By.id("application_insured_firstNameOfApplicant")).sendKeys("Josh");


//driver.findElement(webdriver.By.name('Get a free quote')).click();
//driver.findElement()

