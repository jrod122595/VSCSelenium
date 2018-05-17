var webdriver = require('selenium-webdriver');
 
//will add compatability for othr browsers in future
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

// links chrome to testing site
driver.get('http://google.com');

driver.findElement(webdriver.By.name('q')).sendKeys('simple programmer');
