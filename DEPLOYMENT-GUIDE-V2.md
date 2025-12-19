# 🚀 Quick Deployment Guide - Version 2.0

## What's Changed?

Your chatbot now has:
✅ Multi-path conversation interface (like DocuWare's site)
✅ Real-time web search capabilities
✅ Rate limiting (20 messages/session)
✅ Conversation history
✅ Better UI/UX

## 🎯 Deploy in 5 Minutes

### Step 1: Update Your API Key Name

Your environment variable needs to be named `CLAUDE_API_KEY` (not `ANTHROPIC_API_KEY`).

**In Netlify Dashboard:**
1. Go to Site settings → Environment variables
2. Check if you have `ANTHROPIC_API_KEY`
3. If yes, either:
   - Rename it to `CLAUDE_API_KEY`, OR
   - Add a new one called `CLAUDE_API_KEY` with the same value

### Step 2: Install New Dependencies

```bash
cd docuware-chatbot
npm install
```

This installs the Anthropic SDK (replacing node-fetch).

### Step 3: Test Locally (Optional)

```bash
netlify dev
```

Visit `http://localhost:8888` and try:
1. Click a conversation path
2. Ask a question
3. See if web search works: "What are DocuWare's latest features?"

### Step 4: Deploy to Netlify

**Option A: Automatic (via Git)**
```bash
git add .
git commit -m "Update to v2.0 with multi-path and web search"
git push
```

Netlify will automatically rebuild and deploy.

**Option B: Manual (via CLI)**
```bash
netlify deploy --prod
```

### Step 5: Test Your Live Site

1. Visit your Netlify URL
2. You should see the new path selection screen
3. Choose a path and test the chatbot
4. Try asking about current DocuWare features (it will search the web!)

## 🎨 Key Improvements

### 1. Multi-Path Interface
Users now see 4 options:
- I am a customer
- I need technical support  
- I am a partner
- I want info/product demo

### 2. Web Search Integration
Claude can now search:
- docuware.com (product pages)
- support.docuware.com (support docs)
- start.docuware.com (knowledge base)

This means it gives CURRENT information, not just what it was trained on.

### 3. Rate Limiting
Prevents abuse and controls costs:
- 20 messages per conversation session
- 50 total requests per IP per day
- Shows message counter in header

### 4. Conversation Memory
- Maintains full conversation context
- Each mode has specialized behavior
- Users can reset and start over

## 🧪 Test These Scenarios

**Test 1: Basic Flow**
1. Choose "I want info/product demo"
2. Ask: "What is DocuWare?"
3. Should get a comprehensive answer

**Test 2: Web Search**
1. Choose any path
2. Ask: "What are DocuWare's newest features?"
3. Claude should search the web and give current info

**Test 3: Rate Limiting**
1. Send 20 messages in one session
2. Should see rate limit message
3. Click "Start Over" to reset

**Test 4: Different Modes**
1. Try each conversation path
2. Notice how Claude's tone/focus changes
3. Customer mode = account help
4. Technical mode = troubleshooting
5. Demo mode = sales-focused

## 🔍 Troubleshooting

### "CLAUDE_API_KEY is not defined"
→ Set the environment variable in Netlify (see Step 1)

### Web search not working
→ Check that your Claude API key is valid and has access to tools

### Old version still showing
→ Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
→ Or clear browser cache

### Function errors
→ Check Netlify function logs:
   1. Go to Netlify dashboard
   2. Navigate to Functions tab
   3. Click on "chat" function
   4. View logs

## 💰 Cost Estimate

With rate limiting (20 messages/session):
- ~$0.10 per user session
- ~$10-20 per month for 100-200 visitors
- Much cheaper than running a dedicated server!

## 📝 Customization Tips

### Change Rate Limits
Edit `netlify/functions/chat.js`:
```javascript
const RATE_LIMIT = {
  MAX_REQUESTS_PER_SESSION: 20,  // ← Change this
  ...
};
```

### Modify Conversation Paths
Edit `public/index.html` to change:
- Path titles
- Icons
- Descriptions
- Initial greetings

### Adjust System Prompts
Edit `netlify/functions/chat.js` → `SYSTEM_PROMPTS` object

### Change Branding
In `public/index.html`:
- Update colors (search for #4F46E5 and #7C3AED)
- Change "DocuWare" to your company name
- Update the demo badge text

## 🎉 What This Shows Potential Clients

This portfolio piece demonstrates:
1. **AI Integration**: Claude API with web search
2. **Modern UX**: Multi-path conversation design
3. **Production Ready**: Rate limiting, error handling
4. **Cost Conscious**: Efficient, scalable architecture
5. **Real-time Data**: Live web search integration
6. **Professional Code**: Clean, documented, maintainable

## 📞 Support

If you have issues:
1. Check Netlify function logs
2. Verify environment variables
3. Test locally with `netlify dev`
4. Check Claude API status at status.anthropic.com

---

**Ready to show this off? Test it thoroughly, then add it to your portfolio!**
