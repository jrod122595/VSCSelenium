var webdriver = require('selenium-webdriver'),
    By = webdriver.By
    until = webdriver.until;

//will add compatability for othr browsers in future
var driver = new webdriver.Builder().
    forBrowser('chrome').
    build();
    // withCapabilities(webdriver.Capabilities.chrome()).

// links chrome to testing site
driver.get('http://google.com/ncr');
driver.findElement(By.name('q')).sendKeys('facebook').then(function() {
    driver.findElement(By.name('btnK')).click();
});

//driver.findElement(By.name('q')).clear();

//driver.findElement(By.name('btnK')).click();