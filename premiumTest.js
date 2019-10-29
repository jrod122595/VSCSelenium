var webdriver = require('selenium-webdriver');
var fs = require('fs');
//will add compatability for other browsers in future
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

   //login page
driver.get('https://portaluat.global-aero.com/Login');

driver.manage().window().maximize();
//log in
driver.findElement(webdriver.By.id("inputEmail")).sendKeys("jrodriguez");
driver.findElement(webdriver.By.id("inputPassword")).sendKeys("********");

driver.findElement(webdriver.By.xpath("//input[@value='Login']")).click().then(function() {
    driver.wait(webdriver.until.elementLocated(webdriver.By.linkText("NEW APPLICATION")), 20000).then(function() {
        driver.findElement(webdriver.By.linkText("NEW APPLICATION")).click().then(function() {
            driver.findElement(webdriver.By.xpath("//div[@id='header']/div/div/div[2]/ul/li[3]/ul/li[2]")).click().then(function() {
                driver.wait(webdriver.until.elementLocated(webdriver.By.className("aeroinsureSubHeader underlined")), 5000).then(function() {
                    driver.findElement(webdriver.By.xpath("//div[@id='applicantDetails']/div/div/label")).click().then(function() {
                        applicantFields();
                    });
                });
            });
        });
    });
});
function applicantFields() {

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
    selectByVisibleText(element, "NEW TO MARKET");
});

driver.findElement(webdriver.By.xpath("//input[@value='Continue']")).click().then(function() {
    driver.wait(webdriver.until.elementLocated(webdriver.By.id("quoteNumber")), 2000).then(function() {
        operationsFields();
    });
});

}
function operationsFields() {

driver.findElement(webdriver.By.id("operations_operationQuestions_accordanceFAA-0")).click();
driver.findElement(webdriver.By.id("operations_operationQuestions_operatedIndoors-1")).click();
driver.findElement(webdriver.By.id("operations_operationQuestions_operatedOverPersons-1")).click();
driver.findElement(webdriver.By.id("operations_operationQuestions_publishData-1")).click();
driver.findElement(webdriver.By.id("operations_operationQuestions_highLiabilityLimit-1")).click();
driver.findElement(webdriver.By.id("d1d20449-414e-4f1b-86a5-02169db6f5dd")).click();
driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[2]")).click().then(function() {
    driver.wait(webdriver.until.elementLocated(webdriver.By.id("quoteNumber")), 2000).then(function() {
        driver.findElement(webdriver.By.xpath("//label[@name='physicalDamageNotRequired']")).click().then(function() {
            droneFields();
        });
    });    
});
}

function droneFields() {

    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("UASMake")), 10).then(element => {
        selectByVisibleText(element, "3D ROBOTICS INC");
    });

    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("UASModel")), 10).then(element => {
        selectByVisibleText(element, "AERO-M");
    });
    
    driver.findElement(webdriver.By.name("unknownUasSerial")).click();
    driver.findElement(webdriver.By.name("UASManufactureYear")).sendKeys("2018");
    driver.findElement(webdriver.By.name("UASEstimatedAnnualFlightHours")).sendKeys("1000");
    driver.findElement(webdriver.By.name("addUAS")).click();
    driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[3]")).click().then(function() {
        driver.wait(webdriver.until.elementLocated(webdriver.By.id("quoteNumber")), 2000).then(function() {
            operatorToClaimFields();
         });
    });
}

function operatorToClaimFields() {
    driver.findElement(webdriver.By.xpath("//label[@name='cat12sUASYes']")).click();
    driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[4]")).click();
    driver.findElement(webdriver.By.xpath("//label[@name='medicalWaiversNo']")).click();
    driver.findElement(webdriver.By.xpath("//label[@name='violationsOrSuspensionsNo']")).click();
    driver.findElement(webdriver.By.xpath("//label[@name='accidentsOrIncidentsNo']")).click();
    driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[5]")).click().then(function() {
        driver.sleep(5000).then(function() {
            driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[6]")).click().then(function() {
                driver.wait(webdriver.until.elementLocated(webdriver.By.id("quoteNumber")), 5000).then(function() {
                    claimAndliability();
                });
            });
        });
    });  
}

function claimAndliability() {
    driver.takeScreenshot().then(function(image, error) {
        fs.writeFile('Premiums.png', image, 'base64', function(error){
            if (error != null)
            console.log('error occured while saving screenshot' + error);
        });
    }).then(function(){
    driver.findElement(webdriver.By.id("applicantInformation_liability_liabilityPremium_2000000")).click();
    driver.findElement(webdriver.By.id("applicantInformation_liability_personalInjuryLimit_2000000")).click();
    driver.findElement(webdriver.By.xpath("//input[@value='Submit']")).click();
    });
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
