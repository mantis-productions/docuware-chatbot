# DocuWare AI Chatbot

A production-ready AI chatbot powered by Claude (Anthropic) that answers questions about DocuWare document management software.

## 🌟 Features

- **Real-time AI responses** using Claude Sonnet 4
- **Serverless architecture** - no servers to manage
- **Free to host** on Netlify (free forever tier)
- **Beautiful UI** - modern, responsive chat interface
- **Portfolio-ready** - professional deployment
- **Easy to customize** for different industries/clients

## 🚀 Quick Start

### Option 1: Deploy to Netlify (Recommended)
**Best for:** Portfolio pieces, client demos, production use

1. Follow the [Netlify Deployment Guide](NETLIFY-DEPLOYMENT-GUIDE.md)
2. Get it live in 15 minutes
3. Free forever

### Option 2: Deploy to Railway
**Best for:** More control, custom backends

1. Follow the [Railway Deployment Guide](RAILWAY-DEPLOYMENT-GUIDE.md)
2. Run a full Node.js server
3. $5/month free credit

## 📁 Project Structure

```
docuware-chatbot/
├── netlify/
│   └── functions/
│       └── chat.js          # Serverless function (handles chat)
├── public/
│   └── index.html           # Chat interface
├── netlify.toml             # Netlify configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 💰 Costs

**Netlify Hosting:** Free forever
- 100GB bandwidth/month
- 125k serverless function calls/month
- More than enough for demos

**Claude API:** Pay-as-you-go
- $5 free credit to start
- ~$0.01 per conversation
- Portfolio usage: ~$2-5/month

**Total: $2-5/month for unlimited demos**

## 🎨 Customization

### Change the Knowledge Base

Edit the `system` prompt in `netlify/functions/chat.js`:

```javascript
system: `You are a helpful [YOUR INDUSTRY] expert assistant...`
```

### Change the Design

Edit `public/index.html` - customize:
- Colors (search for `#667eea` and `#764ba2`)
- Header text
- Welcome message

### Add Your Branding

- Replace "DocuWare" with your client's name
- Update colors to match brand
- Add logo image

## 📈 Use Cases

**For Your Portfolio:**
- Showcase AI development skills
- Demonstrate serverless architecture
- Show production deployment experience

**For Clients:**
- Knowledge base chatbots
- Customer support automation
- Lead capture and qualification
- FAQ automation

**Pricing for Clients:**
- Setup: $1,500 - $3,000
- Monthly maintenance: $300 - $500
- Your cost: ~$5-10/month
- Profit: $2,000+ per client/year

## 🔧 Development

### Local Testing

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run locally
netlify dev

# Visit http://localhost:8888
```

### Deploy Updates

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# Netlify auto-deploys!
```

## 🆘 Support

**Common Issues:**

1. **Chatbot not responding**
   - Check `CLAUDE_API_KEY` environment variable
   - Verify API key at console.anthropic.com

2. **API errors**
   - Check Claude API credits
   - Verify API key is active

3. **Deployment fails**
   - Check build logs in Netlify
   - Verify `netlify.toml` is correct

## 📚 Documentation

- [Netlify Deployment Guide](NETLIFY-DEPLOYMENT-GUIDE.md)
- [Claude API Docs](https://docs.anthropic.com)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)

## 🏆 Built With

- [Claude AI](https://anthropic.com) - AI engine
- [Netlify](https://netlify.com) - Hosting platform
- Vanilla JavaScript - No frameworks needed!

## 📄 License

This is a template for building client chatbots. Customize it for your needs!

---

**Ready to build?** Start with the [Netlify Deployment Guide](NETLIFY-DEPLOYMENT-GUIDE.md)!

**Questions?** Open an issue or reach out.

**Want to contribute?** PRs welcome!
