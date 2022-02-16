package stepDefinition;

import org.junit.runner.RunWith;

import cucumber.api.junit.Cucumber;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

@RunWith(Cucumber.class)
public class loginStepDefinition {
	@Given("^Open the application$")
    public void open_the_application() {
        System.out.println("Step 1 ");
    }

    @When("^User enter username$")
    public void user_enter_username() {
    	System.out.println("Step 2 ");
    }

    @Then("^page redirected to homepage$")
    public void page_redirected_to_homepage() {
    	System.out.println("Step 3 ");
    }

    @And("^User enter password$")
    public void user_enter_password() {
    	System.out.println("Step 4 ");
    }

    @And("^User click on login button$")
    public void user_click_on_login_button() {
    	System.out.println("Step 5 ");
    }

}
