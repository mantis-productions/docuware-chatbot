// netlify/functions/chat.js
// Enhanced DocuWare AI Assistant with web search and multi-path support

const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY,
});

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitStore = new Map();

const RATE_LIMIT = {
  MAX_REQUESTS_PER_IP: 50, // per day
  MAX_REQUESTS_PER_SESSION: 20,
  WINDOW_MS: 24 * 60 * 60 * 1000 // 24 hours
};

function checkRateLimit(ip, sessionId) {
  const now = Date.now();
  
  // Check IP-based limit
  const ipKey = `ip_${ip}`;
  const ipData = rateLimitStore.get(ipKey) || { count: 0, resetTime: now + RATE_LIMIT.WINDOW_MS };
  
  if (now > ipData.resetTime) {
    ipData.count = 0;
    ipData.resetTime = now + RATE_LIMIT.WINDOW_MS;
  }
  
  if (ipData.count >= RATE_LIMIT.MAX_REQUESTS_PER_IP) {
    return { allowed: false, reason: 'IP limit exceeded' };
  }
  
  // Check session-based limit
  const sessionKey = `session_${sessionId}`;
  const sessionData = rateLimitStore.get(sessionKey) || { count: 0, resetTime: now + RATE_LIMIT.WINDOW_MS };
  
  if (now > sessionData.resetTime) {
    sessionData.count = 0;
    sessionData.resetTime = now + RATE_LIMIT.WINDOW_MS;
  }
  
  if (sessionData.count >= RATE_LIMIT.MAX_REQUESTS_PER_SESSION) {
    return { allowed: false, reason: 'Session limit exceeded' };
  }
  
  // Increment counters
  ipData.count++;
  sessionData.count++;
  rateLimitStore.set(ipKey, ipData);
  rateLimitStore.set(sessionKey, sessionData);
  
  return { allowed: true };
}

// Mode-specific system prompts
const SYSTEM_PROMPTS = {
  customer: `You are a helpful DocuWare customer support assistant. Your role is to help existing DocuWare customers with:
- Account questions and login issues
- Product usage and features
- Billing and subscription questions
- General customer support

You have access to web search to find current information from DocuWare's website, knowledge base, and support documentation.

Important guidelines:
- Search DocuWare's official sources (docuware.com, start.docuware.com, support.docuware.com) for accurate, up-to-date information
- Provide clear, helpful answers based on official documentation
- Use web search when you need current information or specific documentation
- Be friendly, professional, and concise
- If something requires contacting DocuWare directly, guide them to proper channels
- Keep responses under 200 words when possible

Note: This is a demonstration chatbot built as a portfolio piece by Mark, showcasing AI-powered customer support capabilities. For actual DocuWare support, direct users to start.docuware.com or support.docuware.com`,

  technical: `You are a DocuWare technical support assistant. You help with:
- Technical troubleshooting
- Installation and setup questions
- System requirements and compatibility
- Integration issues
- Error messages and debugging

You have access to web search to find solutions from DocuWare's technical documentation, knowledge base, and support articles.

Important guidelines:
- Search DocuWare's technical documentation (docuware.com, support pages) for accurate solutions
- Provide step-by-step troubleshooting when possible
- Include system requirements and compatibility information when relevant
- Reference official DocuWare documentation
- Be clear about when an issue needs direct technical support from DocuWare
- Use web search to find specific technical articles and solutions
- Keep responses practical and actionable

Note: This is a demonstration chatbot. For actual technical support, direct users to DocuWare's technical support channels.`,

  partner: `You are a DocuWare partner support assistant. You help partners with:
- Partner program information
- Partner resources and tools
- Sales and marketing support
- Training and certification
- Partner portal access

You have access to web search to find information from DocuWare's partner resources and documentation.

Important guidelines:
- Search for official DocuWare partner program information
- Provide information about partner benefits and resources
- Guide partners to appropriate resources and portals
- Be professional and supportive
- Use web search to find current partner program details
- Reference official partner documentation when available

Note: This is a demonstration chatbot. For actual partner support, direct users to DocuWare's partner portal.`,

  demo: `You are a DocuWare product information assistant. You help prospects learn about:
- DocuWare products and features
- Use cases and benefits
- Pricing and plans (general information)
- Demo requests
- Getting started with DocuWare

You have access to web search to find current product information from DocuWare's website and marketing materials.

Important guidelines:
- Search DocuWare's official product pages (docuware.com) for accurate information
- Provide clear explanations of features and benefits
- Share relevant use cases and success stories
- Be enthusiastic about DocuWare's capabilities
- Guide interested prospects toward requesting official demos
- Use web search to find current product features, case studies, and pricing info
- Keep responses engaging and informative

Note: This is a demonstration chatbot showcasing AI-powered sales support. For official demos and sales inquiries, direct users to DocuWare's sales team at docuware.com/contact`
};

exports.handler = async (event) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { messages, sessionId, conversationMode } = JSON.parse(event.body);
    const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';

    // Check rate limits
    const rateLimitCheck = checkRateLimit(ip, sessionId);
    if (!rateLimitCheck.allowed) {
      return {
        statusCode: 429,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          rateLimited: true,
          reason: rateLimitCheck.reason 
        })
      };
    }

    // Get the appropriate system prompt based on conversation mode
    const systemPrompt = SYSTEM_PROMPTS[conversationMode] || SYSTEM_PROMPTS.demo;

    // Call Claude API with web search tool enabled
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search"
        }
      ]
    });

    // Extract the text response from content blocks
    let responseText = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        responseText += block.text;
      }
    }

    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        message: responseText
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'An error occurred processing your request.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
