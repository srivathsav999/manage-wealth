package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTestValid {

    public static void main(String[] args) throws InterruptedException {

        // Launch Chrome
        WebDriver driver = new ChromeDriver();

        // Open login page
        driver.get("http://localhost:5173/login");

        // Maximize window
        driver.manage().window().maximize();

        // Wait for page to load
        Thread.sleep(2000);

        // Find email field and enter email
        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("hello@hello.com");

        // Find password field and enter password
        WebElement password = driver.findElement(By.id("password"));
        password.sendKeys("hello@hello.com");

        // Click Sign In button
        WebElement loginButton = driver.findElement(By.className("login-button"));
        loginButton.click();

        // Wait to observe result
        Thread.sleep(3000);

        // Close browser
        driver.quit();
    }
}