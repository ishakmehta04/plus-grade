// tests/e2e.test.ts
import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import {ServiceBuilder} from 'selenium-webdriver/chrome';
import {formInputs} from './mock';


describe('E2E Tests', () => {
  let driver: any;
  const chromeOptions = new chrome.Options();
  const DEFAULT_TIMEOUT = 30000;

  beforeAll(async () => {
    driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).setChromeService(new ServiceBuilder('./chromedriver/chromedriver')).build();
  }, DEFAULT_TIMEOUT);

  afterAll(async () => {
    await driver.quit();
  }, DEFAULT_TIMEOUT);

  test('should submit input and display result', async () => {
    await driver.get('http://localhost:3000');

    const input = await driver.findElement(By.id('annualIncome'));
    await input.sendKeys(formInputs.income, Key.RETURN);

    const dropdown = await driver.findElement(By.id('taxYear'));

    // Select an option from the dropdown
    await dropdown.click(); // Click to open the dropdown

    // Find the option to select by visible text or value
    const optionToSelect = await dropdown.findElement(By.css(`option[value="${formInputs.year}"]`));
    await optionToSelect.click(); // Click the option

    // Verify that the selected option is the one we expected
    const selectedOption = await dropdown.getAttribute('value');
    expect(selectedOption).toBe(formInputs.year);

      // Locate the button element
    const button = await driver.findElement(By.id('calculateButton')); 

    // Click the button
    await button.click();

    const element = await driver.wait(
      until.elementLocated(By.id('marginalTax')),
      10000
    );

 const isVisible = await driver.wait(until.elementIsVisible(element), 10000)
 .then(() => true)
 .catch(() => false); // Catch to determine visibility

// Assert that the element is visible
    expect(isVisible).toBe(true);
  },DEFAULT_TIMEOUT);
});
