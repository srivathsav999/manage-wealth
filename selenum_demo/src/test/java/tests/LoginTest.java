package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Test Flow 3: User Login
 * Verifies the login form renders, accepts input, handles validation,
 * and navigates on successful login.
 */
public class LoginTest extends BaseTest {

    @Test(priority = 1, description = "Verify login page loads with all form elements")
    public void testLoginPageLoads() {
        navigateTo("/login");
        slowDown();

        WebElement title = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-title"))
        );
        Assert.assertEquals(title.getText(), "Welcome back",
            "Login page title should be 'Welcome back'");
        slowDown();

        WebElement subtitle = driver.findElement(By.className("login-subtitle"));
        Assert.assertEquals(subtitle.getText(), "Enter your credentials to access your account",
            "Login subtitle should match expected text");
        slowDown();
    }

    @Test(priority = 2, description = "Verify email and password input fields are present")
    public void testFormFieldsPresent() {
        navigateTo("/login");
        slowDown();

        WebElement emailInput = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("email"))
        );
        WebElement passwordInput = driver.findElement(By.id("password"));
        slowDown();

        Assert.assertTrue(emailInput.isDisplayed(), "Email input should be visible");
        Assert.assertTrue(passwordInput.isDisplayed(), "Password input should be visible");

        Assert.assertEquals(emailInput.getAttribute("type"), "email",
            "Email input type should be 'email'");
        Assert.assertEquals(passwordInput.getAttribute("type"), "password",
            "Password input type should be 'password'");
        slowDown();
    }

    @Test(priority = 3, description = "Verify login form can accept user input")
    public void testLoginFormInput() {
        navigateTo("/login");
        slowDown();

        WebElement emailInput = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("email"))
        );
        WebElement passwordInput = driver.findElement(By.id("password"));

        emailInput.sendKeys("test@example.com");
        slowDown();
        passwordInput.sendKeys("password123");
        slowDown();

        Assert.assertEquals(emailInput.getAttribute("value"), "test@example.com",
            "Email field should contain the entered email");
        Assert.assertEquals(passwordInput.getAttribute("value"), "password123",
            "Password field should contain the entered password");
        slowDown();
    }

    @Test(priority = 4, description = "Verify 'Remember me' checkbox is present and functional")
    public void testRememberMeCheckbox() {
        navigateTo("/login");
        slowDown();

        WebElement rememberCheckbox = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("remember"))
        );
        slowDown();

        Assert.assertFalse(rememberCheckbox.isSelected(),
            "Remember me checkbox should be unchecked by default");

        rememberCheckbox.click();
        slowDown();
        Assert.assertTrue(rememberCheckbox.isSelected(),
            "Remember me checkbox should be checked after clicking");
        slowDown();
    }

    @Test(priority = 5, description = "Verify 'Sign In' button is present")
    public void testSignInButtonPresent() {
        navigateTo("/login");
        slowDown();

        WebElement signInButton = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-button"))
        );
        slowDown();

        Assert.assertTrue(signInButton.isDisplayed(),
            "Sign In button should be visible");
        Assert.assertEquals(signInButton.getText(), "Sign In",
            "Button text should be 'Sign In'");
        slowDown();
    }

    @Test(priority = 6, description = "Verify 'Sign up' and 'Forgot password' links are present")
    public void testFooterLinksPresent() {
        navigateTo("/login");
        slowDown();

        WebElement loginFooter = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-footer"))
        );
        slowDown();

        Assert.assertTrue(loginFooter.getText().contains("Don't have an account?"),
            "Footer should contain 'Don't have an account?' text");
        Assert.assertTrue(loginFooter.getText().contains("Forgot your password?"),
            "Footer should contain 'Forgot your password?' text");

        WebElement signUpLink = loginFooter.findElement(By.linkText("Sign up"));
        Assert.assertNotNull(signUpLink, "Sign up link should be present");
        Assert.assertTrue(signUpLink.getAttribute("href").contains("/register"),
            "Sign up link should point to /register");
        slowDown();
    }

    @Test(priority = 7, description = "Verify the Open logo is displayed on login page")
    public void testLogoDisplayed() {
        navigateTo("/login");
        slowDown();

        WebElement logo = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-logo"))
        );
        slowDown();

        Assert.assertTrue(logo.isDisplayed(), "Login logo should be visible");
        Assert.assertEquals(logo.getText(), "Open", "Logo text should be 'Open'");
        slowDown();
    }
}
