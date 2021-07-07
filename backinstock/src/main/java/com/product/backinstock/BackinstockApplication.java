package com.product.backinstock;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import io.github.cdimascio.dotenv.Dotenv;
import java.util.Base64;

import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@RestController
public class BackinstockApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackinstockApplication.class, args);
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/product/{partNumber}/")
	public String SpringAPI(@RequestParam(value="view") String view, @PathVariable String partNumber)throws Exception{
		try{
			Dotenv dotenv = Dotenv.configure().load();
			String url = "http://desktop-aqbb5k6:9090/ws/rest/products/v2/Products/" + partNumber + "/?view=" + view;
			String authenticationString = String.format("%s:%s", dotenv.get("BOOMI_USERNAME"), dotenv.get("BOOMI_PASSWORD"));
			String encoded = Base64.getEncoder().encodeToString(authenticationString.getBytes());
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization", "Basic " + encoded);
			HttpEntity request = new HttpEntity(headers);
			ResponseEntity<String> response = new RestTemplate().exchange(url, HttpMethod.GET, request, String.class);
			String json = response.getBody();
			return json;
		}catch(Exception e){
			return e.toString();
		}
	}
}
