package com.apg.esbportal;
import javax.jms.BytesMessage;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import javax.jms.TextMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.jms.core.MessagePostProcessor;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
public class JMSMessageSender{
	@Autowired
	JmsMessagingTemplate messageTemplate;
	
	@Autowired
	JmsTemplate jmsTemplate;

	public JMSMessageSender() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String SendToQueue(String Destination,final String Request){
		String output="";
		try{
		jmsTemplate.setMessageConverter(new org.springframework.jms.support.converter.MappingJackson2MessageConverter());
		output=jmsTemplate.sendAndReceive(Destination,new MessageCreator() {
			
			@Override
			public Message createMessage(Session session) throws JMSException {
				TextMessage message = session.createTextMessage(Request);		        
				return message;
			}
		}).getBody(String.class);
		
	}catch(Exception exception)
	{
		exception.printStackTrace();
		
	}
		return output;	
	
	} 
}