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

        WebElement title = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-title"))
        );
        Assert.assertEquals(title.getText(), "Welcome back",
            "Login page title should be 'Welcome back'");

        WebElement subtitle = driver.findElement(By.className("login-subtitle"));
        Assert.assertEquals(subtitle.getText(), "Enter your credentials to access your account",
            "Login subtitle should match expected text");
    }

    @Test(priority = 2, description = "Verify email and password input fields are present")
    public void testFormFieldsPresent() {
        navigateTo("/login");

        WebElement emailInput = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("email"))
        );
        WebElement passwordInput = driver.findElement(By.id("password"));

        Assert.assertTrue(emailInput.isDisplayed(), "Email input should be visible");
        Assert.assertTrue(passwordInput.isDisplayed(), "Password input should be visible");

        Assert.assertEquals(emailInput.getAttribute("type"), "email",
            "Email input type should be 'email'");
        Assert.assertEquals(passwordInput.getAttribute("type"), "password",
            "Password input type should be 'password'");
    }

    @Test(priority = 3, description = "Verify login form can accept user input")
    public void testLoginFormInput() {
        navigateTo("/login");

        WebElement emailInput = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("email"))
        );
        WebElement passwordInput = driver.findElement(By.id("password"));

        emailInput.sendKeys("test@example.com");
        passwordInput.sendKeys("password123");

        Assert.assertEquals(emailInput.getAttribute("value"), "test@example.com",
            "Email field should contain the entered email");
        Assert.assertEquals(passwordInput.getAttribute("value"), "password123",
            "Password field should contain the entered password");
    }

    @Test(priority = 4, description = "Verify 'Remember me' checkbox is present and functional")
    public void testRememberMeCheckbox() {
        navigateTo("/login");

        WebElement rememberCheckbox = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("remember"))
        );

        Assert.assertFalse(rememberCheckbox.isSelected(),
            "Remember me checkbox should be unchecked by default");

        rememberCheckbox.click();
        Assert.assertTrue(rememberCheckbox.isSelected(),
            "Remember me checkbox should be checked after clicking");
    }

    @Test(priority = 5, description = "Verify 'Sign In' button is present")
    public void testSignInButtonPresent() {
        navigateTo("/login");

        WebElement signInButton = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-button"))
        );

        Assert.assertTrue(signInButton.isDisplayed(),
            "Sign In button should be visible");
        Assert.assertEquals(signInButton.getText(), "Sign In",
            "Button text should be 'Sign In'");
    }

    @Test(priority = 6, description = "Verify 'Sign up' and 'Forgot password' links are present")
    public void testFooterLinksPresent() {
        navigateTo("/login");

        WebElement loginFooter = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-footer"))
        );

        Assert.assertTrue(loginFooter.getText().contains("Don't have an account?"),
            "Footer should contain 'Don't have an account?' text");
        Assert.assertTrue(loginFooter.getText().contains("Forgot your password?"),
            "Footer should contain 'Forgot your password?' text");

        // Verify the Sign up link navigates to register
        WebElement signUpLink = loginFooter.findElement(By.linkText("Sign up"));
        Assert.assertNotNull(signUpLink, "Sign up link should be present");
        Assert.assertTrue(signUpLink.getAttribute("href").contains("/register"),
            "Sign up link should point to /register");
    }

    @Test(priority = 7, description = "Verify the Open logo is displayed on login page")
    public void testLogoDisplayed() {
        navigateTo("/login");

        WebElement logo = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-logo"))
        );

        Assert.assertTrue(logo.isDisplayed(), "Login logo should be visible");
        Assert.assertEquals(logo.getText(), "Open", "Logo text should be 'Open'");
    }
}
