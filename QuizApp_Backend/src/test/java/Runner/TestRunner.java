package Runner;

import org.junit.runner.RunWith;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(
	features= "features",
	glue= "stepDefinition",
	monochrome=true,
	plugin = { "pretty", "html:target/exe_reports/report.html"},
	publish = true
	)
public class TestRunner {

}
