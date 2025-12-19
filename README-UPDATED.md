# DocuWare AI Assistant - Portfolio Demo

A sophisticated AI-powered chatbot demonstrating advanced customer support capabilities with multi-path conversation flows and real-time web search integration.

## 🎯 What's New in Version 2.0

This updated version includes:

1. **Multi-Path Interface** - Users can choose their conversation path:
   - Customer Support
   - Technical Support
   - Partner Resources
   - Product Demo/Information

2. **Web Search Integration** - Claude can search DocuWare's actual documentation in real-time
3. **Rate Limiting** - Prevents abuse with session and IP-based limits
4. **Conversation History** - Maintains context throughout the conversation
5. **Enhanced UI** - Modern, responsive design with better mobile support
6. **Mode-Specific Responses** - Tailored system prompts for each conversation path

## 🚀 Features

- **Live Documentation Access**: Searches DocuWare's real website and knowledge base
- **Smart Context Management**: Remembers the full conversation
- **Professional UI**: DocuWare-inspired design with smooth animations
- **Cost Protection**: Rate limiting (20 messages/session, 50/IP/day)
- **Responsive Design**: Works great on desktop and mobile
- **Session Reset**: Users can start over with a fresh conversation

## 📋 Prerequisites

- Node.js (v14 or higher)
- A Netlify account (free tier works fine)
- An Anthropic Claude API key

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd docuware-chatbot
npm install
```

### 2. Set Up Environment Variables

You need to set your Claude API key. You can do this in two ways:

**Option A: Local Development (using .env file)**

Create a `.env` file in the root directory:

```
CLAUDE_API_KEY=your_api_key_here
```

**Option B: Netlify Deployment**

Set the environment variable in Netlify:
1. Go to your site in Netlify dashboard
2. Navigate to Site settings → Environment variables
3. Add variable:
   - Key: `CLAUDE_API_KEY`
   - Value: Your actual API key

### 3. Test Locally

```bash
netlify dev
```

This will start a local development server at `http://localhost:8888`

### 4. Deploy to Netlify

**Option A: Via Netlify CLI**
```bash
netlify deploy --prod
```

**Option B: Via Git**
1. Push to GitHub
2. Connect repository in Netlify dashboard
3. Deploy automatically

## 📁 Project Structure

```
docuware-chatbot/
├── public/
│   └── index.html          # Frontend with multi-path interface
├── netlify/
│   └── functions/
│       └── chat.js         # Backend with web search & rate limiting
├── package.json            # Dependencies
├── netlify.toml            # Netlify configuration
└── README-UPDATED.md       # This file
```

## 🎨 Customization

### Adjusting Rate Limits

Edit `netlify/functions/chat.js`:

```javascript
const RATE_LIMIT = {
  MAX_REQUESTS_PER_IP: 50,      // Change this
  MAX_REQUESTS_PER_SESSION: 20,  // Change this
  WINDOW_MS: 24 * 60 * 60 * 1000 // Change this (currently 24 hours)
};
```

### Customizing Conversation Paths

In `public/index.html`, modify the `pathTitles` and `initialGreetings` objects.

In `netlify/functions/chat.js`, modify the `SYSTEM_PROMPTS` object to change how Claude responds in each mode.

### Changing the Branding

Replace "DocuWare" references and update the color scheme in `index.html`:

```css
background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
```

## 💡 How It Works

### Multi-Path Selection

1. User lands on path selection screen
2. Chooses their category (Customer, Technical, Partner, or Demo)
3. Gets a mode-specific greeting
4. Claude uses the appropriate system prompt for that mode

### Web Search Integration

When Claude needs current information:
1. It automatically calls the web search tool
2. Searches DocuWare's official sites
3. Synthesizes the information into a helpful response
4. Returns accurate, up-to-date information

### Rate Limiting

Two-tier protection:
- **Session limit**: 20 messages per conversation
- **IP limit**: 50 requests per IP per day

Uses in-memory storage (resets when function restarts).

## 📊 Cost Considerations

- Claude Sonnet 4: ~$3 per million input tokens, ~$15 per million output tokens
- With web search: Additional ~$0.01 per search query
- Average conversation (10 messages): ~$0.05-0.15
- 100 conversations/month: ~$5-15/month

Rate limiting helps control costs for portfolio demos.

## 🔒 Security Features

- Environment variables for API keys
- CORS enabled for security
- Rate limiting to prevent abuse
- Session-based tracking
- IP-based protection

## 🎯 Use Cases for Your Portfolio

This project demonstrates:
1. AI integration expertise
2. Modern web development
3. UX/UI design skills
4. API integration
5. Cost-aware development
6. Production-ready code

## 🐛 Troubleshooting

**"CLAUDE_API_KEY is not defined"**
- Make sure you've set the environment variable in Netlify
- For local testing, create a `.env` file

**Web search not working**
- Check Claude API key has web search enabled
- Verify the tool configuration in chat.js

**Rate limit errors immediately**
- Clear browser cache
- The in-memory store resets when Netlify function restarts
- You may have hit the session or IP limit

**"Failed to process message"**
- Check the Netlify function logs
- Verify API key is correct
- Check Claude API status

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `CLAUDE_API_KEY` | Yes | Your Anthropic Claude API key |

## 🚀 Next Steps

Potential enhancements you could add:
- [ ] Persistent storage (Redis/database) for rate limiting
- [ ] User authentication
- [ ] Chat history export
- [ ] Admin dashboard
- [ ] Analytics tracking
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Voice input/output

## 📧 Questions?

This is a portfolio demonstration project created by Mark to showcase AI chatbot development capabilities.

For actual DocuWare support, visit: https://start.docuware.com

---

**Built with:**
- Anthropic Claude API (Sonnet 4)
- Netlify Functions (serverless)
- Vanilla JavaScript
- Modern CSS3

**Version:** 2.0.0
**Last Updated:** December 2024
