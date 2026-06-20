package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Test Flow 5: Add Account Form
 * Verifies the Add Account form loads, all fields are present,
 * and the form can be filled with valid data.
 */
public class AddAccountFormTest extends BaseTest {

    @Test(priority = 1, description = "Verify the Add Account form page loads correctly")
    public void testAddAccountFormLoads() {
        navigateTo("/AddAccountForm");
        slowDown();

        WebElement formTitle = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("form-title"))
        );
        slowDown();

        Assert.assertTrue(formTitle.isDisplayed(), "Form title should be visible");
        Assert.assertEquals(formTitle.getText(), "Account Details",
            "Form title should be 'Account Details'");
        slowDown();
    }

    @Test(priority = 2, description = "Verify sidebar content is displayed")
    public void testSidebarContent() {
        navigateTo("/AddAccountForm");
        slowDown();

        WebElement sidebarTitle = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("sidebar-title"))
        );
        slowDown();

        Assert.assertTrue(sidebarTitle.isDisplayed(), "Sidebar title should be visible");
        Assert.assertEquals(sidebarTitle.getText(), "Add Your Bank Account",
            "Sidebar title should match");
        slowDown();

        WebElement requirementsList = driver.findElement(By.className("requirements-list"));
        Assert.assertTrue(requirementsList.isDisplayed(),
            "Requirements list should be visible in the sidebar");
        slowDown();
    }

    @Test(priority = 3, description = "Verify Account Type dropdown has all options")
    public void testAccountTypeDropdown() {
        navigateTo("/AddAccountForm");
        slowDown();

        WebElement accountTypeSelect = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("accountType"))
        );
        slowDown();

        Select accountTypeDropdown = new Select(accountTypeSelect);
        int optionCount = accountTypeDropdown.getOptions().size();

        Assert.assertTrue(optionCount >= 7,
            "Account type dropdown should have at least 7 options (got " + optionCount + ")");
        slowDown();
    }

    @Test(priority = 4, description = "Verify Bank Name dropdown has all options")
    public void testBankNameDropdown() {
        navigateTo("/AddAccountForm");
        slowDown();

        WebElement bankNameSelect = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("bankName"))
        );
        slowDown();

        Select bankNameDropdown = new Select(bankNameSelect);
        int optionCount = bankNameDropdown.getOptions().size();

        Assert.assertTrue(optionCount >= 10,
            "Bank name dropdown should have at least 10 options (got " + optionCount + ")");
        slowDown();
    }

    @Test(priority = 5, description = "Verify form fields can be filled with valid data")
    public void testFillFormFields() {
        navigateTo("/AddAccountForm");
        slowDown();

        // Select Account Type
        WebElement accountTypeSelect = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("accountType"))
        );
        Select accountTypeDropdown = new Select(accountTypeSelect);
        accountTypeDropdown.selectByVisibleText("Savings Account");
        slowDown();
        Assert.assertEquals(accountTypeDropdown.getFirstSelectedOption().getText(),
            "Savings Account", "Account type should be 'Savings Account'");

        // Select Bank Name
        WebElement bankNameSelect = driver.findElement(By.id("bankName"));
        Select bankNameDropdown = new Select(bankNameSelect);
        bankNameDropdown.selectByVisibleText("HDFC Bank");
        slowDown();
        Assert.assertEquals(bankNameDropdown.getFirstSelectedOption().getText(),
            "HDFC Bank", "Bank name should be 'HDFC Bank'");

        // Fill Account Holder Name
        WebElement holderName = driver.findElement(By.id("accountHolderName"));
        holderName.sendKeys("John Doe");
        slowDown();
        Assert.assertEquals(holderName.getAttribute("value"), "John Doe",
            "Account holder name should match entered value");

        // Fill Account Number
        WebElement accountNumber = driver.findElement(By.id("accountNumber"));
        accountNumber.sendKeys("1234567890");
        slowDown();
        Assert.assertEquals(accountNumber.getAttribute("value"), "1234567890",
            "Account number should match entered value");
        slowDown();
    }

    @Test(priority = 6, description = "Verify the submit button is present and labeled correctly")
    public void testSubmitButtonPresent() {
        navigateTo("/AddAccountForm");
        slowDown();

        WebElement submitButton = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("submit-button"))
        );
        slowDown();

        Assert.assertTrue(submitButton.isDisplayed(),
            "Submit button should be visible");
        Assert.assertEquals(submitButton.getText(), "Add Account",
            "Submit button text should be 'Add Account'");
        slowDown();
    }
}
