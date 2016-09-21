package com.apg.esbportal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import javax.servlet.http.HttpServletResponse;
@RestController
@RequestMapping("/LogsExceptions")
@EnableWebMvc
public class LogsExceptionController{
	@Autowired
	JMSMessageSender sender;	
	@RequestMapping(value = "/{name}",method=RequestMethod.POST,produces="application/json")
	public @ResponseBody String getPerson(@RequestBody String request){		
		String s=sender.SendToQueue("LogsQueue",request);		
		return s;
	}
}