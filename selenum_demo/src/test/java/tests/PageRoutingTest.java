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
        slowDown();

        wait.until(ExpectedConditions.urlContains("/products"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/products"),
            "URL should contain /products");
        slowDown();

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Products page should have content rendered");
        slowDown();
    }

    @Test(priority = 2, description = "Verify Solutions page loads with content")
    public void testSolutionsPageLoads() {
        navigateTo("/solutions");
        slowDown();

        wait.until(ExpectedConditions.urlContains("/solutions"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/solutions"),
            "URL should contain /solutions");
        slowDown();

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Solutions page should have content rendered");
        slowDown();
    }

    @Test(priority = 3, description = "Verify Partners page loads with content")
    public void testPartnersPageLoads() {
        navigateTo("/partners");
        slowDown();

        wait.until(ExpectedConditions.urlContains("/partners"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/partners"),
            "URL should contain /partners");
        slowDown();

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Partners page should have content rendered");
        slowDown();
    }

    @Test(priority = 4, description = "Verify Company page loads with content")
    public void testCompanyPageLoads() {
        navigateTo("/company");
        slowDown();

        wait.until(ExpectedConditions.urlContains("/company"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/company"),
            "URL should contain /company");
        slowDown();

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Company page should have content rendered");
        slowDown();
    }

    @Test(priority = 5, description = "Verify Resources page loads with content")
    public void testResourcesPageLoads() {
        navigateTo("/resources");
        slowDown();

        wait.until(ExpectedConditions.urlContains("/resources"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/resources"),
            "URL should contain /resources");
        slowDown();

        WebElement body = driver.findElement(By.tagName("body"));
        Assert.assertTrue(body.getText().length() > 0,
            "Resources page should have content rendered");
        slowDown();
    }

    @Test(priority = 6, description = "Verify Login page loads and is accessible via direct URL")
    public void testLoginPageDirectAccess() {
        navigateTo("/login");
        slowDown();

        WebElement loginTitle = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("login-title"))
        );
        slowDown();

        Assert.assertTrue(loginTitle.isDisplayed(),
            "Login page should load when accessed directly via URL");
        Assert.assertEquals(loginTitle.getText(), "Welcome back",
            "Login page title should be 'Welcome back'");
        slowDown();
    }

    @Test(priority = 7, description = "Verify Register page loads and is accessible via direct URL")
    public void testRegisterPageDirectAccess() {
        navigateTo("/register");
        slowDown();

        WebElement registerTitle = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("register-title"))
        );
        slowDown();

        Assert.assertTrue(registerTitle.isDisplayed(),
            "Register page should load when accessed directly via URL");
        Assert.assertEquals(registerTitle.getText(), "Create your account",
            "Register page title should be 'Create your account'");
        slowDown();
    }

    @Test(priority = 8, description = "Verify navigating to home from another page works")
    public void testNavigateBackToHome() {
        navigateTo("/login");
        slowDown();
        wait.until(ExpectedConditions.urlContains("/login"));

        navigateTo("/");
        slowDown();

        WebElement heading = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("main-heading"))
        );
        slowDown();
        Assert.assertEquals(heading.getText(), "Simplifying Business Banking",
            "Should be back on the home page with correct heading");
        slowDown();
    }
}
