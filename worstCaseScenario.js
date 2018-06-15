var webdriver = require('selenium-webdriver');
var fs = require('fs');
//will add compatability for other browsers in future
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

   //login page
driver.get('https://portaluat.global-aero.com/Login');

//full screen window
driver.manage().window().maximize();

//log in info
driver.findElement(webdriver.By.id("inputEmail")).sendKeys("jrodriguez");
driver.findElement(webdriver.By.id("inputPassword")).sendKeys("Test@123");

//nested promises to get through to the actual UAS application screen
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

    //basic user info
driver.findElement(webdriver.By.name("firstName")).sendKeys("Joshua");    
driver.findElement(webdriver.By.name("lastName")).sendKeys("Rodriguez");
driver.findElement(webdriver.By.name("addressLine1")).sendKeys("201 Easton Ave");
driver.findElement(webdriver.By.name("city")).sendKeys("New Brunswick");
driver.findElement(webdriver.By.name("zipCode")).sendKeys("08901");
driver.findElement(webdriver.By.name("email")).sendKeys("jrodriguez@Global-Aero.com");
driver.findElement(webdriver.By.name("confirmEmail")).sendKeys("jrodriguez@Global-Aero.com");
driver.findElement(webdriver.By.name("phoneOfApplicant")).sendKeys("2016630202");
    
    //drop down menu implementation
    //this driver.wait makes it only pick NJ with selectByVisibletext(check very last lines of code for actual function)
driver.wait(
    webdriver.until.elementLocated(webdriver.By.name("state")), 10).then(element => {
    selectByVisibleText(element, "NEW JERSEY");
});

driver.wait(
    webdriver.until.elementLocated(webdriver.By.name("lastInsuranceCarrier")), 10).then(element => {
    selectByVisibleText(element, "NEW TO MARKET");
});

//continue, loads page, operator fields
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
driver.findElement(webdriver.By.id("operations_operationQuestions_publishData-0")).click();
driver.findElement(webdriver.By.id("operations_operationQuestions_publicationControl-1")).click();
driver.findElement(webdriver.By.id("operations_operationQuestions_planToImplementProcedures-1")).click();
driver.findElement(webdriver.By.id("operations_operationQuestions_personalInjuryDesired-0")).click();
driver.findElement(webdriver.By.id("operations_operationQuestions_highLiabilityLimit-1")).click();
driver.findElement(webdriver.By.id("d1d20449-414e-4f1b-86a5-02169db6f5dd")).click();
driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[2]")).click().then(function() {
    driver.wait(webdriver.until.elementLocated(webdriver.By.id("quoteNumber")), 2000).then(function() {
        driver.findElement(webdriver.By.xpath("//label[@name='physicalDamageRequired']")).click().then(function() {
            droneFields();
        });
    });    
});
}

function droneFields() {

    // adds drone < 15 lbs
    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("UASMake")), 10).then(element => {
        selectByVisibleText(element, "3D ROBOTICS INC");
    });

    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("UASModel")), 10).then(element => {
        selectByVisibleText(element, "AERO-M");
    });
    
    driver.findElement(webdriver.By.name("unknownUasSerial")).click();
    driver.findElement(webdriver.By.name("UASInsuredValue")).sendKeys("1000");
    driver.findElement(webdriver.By.name("UASManufactureYear")).sendKeys("2018");
    driver.findElement(webdriver.By.name("UASEstimatedAnnualFlightHours")).sendKeys("1000");
    driver.findElement(webdriver.By.name("addUAS")).click();
    driver.findElement(webdriver.By.xpath("//input[@value='Add Drone']")).click();

    // adds drone 15-55 lbs
    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("UASMake")), 10).then(element => {
        selectByVisibleText(element, "AERIALTRONICS");
    });

    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("UASModel")), 10).then(element => {
        selectByVisibleText(element, "ALTURA ZENITH ATX8");
    });

    driver.findElement(webdriver.By.name("unknownUasSerial")).click();
    driver.findElement(webdriver.By.name("UASInsuredValue")).sendKeys("1000");
    driver.findElement(webdriver.By.name("UASManufactureYear")).sendKeys("2018");
    driver.findElement(webdriver.By.name("UASEstimatedAnnualFlightHours")).sendKeys("1000");
    driver.findElement(webdriver.By.name("addUAS")).click();
    driver.findElement(webdriver.By.xpath("//input[@value='Add Drone']")).click();

    // adds drone 55+ lbs
    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("UASMake")), 10).then(element => {
        selectByVisibleText(element, "FLOT SYSTEMS");
    });

    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("UASModel")), 10).then(element => {
        selectByVisibleText(element, "ARC 65");
    });

    driver.findElement(webdriver.By.name("unknownUasSerial")).click();
    driver.findElement(webdriver.By.name("UASInsuredValue")).sendKeys("1000");
    driver.findElement(webdriver.By.name("UASManufactureYear")).sendKeys("2018");
    driver.findElement(webdriver.By.name("UASEstimatedAnnualFlightHours")).sendKeys("1000");
    driver.findElement(webdriver.By.name("addUAS")).click();

      //fills in all the remaining insurance fields
    driver.findElement(webdriver.By.xpath("//label[@name='sparePartsRequired']")).click();
    driver.findElement(webdriver.By.id("UASSystems_groundEquipment_input_makeOrSystem")).sendKeys("wow");
    driver.findElement(webdriver.By.id("UASSystems_groundEquipment_input_modelOrSoftware")).sendKeys("boom");
    driver.findElement(webdriver.By.name("unknownGroundEquipmentSerial")).click();
    driver.findElement(webdriver.By.id("UASSystems_groundEquipment_input_UASGroundEquipmentInsuredValue")).click();
    driver.findElement(webdriver.By.id("UASSystems_groundEquipment_input_UASGroundEquipmentInsuredValue")).sendKeys("1000");
    driver.findElement(webdriver.By.xpath("//input[@value='Save Ground Equipment']")).click();
    driver.findElement(webdriver.By.xpath("(//label[@name='sparePartsRequired'])[2]")).click();
    driver.findElement(webdriver.By.id("payloadMake")).sendKeys("boom");
    driver.findElement(webdriver.By.id("payloadModel")).sendKeys("wow");
    driver.findElement(webdriver.By.xpath("//div[@id='UASPayload']/div[3]/div/div/div/div/div[3]")).click();
    driver.findElement(webdriver.By.name("unknownPayloadSerial")).click();
    driver.findElement(webdriver.By.id("payloadInsuredValue")).sendKeys("1000");
    driver.findElement(webdriver.By.xpath("//input[@value='Save Payload']")).click();
    driver.findElement(webdriver.By.xpath("(//label[@name='sparePartsRequired'])[3]")).click();
    driver.findElement(webdriver.By.id("valueparts")).sendKeys("1000");
    driver.findElement(webdriver.By.xpath("//label[@name='nonOwnedUASRequired']")).click();
    driver.findElement(webdriver.By.id("nonOwnedInsuredValue")).sendKeys("1000");
    driver.findElement(webdriver.By.xpath("//div[@id='nonOwnedPhysicalDamageCoverage']/div[2]/div/div/div[2]/div/div")).click();
    driver.findElement(webdriver.By.xpath("//label[@name='nonOwnedPayloadRequired']")).click();
    driver.findElement(webdriver.By.id("nonOwnedPayloadInsuredValue")).sendKeys("1000");

    //continue, loads page, operator fields
    driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[3]")).click().then(function() {
        driver.wait(webdriver.until.elementLocated(webdriver.By.id("quoteNumber")), 2000).then(function() {
            operatorFields();
         });
    });
}

function operatorFields() {

    //<15lb
    driver.findElement(webdriver.By.xpath("//label[@name='cat12sUASYes']")).click();

    //15-55lb
    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("pilotCertification")), 10).then(element => {
        selectByVisibleText(element, "Student");
    });
    driver.findElement(webdriver.By.xpath("//label[@name='cat3sUASYes']")).click();
    driver.findElement(webdriver.By.id("applicantInformation_operators_modelFlighHours")).sendKeys("1000");
    driver.findElement(webdriver.By.id("applicantInformation_operators_totalFlightHours")).sendKeys("1000");

    //55+ lb
    driver.findElement(webdriver.By.xpath("//input[@value='Add Individual Operators']")).click();
    driver.findElement(webdriver.By.id("operators_namedOperators_input_firstName")).sendKeys("Joshua");
    driver.findElement(webdriver.By.id("operators_namedOperators_input_lastName")).sendKeys("Rodriguez");
    driver.findElement(webdriver.By.xpath("//img[@alt='...']")).click();
    driver.findElement(webdriver.By.xpath("//div[@id='ui-datepicker-div']/div/div/select[2]")).click();
    driver.findElement(webdriver.By.xpath("//div[@id='ui-datepicker-div']/div/div/select")).click();
    driver.findElement(webdriver.By.linkText("25")).click();
    driver.findElement(webdriver.By.id("operators_namedOperators_input_certification")).click();

    driver.wait(
        webdriver.until.elementLocated(webdriver.By.name("operators_namedOperators_input_certification")), 10).then(element => {
        selectByVisibleText(element, "Student");
    });

    driver.findElement(webdriver.By.id("operators_namedOperators_input_totalUASFlightHours")).sendKeys("1000");
    driver.findElement(webdriver.By.xpath("//label[@name='cat45sUASnamedOperatorYes']")).click();
    driver.findElement(webdriver.By.xpath("//input[@type='checkbox']")).click();
    driver.findElement(webdriver.By.xpath("(//input[@type='number'])[2]")).sendKeys("1000");

    //I do not like the sleep func in here but the wait function would not work and I have yet to have any errors
    driver.findElement(webdriver.By.xpath("//input[@value='Save']")).click().then(function() {
        driver.sleep(1000).then(function() {
            driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[4]")).click().then(function() {
                driver.wait(webdriver.until.elementLocated(webdriver.By.id("quoteNumber")), 2000).then(function() {
                    claimFields();
                });
            });
        });
    });
}

function claimFields() {
    
    driver.findElement(webdriver.By.xpath("//label[@name='medicalWaiversYes']")).click();
    driver.findElement(webdriver.By.xpath("//label[@name='violationsOrSuspensionsNo']")).click();
    driver.findElement(webdriver.By.xpath("//label[@name='accidentsOrIncidentsNo']")).click();
    driver.findElement(webdriver.By.id("applicantInformation_claims_insuranceClaimsHistoryDetails")).sendKeys("I'm Blind");

    //I do not like the sleep function but since it takes long for the page to process the claim I have not had luck with the wait function
    //I also have had no errors since implementing it at 5000 milliseconds
    driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[5]")).click().then(function() {
        driver.sleep(5000).then(function() {
            //continue, loads page, claim screenshot and liability fields
            driver.findElement(webdriver.By.xpath("(//input[@value='Continue'])[6]")).click().then(function() {
                driver.wait(webdriver.until.elementLocated(webdriver.By.id("quoteNumber")), 5000).then(function() {
                    screenshotAndliability();
                });
            });
        });
    });  
}

function screenshotAndliability() {

    /*screenshot implementation, as of right now it saves the new picture over the previous one
    I can make them save separately but just do not want 1000 picture files right now
    Also figuring out a way to screenshot entire page instead of specific section
    */
    driver.takeScreenshot().then(function(image, error) {
        fs.writeFile('Claims.png', image, 'base64', function(error){
            if (error != null)
            console.log('error occured while saving screenshot' + error);
        });
    }).then(function(){

        //liability info
    driver.findElement(webdriver.By.id("applicantInformation_liability_liabilityPremium_2000000")).click();
    driver.findElement(webdriver.By.id("applicantInformation_liability_personalInjuryLimit_2000000")).click();

    //final submit button, comment out if you dont want to submit the application
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