package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

/**
 * Test Flow 1: Home Page Navigation
 * Verifies the home page loads correctly with all expected elements.
 */
public class HomePageTest extends BaseTest {

    @Test(priority = 1, description = "Verify home page loads and displays the main heading")
    public void testHomePageLoads() {
        navigateTo("/");

        // Wait for the main heading to be visible
        WebElement heading = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("main-heading"))
        );

        Assert.assertTrue(heading.isDisplayed(), "Main heading should be displayed on the home page");
        Assert.assertEquals(heading.getText(), "Simplifying Business Banking",
            "Home page heading text should match");
    }

    @Test(priority = 2, description = "Verify the subheading text is present")
    public void testSubheadingPresent() {
        navigateTo("/");

        WebElement subheading = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("subheading"))
        );

        Assert.assertTrue(subheading.isDisplayed(), "Subheading should be visible");
        Assert.assertTrue(subheading.getText().contains("seamless banking"),
            "Subheading should contain 'seamless banking' text");
    }

    @Test(priority = 3, description = "Verify the CTA 'Get Started Now' button is present and links to register")
    public void testGetStartedButton() {
        navigateTo("/");

        WebElement ctaButton = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("cta-button"))
        );

        Assert.assertTrue(ctaButton.isDisplayed(), "CTA button should be visible");
        Assert.assertEquals(ctaButton.getText(), "Get Started Now",
            "CTA button text should be 'Get Started Now'");

        String href = ctaButton.getAttribute("href");
        Assert.assertTrue(href.contains("/register"),
            "CTA button should link to the registration page");
    }

    @Test(priority = 4, description = "Verify partner logos are displayed")
    public void testPartnerLogosDisplayed() {
        navigateTo("/");

        WebElement logoBar = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("logo-bar"))
        );
        Assert.assertTrue(logoBar.isDisplayed(), "Logo bar section should be visible");

        List<WebElement> logos = driver.findElements(By.className("partner-logo"));
        Assert.assertTrue(logos.size() > 0, "There should be at least one partner logo displayed");
    }

    @Test(priority = 5, description = "Verify navigation bar is present on home page")
    public void testNavigationBarPresent() {
        navigateTo("/");

        WebElement navbar = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("navbar"))
        );

        Assert.assertTrue(navbar.isDisplayed(), "Navigation bar should be visible");

        WebElement logo = driver.findElement(By.className("logo"));
        Assert.assertEquals(logo.getText(), "Open", "Logo text should be 'Open'");
    }

    @Test(priority = 6, description = "Verify clicking 'Get Started Now' navigates to register page")
    public void testGetStartedNavigation() {
        navigateTo("/");

        WebElement ctaButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.className("cta-button"))
        );
        ctaButton.click();

        wait.until(ExpectedConditions.urlContains("/register"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/register"),
            "Should navigate to the registration page after clicking 'Get Started Now'");
    }
}
