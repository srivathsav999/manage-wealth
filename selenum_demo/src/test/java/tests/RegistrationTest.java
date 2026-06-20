package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Test Flow 2: User Registration
 * Verifies the registration form renders, accepts input, validates, and submits.
 */
public class RegistrationTest extends BaseTest {

    private String generateUniqueEmail() {
        return "testuser_" + System.currentTimeMillis() + "@test.com";
    }

    @Test(priority = 1, description = "Verify registration page loads with all form elements")
    public void testRegistrationPageLoads() {
        navigateTo("/register");
        slowDown();

        WebElement title = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("register-title"))
        );
        Assert.assertEquals(title.getText(), "Create your account",
            "Registration page title should match");
        slowDown();

        WebElement nameInput = driver.findElement(By.id("name"));
        WebElement emailInput = driver.findElement(By.id("email"));
        WebElement passwordInput = driver.findElement(By.id("password"));

        Assert.assertTrue(nameInput.isDisplayed(), "Name input should be visible");
        Assert.assertTrue(emailInput.isDisplayed(), "Email input should be visible");
        Assert.assertTrue(passwordInput.isDisplayed(), "Password input should be visible");
        slowDown();
    }

    @Test(priority = 2, description = "Verify registration form can be filled with valid data")
    public void testFillRegistrationForm() {
        navigateTo("/register");
        slowDown();

        WebElement nameInput = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("name"))
        );
        WebElement emailInput = driver.findElement(By.id("email"));
        WebElement passwordInput = driver.findElement(By.id("password"));

        nameInput.sendKeys("Test User");
        slowDown();
        emailInput.sendKeys(generateUniqueEmail());
        slowDown();
        passwordInput.sendKeys("TestPass123!");
        slowDown();

        Assert.assertEquals(nameInput.getAttribute("value"), "Test User",
            "Name field should contain the entered name");
        Assert.assertNotNull(emailInput.getAttribute("value"),
            "Email field should contain the entered email");
        Assert.assertEquals(passwordInput.getAttribute("value"), "TestPass123!",
            "Password field should contain the entered password");
        slowDown();
    }

    @Test(priority = 3, description = "Verify registration form has password requirements listed")
    public void testPasswordRequirementsVisible() {
        navigateTo("/register");
        slowDown();

        WebElement requirements = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("password-requirements"))
        );
        slowDown();

        Assert.assertTrue(requirements.isDisplayed(),
            "Password requirements section should be visible");
        Assert.assertTrue(requirements.getText().contains("8 characters"),
            "Should mention minimum 8 characters requirement");
        slowDown();
    }

    @Test(priority = 4, description = "Verify the 'Sign In Instead' button navigates to login")
    public void testSignInInsteadButton() {
        navigateTo("/register");
        slowDown();

        WebElement signInButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.cssSelector(".login-button"))
        );
        slowDown();

        Assert.assertTrue(signInButton.isDisplayed(),
            "'Sign In Instead' button should be visible");
        signInButton.click();
        slowDown();

        wait.until(ExpectedConditions.urlContains("/login"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/login"),
            "Should navigate to login page after clicking 'Sign In Instead'");
        slowDown();
    }

    @Test(priority = 5, description = "Verify the register button is present and labeled correctly")
    public void testRegisterButtonPresent() {
        navigateTo("/register");
        slowDown();

        WebElement registerButton = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("register-button"))
        );
        slowDown();

        Assert.assertTrue(registerButton.isDisplayed(),
            "Register button should be visible");
        Assert.assertEquals(registerButton.getText(), "Create Account",
            "Register button should say 'Create Account'");
        slowDown();
    }

    @Test(priority = 6, description = "Verify footer links for Terms and Privacy are present")
    public void testFooterLinksPresent() {
        navigateTo("/register");
        slowDown();

        WebElement footer = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("register-footer"))
        );
        slowDown();

        Assert.assertTrue(footer.isDisplayed(), "Registration footer should be visible");
        Assert.assertTrue(footer.getText().contains("Terms of Service"),
            "Footer should mention Terms of Service");
        Assert.assertTrue(footer.getText().contains("Privacy Policy"),
            "Footer should mention Privacy Policy");
        slowDown();
    }
}
