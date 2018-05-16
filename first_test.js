var webdriver = require('selenium-webdriver');
 
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();
 
driver.get('http://testingportal.na-onbaseappsys.global.local/DTM/US/UAS/Home');
//driver.findElement(webdriver.By.name('q')).sendKeys('simple programmer');
driver.findElement(webdriver.By.name('Get a free quote')).click();
//driver.findElement()

//driver.quit();