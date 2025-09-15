const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST'
      }
    };
  }

  try {
    // Parse the request body
    const { message, history } = JSON.parse(event.body);
    
    // Get OpenAI API key from environment variables
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'OpenAI API key is not configured' }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }

    // Prepare the messages for OpenAI API
    const systemMessage = {
      role: "system",
      content: "You are AiBhai, an AI companion for holistic life development. You provide support across health, wellness, spirituality, productivity, relationships, finance, career, and learning. Be helpful, empathetic, and provide practical advice. Always respond in a conversational, friendly tone."
    };

    // Convert chat history to OpenAI format
    const openaiMessages = [systemMessage];
    
    if (history && history.length > 0) {
      history.forEach(msg => {
        openaiMessages.push({
          role: msg.role,
          content: msg.content
        });
      });
    }
    
    // Add the current user message
    openaiMessages.push({
      role: "user",
      content: message
    });

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: openaiMessages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to get response from AI service' }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Return the AI response
    return {
      statusCode: 200,
      body: JSON.stringify({ response: aiResponse }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error in chat-api function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};