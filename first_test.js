var webdriver = require('selenium-webdriver');

//will add compatability for other browsers in future
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

// links chrome to testing site
// used to have it go to home but button click messed it up
driver.get('https://testingportal.ut.aeroinsure.com/DTM/US/UAS/Home');

// uses xpath to go to path(next page) based on button click
//gets to application fields page then fills fields
//have to figure out how to automatically pick between indiv or org in different cases
driver.findElement(webdriver.By.xpath("//button[@type='button']")).click().then(function() {
    driver.sleep(1000).then(function() {
        driver.findElement(webdriver.By.xpath("//div[@id='applicantDetails']/div/div/label")).click().then(function() {
    fields();
});});});

function fields() {

//driver.findElement(webdriver.By.name("organizationName")).sendKeys("Global Aerospace");
//driver.findElement(webdriver.By.name("organizationContactFirstName")).sendKeys("Joshua");
//driver.findElement(webdriver.By.name("organizationContactLastName")).sendKeys("Rodriguez");

driver.findElement(webdriver.By.name("firstName")).sendKeys("Joshua");
driver.findElement(webdriver.By.name("lastName")).sendKeys("Rodriguez");
driver.findElement(webdriver.By.name("addressLine1")).sendKeys("201 Easton Ave");
driver.findElement(webdriver.By.name("city")).sendKeys("New Brunswick");
driver.findElement(webdriver.By.name("zipCode")).sendKeys("08901");
driver.findElement(webdriver.By.name("email")).sendKeys("jrodriguez@Global-Aero.com");
driver.findElement(webdriver.By.name("confirmEmail")).sendKeys("jrodriguez@Global-Aero.com");
driver.findElement(webdriver.By.name("phoneOfApplicant")).sendKeys("2016630202");

    //drop down menu implementation
    // this driver.wait makes it only pick NJ with selectByVisibletext func
driver.wait(
    webdriver.until.elementLocated(webdriver.By.name("state")), 10).then(element => {
    selectByVisibleText(element, "NEW JERSEY");
});

driver.wait(
    webdriver.until.elementLocated(webdriver.By.name("lastInsuranceCarrier")), 10).then(element => {
    selectByVisibleText(element, "NONE");
});

//clicks checkbox
driver.findElement(webdriver.By.className("recaptcha-checkbox-checkmark")).click();

driver.findElement(webdriver.By.xpath("//input[@value='Continue']")).click();

}

//function that searches through drop downs
function selectByVisibleText(select, textDesired) {
    select.findElements(webdriver.By.tagName('option'))
    .then(options => {
        options.map(option => {
            option.getText().then(text => {
                if (text == textDesired)
                    option.click();
            });
        });
    });
}

/*
function check_title() {
    var promise = driver.getTitle().then(function(title) {
        if (title === 'AIRCRAFT INSURANCE APPLICATION' )
        {
            console.log('success');
            return true;

        }
        else
        {
            console.log('fail -- ' + title);
        }
    });
return promise;
}
*/