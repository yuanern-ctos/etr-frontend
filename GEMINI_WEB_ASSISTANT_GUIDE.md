# Gemini Web Assistant - Comprehensive Guide

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Commands Reference](#commands-reference)
8. [Examples](#examples)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)
11. [Legal & Ethical Considerations](#legal--ethical-considerations)

---

## Overview

Gemini Web Assistant is an AI-powered web automation tool that uses Google's Gemini AI to intelligently interact with websites based on natural language instructions. It combines the power of Playwright for web automation with Gemini's language understanding capabilities.

### What Can It Do?

- Navigate websites automatically
- Fill out forms using your profile information
- Click buttons and interact with page elements
- Make intelligent decisions based on page content
- Understand natural language instructions
- Take screenshots for documentation
- Wait and scroll through pages

---

## Features

- **AI-Powered Decision Making**: Uses Google Gemini to understand context and make smart choices
- **Profile-Based Automation**: References your profile.txt for personalized information
- **Interactive Mode**: Give commands in real-time and see results
- **Natural Language Processing**: Type instructions in plain English
- **Respectful Automation**: Built-in delays to avoid overwhelming websites
- **Visual Feedback**: See what's happening with real-time status updates
- **Screenshot Capability**: Document your automation sessions

---

## Prerequisites

Before you begin, ensure you have the following:

1. **Python 3.8 or higher**
   - Check version: `python --version` or `python3 --version`
   - Download from: https://www.python.org/downloads/

2. **Google Gemini API Key**
   - You'll need a Google account
   - API key is free for limited usage

3. **Operating System**
   - Works on Windows, macOS, and Linux
   - Minimum 4GB RAM recommended
   - Internet connection required

---

## Installation

### Step 1: Clone or Download the Project

If you have this code, navigate to the directory:
```bash
cd /path/to/amplify-nextjs-starter-app
```

### Step 2: Create a Virtual Environment (Recommended)

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

You should see `(venv)` appear in your terminal prompt.

### Step 3: Install Python Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- `google-generativeai` - For Gemini AI integration
- `playwright` - For web automation
- `python-dotenv` - For environment variable management
- `requests` - For HTTP requests

### Step 4: Install Playwright Browsers

Playwright requires browser binaries to be installed:

```bash
playwright install chromium
```

This downloads the Chromium browser that Playwright will use.

**Note:** This may take a few minutes as it downloads ~100MB of browser files.

### Step 5: Verify Installation

Check that everything is installed correctly:

```bash
python gemini_web_assistant.py --help
```

You should see the help message with available options.

---

## Configuration

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

**Important:** Keep your API key secure and never share it publicly!

### Step 2: Create .env File

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` in a text editor:
   ```bash
   nano .env
   # or
   notepad .env  # On Windows
   ```

3. Replace the placeholder with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyD...your_actual_key_here...xyz
   ```

4. Save and close the file

### Step 3: Configure Your Profile

1. Open `profile.txt` in a text editor:
   ```bash
   nano profile.txt
   # or
   notepad profile.txt  # On Windows
   ```

2. Fill in your actual information:
   ```
   Name: Jane Smith
   Age: 28
   Location: Austin, TX, USA
   Occupation: Marketing Manager
   Interests: Digital Marketing, Travel, Photography
   # ... add more details as needed
   ```

3. Save the file

**Important Security Notes:**
- Do NOT include sensitive information like passwords, credit card numbers, or SSN
- Do NOT include information you wouldn't want to share with websites
- Keep this file private and don't commit it to public repositories

---

## Usage

### Basic Usage

#### Starting the Assistant

**Basic start (you'll navigate manually):**
```bash
python gemini_web_assistant.py
```

**Start with a specific URL:**
```bash
python gemini_web_assistant.py --url https://example.com
```

**Run in headless mode (no browser window):**
```bash
python gemini_web_assistant.py --headless
```

**Use a different profile file:**
```bash
python gemini_web_assistant.py --profile myprofile.txt
```

### Interactive Commands

Once the assistant is running, you can use these commands:

#### Navigation
```
>>> goto https://example.com
```
Navigate to any URL.

#### Information
```
>>> info
```
Show current page URL and title.

```
>>> screenshot
```
Take a screenshot (saved as `screenshot.png`).

```
>>> screenshot mypage.png
```
Take a screenshot with custom filename.

#### AI Assistance
```
>>> ask What is this page about?
```
Ask Gemini to analyze the current page.

```
>>> ask How do I fill out this form?
```
Get guidance on interacting with page elements.

#### Direct Actions
```
>>> click #submit-button
```
Click an element by CSS selector.

```
>>> fill #email-input user@example.com
```
Fill a text input field.

#### Natural Language Instructions

You can also type natural language instructions:
```
>>> I want to search for "web development" on this page
```

Gemini will analyze the page and suggest what to do. You'll be asked to confirm before executing.

#### Exit
```
>>> quit
```
or
```
>>> exit
```
Close the browser and exit the program.

---

## Commands Reference

### Command Syntax

| Command | Syntax | Description | Example |
|---------|--------|-------------|---------|
| `goto` | `goto <url>` | Navigate to URL | `goto https://google.com` |
| `ask` | `ask <question>` | Ask Gemini for help | `ask What should I click?` |
| `click` | `click <selector>` | Click element | `click button.submit` |
| `fill` | `fill <selector> <text>` | Fill input field | `fill #name John Doe` |
| `screenshot` | `screenshot [filename]` | Take screenshot | `screenshot page.png` |
| `info` | `info` | Show page info | `info` |
| `help` | `help` | Show help | `help` |
| `quit` | `quit` or `exit` | Exit program | `quit` |

### CSS Selectors Quick Reference

CSS selectors are used to identify elements on the page:

- **By ID**: `#element-id` (e.g., `#username`)
- **By Class**: `.class-name` (e.g., `.submit-button`)
- **By Tag**: `tagname` (e.g., `button`, `input`)
- **By Attribute**: `[attribute=value]` (e.g., `[type=submit]`)
- **Combination**: `tag.class#id` (e.g., `button.primary#submit`)

**Tip:** Use browser DevTools (F12) to inspect elements and find their selectors.

---

## Examples

### Example 1: Simple Web Navigation

```bash
# Start the assistant
python gemini_web_assistant.py

# Navigate to a website
>>> goto https://example.com

# Take a screenshot
>>> screenshot example-homepage.png

# Ask Gemini about the page
>>> ask What is the main purpose of this website?

# Exit
>>> quit
```

### Example 2: Form Interaction

```bash
# Start with a URL
python gemini_web_assistant.py --url https://example.com/contact

# Ask Gemini to analyze the form
>>> ask What fields are in this contact form?

# Fill out fields based on Gemini's response
>>> fill #name John Doe
>>> fill #email john@example.com
>>> fill #message Hello, this is a test message

# Take a screenshot before submitting
>>> screenshot before-submit.png

# Click submit (only if appropriate!)
>>> click button[type=submit]
```

### Example 3: Research and Data Gathering

```bash
# Start the assistant
python gemini_web_assistant.py

# Navigate to a news site
>>> goto https://news.ycombinator.com

# Ask Gemini to summarize
>>> ask What are the top 3 stories on this page?

# Scroll down
>>> scroll down

# Take screenshot
>>> screenshot hn-stories.png
```

### Example 4: Using Natural Language

```bash
# Start at a search engine
python gemini_web_assistant.py --url https://google.com

# Use natural language
>>> I want to search for "python web scraping tutorial"

# Gemini will suggest actions
# Follow the suggestions or give more instructions

>>> click on the first result

>>> ask summarize this article for me
```

---

## Best Practices

### 1. Respect Website Terms of Service

- **Always check** if automation is allowed
- **Read** the website's Terms of Service and robots.txt
- **Don't use** this tool on sites that prohibit automation
- **Be respectful** of website resources

### 2. Use Appropriate Delays

The tool has a built-in 2-second delay between actions. This:
- Prevents overwhelming servers
- Appears more human-like
- Reduces chance of being blocked
- Allows pages to load properly

**Don't** modify the delay to be too fast unless you own the website.

### 3. Handle Personal Information Carefully

- **Don't store** passwords or sensitive data in `profile.txt`
- **Use test data** when possible
- **Be aware** of what information you're sharing
- **Review** forms before submitting

### 4. Test on Safe Websites First

Before using on important sites:
- Test on your own websites
- Use test/demo sites
- Practice with public examples
- Verify your commands work as expected

### 5. Monitor Your Actions

- **Watch** what the browser is doing
- **Use non-headless mode** when learning
- **Take screenshots** to document actions
- **Review** before submitting forms

### 6. API Usage Limits

Google Gemini has usage limits:
- Free tier: Limited requests per minute
- Monitor your usage in Google AI Studio
- Avoid making too many rapid requests
- Consider upgrading if you need more

### 7. Keep Software Updated

```bash
# Update dependencies periodically
pip install --upgrade -r requirements.txt

# Update Playwright browsers
playwright install --force
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. "GEMINI_API_KEY not found"

**Problem:** The .env file is missing or not configured.

**Solution:**
```bash
# Create .env file
cp .env.example .env

# Edit .env and add your API key
nano .env
```

#### 2. "ModuleNotFoundError: No module named 'playwright'"

**Problem:** Dependencies not installed.

**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

#### 3. "Playwright browser not found"

**Problem:** Browser binaries not installed.

**Solution:**
```bash
playwright install chromium
```

#### 4. "Timeout waiting for selector"

**Problem:** Element not found on page or page loaded slowly.

**Solution:**
- Verify the CSS selector is correct
- Wait for page to fully load before clicking
- Use `>>> ask help me find the submit button` to get AI assistance
- Check if element is in an iframe or shadow DOM

#### 5. "Rate limit exceeded" from Gemini API

**Problem:** Too many API requests.

**Solution:**
- Wait a few minutes before trying again
- Reduce frequency of `ask` commands
- Check your API quota in Google AI Studio
- Consider upgrading to paid tier if needed

#### 6. Browser crashes or freezes

**Problem:** System resources or compatibility issue.

**Solution:**
```bash
# Try headless mode (uses less memory)
python gemini_web_assistant.py --headless

# Close other applications to free up RAM
# Update Playwright
pip install --upgrade playwright
playwright install --force
```

#### 7. "Permission denied" errors on Linux/macOS

**Problem:** File permissions issue.

**Solution:**
```bash
# Make script executable
chmod +x gemini_web_assistant.py

# Check file ownership
ls -la gemini_web_assistant.py
```

### Getting More Help

If you encounter issues:

1. **Check the error message** carefully
2. **Search online** for the specific error
3. **Review Playwright docs**: https://playwright.dev/python/
4. **Review Gemini docs**: https://ai.google.dev/docs
5. **Check GitHub issues** for similar problems

---

## Legal & Ethical Considerations

### Important Warnings

This tool is provided for **legitimate automation purposes only**. You are responsible for how you use it.

### Acceptable Uses

- Automating your own websites
- Testing web applications you own/manage
- Educational purposes and learning
- Research with proper authorization
- Accessibility automation
- Personal productivity tasks

### Prohibited Uses

- Violating website Terms of Service
- Automated survey fraud or deception
- Scraping without permission
- Creating fake accounts
- Spamming or abusive behavior
- Circumventing security measures
- Any illegal activities

### General Guidelines

1. **Obtain Permission**: If you're automating someone else's website, get explicit permission
2. **Check robots.txt**: Respect the robots.txt file and crawl directives
3. **Identify Your Bot**: Consider adding a user agent identifier
4. **Rate Limiting**: Don't overwhelm servers with requests
5. **Personal Responsibility**: You are liable for how you use this tool
6. **Data Privacy**: Respect user privacy and data protection laws (GDPR, CCPA, etc.)
7. **Terms of Service**: Always read and comply with website ToS

### Disclaimer

The creators of this tool are not responsible for misuse. By using this software, you agree to use it ethically, legally, and in compliance with all applicable laws and website terms of service.

---

## Advanced Topics

### Custom Profile Files

You can create different profile files for different purposes:

```bash
# Create multiple profiles
cp profile.txt profile-personal.txt
cp profile.txt profile-business.txt

# Edit each with different information
nano profile-personal.txt
nano profile-business.txt

# Use specific profile
python gemini_web_assistant.py --profile profile-business.txt
```

### Scripting Automation Sequences

While the current version is interactive, you can create bash scripts to automate common workflows:

```bash
#!/bin/bash
# automation-workflow.sh

# Start assistant and pipe commands
python gemini_web_assistant.py << EOF
goto https://example.com
screenshot start.png
ask analyze this page
quit
EOF
```

### Integrating with Other Tools

The assistant can be extended:

- **Logging**: Add logging to track all actions
- **Reporting**: Generate reports from screenshots
- **Scheduling**: Use cron/Task Scheduler for periodic runs
- **APIs**: Combine with other APIs for data processing

---

## FAQ

**Q: Is this free to use?**
A: The software is free, but you need a Google Gemini API key. Gemini has a free tier with limits.

**Q: Can I use this for commercial purposes?**
A: Check the Google Gemini API terms and ensure you have permission from websites you automate.

**Q: Will this work on any website?**
A: It works on most websites, but some have anti-bot measures. Always check if automation is allowed.

**Q: Can I run multiple instances?**
A: Yes, but be mindful of API rate limits and system resources.

**Q: How do I stop it if something goes wrong?**
A: Press Ctrl+C in the terminal, or type `quit` in the interactive prompt.

**Q: Can I modify the code?**
A: Yes! The code is provided as-is and can be customized for your needs.

**Q: Does this work on mobile sites?**
A: Yes, though the browser viewport is set to desktop size by default. You can modify the code to emulate mobile devices.

---

## Version History

- **v1.0.0** - Initial release
  - Google Gemini AI integration
  - Playwright web automation
  - Interactive command mode
  - Profile-based context
  - Screenshot capability

---

## Support & Contributing

### Reporting Issues

If you find bugs or have suggestions:
1. Document the issue with screenshots
2. Include error messages
3. Note your OS and Python version
4. Describe steps to reproduce

### Feature Requests

Ideas for future versions:
- Automated action execution from AI suggestions
- Recording and playback of automation sequences
- Multi-page workflows
- Data extraction and export
- Integration with more AI models

---

## Conclusion

You now have a powerful AI-assisted web automation tool at your disposal. Remember to:

- Use it responsibly and ethically
- Respect website terms of service
- Start with simple tasks and build up
- Monitor your automations
- Keep your API keys secure

Happy automating!

---

**Last Updated:** January 2026
**Version:** 1.0.0
