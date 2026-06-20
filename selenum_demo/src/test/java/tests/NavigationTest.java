package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

/**
 * Test Flow 4: Navigation Menu
 * Verifies all navigation links are present, visible, and functional.
 */
public class NavigationTest extends BaseTest {

    @Test(priority = 1, description = "Verify navigation bar contains all expected links")
    public void testNavLinksPresent() {
        navigateTo("/");
        slowDown();

        WebElement navbarLinks = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("navbar-links"))
        );
        slowDown();

        List<WebElement> links = navbarLinks.findElements(By.tagName("a"));
        Assert.assertTrue(links.size() >= 6,
            "Navigation should have at least 6 links");
        slowDown();
    }

    @Test(priority = 2, description = "Verify 'Products' link navigates correctly")
    public void testProductsLink() {
        navigateTo("/");
        slowDown();

        WebElement productsLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Products"))
        );
        Assert.assertTrue(productsLink.isDisplayed(), "Products link should be visible");
        slowDown();

        productsLink.click();
        slowDown();
        wait.until(ExpectedConditions.urlContains("/products"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/products"),
            "Should navigate to Products page");
        slowDown();
    }

    @Test(priority = 3, description = "Verify 'Solutions' link navigates correctly")
    public void testSolutionsLink() {
        navigateTo("/");
        slowDown();

        WebElement solutionsLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Solutions"))
        );
        Assert.assertTrue(solutionsLink.isDisplayed(), "Solutions link should be visible");
        slowDown();

        solutionsLink.click();
        slowDown();
        wait.until(ExpectedConditions.urlContains("/solutions"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/solutions"),
            "Should navigate to Solutions page");
        slowDown();
    }

    @Test(priority = 4, description = "Verify 'Partners' link navigates correctly")
    public void testPartnersLink() {
        navigateTo("/");
        slowDown();

        WebElement partnersLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Partners"))
        );
        Assert.assertTrue(partnersLink.isDisplayed(), "Partners link should be visible");
        slowDown();

        partnersLink.click();
        slowDown();
        wait.until(ExpectedConditions.urlContains("/partners"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/partners"),
            "Should navigate to Partners page");
        slowDown();
    }

    @Test(priority = 5, description = "Verify 'Company' link navigates correctly")
    public void testCompanyLink() {
        navigateTo("/");
        slowDown();

        WebElement companyLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Company"))
        );
        Assert.assertTrue(companyLink.isDisplayed(), "Company link should be visible");
        slowDown();

        companyLink.click();
        slowDown();
        wait.until(ExpectedConditions.urlContains("/company"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/company"),
            "Should navigate to Company page");
        slowDown();
    }

    @Test(priority = 6, description = "Verify 'Login' button navigates to login page")
    public void testLoginButton() {
        navigateTo("/");
        slowDown();

        WebElement loginButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Login"))
        );
        Assert.assertTrue(loginButton.isDisplayed(), "Login button should be visible");
        slowDown();

        loginButton.click();
        slowDown();
        wait.until(ExpectedConditions.urlContains("/login"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/login"),
            "Should navigate to Login page");
        slowDown();
    }

    @Test(priority = 7, description = "Verify 'Get Started' button navigates to register page")
    public void testGetStartedButton() {
        navigateTo("/");
        slowDown();

        WebElement getStartedButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Get Started"))
        );
        Assert.assertTrue(getStartedButton.isDisplayed(), "Get Started button should be visible");
        slowDown();

        getStartedButton.click();
        slowDown();
        wait.until(ExpectedConditions.urlContains("/register"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/register"),
            "Should navigate to Register page");
        slowDown();
    }

    @Test(priority = 8, description = "Verify the app logo text is 'Open'")
    public void testAppLogo() {
        navigateTo("/");
        slowDown();

        WebElement logo = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("logo"))
        );
        slowDown();

        Assert.assertTrue(logo.isDisplayed(), "App logo should be visible");
        Assert.assertEquals(logo.getText(), "Open",
            "App logo text should be 'Open'");
        slowDown();
    }
}
