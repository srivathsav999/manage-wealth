package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Test Flow 6: Page Routing
 * Verifies that all major pages in the application load correctly
 * with expected content when navigated to directly.
 */
public class PageRoutingTest extends BaseTest {

    @Test(priority = 1, description = "Verify Products page loads with content")
    public void testProductsPageLoads() {
        navigateTo("/products");

        wait.until(ExpectedConditions.urlContains("/products"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/products"),
            "URL should contain /products");

        // Verify page has rendered content (not blank)
        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Products page should have content rendered");
    }

    @Test(priority = 2, description = "Verify Solutions page loads with content")
    public void testSolutionsPageLoads() {
        navigateTo("/solutions");

        wait.until(ExpectedConditions.urlContains("/solutions"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/solutions"),
            "URL should contain /solutions");

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Solutions page should have content rendered");
    }

    @Test(priority = 3, description = "Verify Partners page loads with content")
    public void testPartnersPageLoads() {
        navigateTo("/partners");

        wait.until(ExpectedConditions.urlContains("/partners"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/partners"),
            "URL should contain /partners");

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Partners page should have content rendered");
    }

    @Test(priority = 4, description = "Verify Company page loads with content")
    public void testCompanyPageLoads() {
        navigateTo("/company");

        wait.until(ExpectedConditions.urlContains("/company"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/company"),
            "URL should contain /company");

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Company page should have content rendered");
    }

    @Test(priority = 5, description = "Verify Resources page loads with content")
    public void testResourcesPageLoads() {
        navigateTo("/resources");

        wait.until(ExpectedConditions.urlContains("/resources"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/resources"),
            "URL should contain /resources");

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Resources page should have content rendered");
    }

    @Test(priority = 6, description = "Verify Login page loads and is accessible via direct URL")
    public void testLoginPageDirectAccess() {
        navigateTo("/login");

        WebElement loginTitle = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-title"))
        );

        Assert.assertTrue(loginTitle.isDisplayed(),
            "Login page should load when accessed directly via URL");
        Assert.assertEquals(loginTitle.getText(), "Welcome back",
            "Login page title should be 'Welcome back'");
    }

    @Test(priority = 7, description = "Verify Register page loads and is accessible via direct URL")
    public void testRegisterPageDirectAccess() {
        navigateTo("/register");

        WebElement registerTitle = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("register-title"))
        );

        Assert.assertTrue(registerTitle.isDisplayed(),
            "Register page should load when accessed directly via URL");
        Assert.assertEquals(registerTitle.getText(), "Create your account",
            "Register page title should be 'Create your account'");
    }

    @Test(priority = 8, description = "Verify navigating to home from another page works")
    public void testNavigateBackToHome() {
        // Start at login page
        navigateTo("/login");
        wait.until(ExpectedConditions.urlContains("/login"));

        // Navigate to home
        navigateTo("/");

        WebElement heading = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("main-heading"))
        );
        Assert.assertEquals(heading.getText(), "Simplifying Business Banking",
            "Should be back on the home page with correct heading");
    }
}
