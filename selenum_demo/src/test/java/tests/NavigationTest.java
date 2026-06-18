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

        WebElement navbarLinks = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("navbar-links"))
        );

        List<WebElement> links = navbarLinks.findElements(By.tagName("a"));
        Assert.assertTrue(links.size() >= 6,
            "Navigation should have at least 6 links (Products, Solutions, Partners, Company, Resources, Pricing + Login/Get Started)");
    }

    @Test(priority = 2, description = "Verify 'Products' link navigates correctly")
    public void testProductsLink() {
        navigateTo("/");

        WebElement productsLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Products"))
        );
        Assert.assertTrue(productsLink.isDisplayed(), "Products link should be visible");

        productsLink.click();
        wait.until(ExpectedConditions.urlContains("/products"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/products"),
            "Should navigate to Products page");
    }

    @Test(priority = 3, description = "Verify 'Solutions' link navigates correctly")
    public void testSolutionsLink() {
        navigateTo("/");

        WebElement solutionsLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Solutions"))
        );
        Assert.assertTrue(solutionsLink.isDisplayed(), "Solutions link should be visible");

        solutionsLink.click();
        wait.until(ExpectedConditions.urlContains("/solutions"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/solutions"),
            "Should navigate to Solutions page");
    }

    @Test(priority = 4, description = "Verify 'Partners' link navigates correctly")
    public void testPartnersLink() {
        navigateTo("/");

        WebElement partnersLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Partners"))
        );
        Assert.assertTrue(partnersLink.isDisplayed(), "Partners link should be visible");

        partnersLink.click();
        wait.until(ExpectedConditions.urlContains("/partners"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/partners"),
            "Should navigate to Partners page");
    }

    @Test(priority = 5, description = "Verify 'Company' link navigates correctly")
    public void testCompanyLink() {
        navigateTo("/");

        WebElement companyLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Company"))
        );
        Assert.assertTrue(companyLink.isDisplayed(), "Company link should be visible");

        companyLink.click();
        wait.until(ExpectedConditions.urlContains("/company"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/company"),
            "Should navigate to Company page");
    }

    @Test(priority = 6, description = "Verify 'Login' button navigates to login page")
    public void testLoginButton() {
        navigateTo("/");

        WebElement loginButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Login"))
        );
        Assert.assertTrue(loginButton.isDisplayed(), "Login button should be visible");

        loginButton.click();
        wait.until(ExpectedConditions.urlContains("/login"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/login"),
            "Should navigate to Login page");
    }

    @Test(priority = 7, description = "Verify 'Get Started' button navigates to register page")
    public void testGetStartedButton() {
        navigateTo("/");

        WebElement getStartedButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.linkText("Get Started"))
        );
        Assert.assertTrue(getStartedButton.isDisplayed(), "Get Started button should be visible");

        getStartedButton.click();
        wait.until(ExpectedConditions.urlContains("/register"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/register"),
            "Should navigate to Register page");
    }

    @Test(priority = 8, description = "Verify the app logo text is 'Open'")
    public void testAppLogo() {
        navigateTo("/");

        WebElement logo = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("logo"))
        );

        Assert.assertTrue(logo.isDisplayed(), "App logo should be visible");
        Assert.assertEquals(logo.getText(), "Open",
            "App logo text should be 'Open'");
    }
}
