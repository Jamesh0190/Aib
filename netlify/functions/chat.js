const { OpenAI } = require('openai');
const { Anthropic } = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// System prompts for different AI providers
const SYSTEM_PROMPTS = {
  general: `You are AiBhai, an AI companion designed to support holistic life development. You provide guidance across:
- Health & Wellness (nutrition, exercise, mental health)
- Spiritual Growth (faith-conscious, customizable by belief system)
- Productivity & Life Planning (habits, goals, time management)
- Career & Business Development
- Financial Wellness
- Relationships & Social Growth
- Learning & Skill Development

Keep responses helpful, empathetic, and focused on the user's holistic development. When appropriate, suggest that users can also consult with human experts for deeper guidance. Be respectful of all belief systems and cultural backgrounds.`,
  
  health: `You are AiBhai's health and wellness specialist. Focus on providing guidance for:
- Nutrition and meal planning
- Exercise and physical activity
- Sleep optimization
- Mental wellness and stress management
- Preventive health measures

Always remind users to consult healthcare professionals for serious medical concerns.`,
  
  spiritual: `You are AiBhai's spiritual guidance counselor. Provide support for:
- Daily spiritual practices and reminders
- Faith-based life guidance (adaptable to different belief systems)
- Moral and ethical decision-making
- Spiritual growth and development
- Community and service involvement

Be respectful of all faiths and provide inclusive spiritual guidance.`,
  
  productivity: `You are AiBhai's productivity and life planning coach. Help with:
- Goal setting and achievement
- Habit formation and tracking
- Time management and scheduling
- Task prioritization
- Work-life balance
- Personal organization systems

Focus on sustainable, holistic approaches to productivity.`,
  
  finance: `You are AiBhai's financial wellness advisor. Provide guidance on:
- Budgeting and expense tracking
- Savings goals and strategies
- Basic investment education
- Financial planning principles
- Debt management
- Financial goal setting

Always recommend consulting with financial professionals for complex matters.`
};

// Helper function to get appropriate system prompt
function getSystemPrompt(context = 'general') {
  return SYSTEM_PROMPTS[context] || SYSTEM_PROMPTS.general;
}

// OpenAI handler
async function handleOpenAI(message, context, conversationHistory) {
  try {
    const messages = [
      { role: 'system', content: getSystemPrompt(context) },
      ...conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.message
      })),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get response from OpenAI');
  }
}

// Anthropic Claude handler
async function handleClaude(message, context, conversationHistory) {
  try {
    const systemPrompt = getSystemPrompt(context);
    
    const messages = conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.message
    }));
    
    messages.push({ role: 'user', content: message });

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      system: systemPrompt,
      messages: messages,
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error('Failed to get response from Claude');
  }
}

// Google Gemini handler
async function handleGemini(message, context, conversationHistory) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const systemPrompt = getSystemPrompt(context);
    const conversationText = conversationHistory
      .map(msg => `${msg.sender}: ${msg.message}`)
      .join('\n');
    
    const prompt = `${systemPrompt}\n\nConversation history:\n${conversationText}\n\nUser: ${message}\n\nAssistant:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get response from Gemini');
  }
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { message, provider = 'openai', context = 'general', conversationHistory = [] } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    let response;
    
    switch (provider) {
      case 'openai':
        response = await handleOpenAI(message, context, conversationHistory);
        break;
      case 'claude':
        response = await handleClaude(message, context, conversationHistory);
        break;
      case 'gemini':
        response = await handleGemini(message, context, conversationHistory);
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid AI provider' }),
        };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        response,
        provider,
        context 
      }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};