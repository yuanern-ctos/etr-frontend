#!/usr/bin/env python3
"""
Gemini Web Assistant - AI-Powered Web Automation Tool

This tool uses Google Gemini AI to intelligently interact with websites
based on your instructions. It can navigate pages, fill forms, click elements,
and make decisions using AI.

IMPORTANT: Use this tool responsibly and only on websites where automation
is permitted. Always respect website terms of service and robots.txt.
"""

import os
import sys
import time
import json
from pathlib import Path
from typing import Optional, Dict, Any

try:
    from playwright.sync_api import sync_playwright, Page, Browser, BrowserContext
    import google.generativeai as genai
    from dotenv import load_dotenv
except ImportError as e:
    print(f"Error: Missing required dependency - {e}")
    print("Please run: pip install -r requirements.txt")
    sys.exit(1)


class GeminiWebAssistant:
    """AI-powered web automation assistant using Google Gemini."""

    def __init__(self, profile_path: str = "profile.txt", headless: bool = False):
        """
        Initialize the Gemini Web Assistant.

        Args:
            profile_path: Path to the profile text file
            headless: Whether to run browser in headless mode
        """
        load_dotenv()

        self.profile_path = profile_path
        self.headless = headless
        self.profile_data = self._load_profile()
        self.action_delay = 2  # Delay between actions in seconds

        # Initialize Gemini
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError(
                "GEMINI_API_KEY not found in environment variables. "
                "Please create a .env file with your API key."
            )

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash-exp')

        # Playwright objects (initialized later)
        self.playwright = None
        self.browser: Optional[Browser] = None
        self.context: Optional[BrowserContext] = None
        self.page: Optional[Page] = None

        print("✓ Gemini Web Assistant initialized")
        print(f"✓ Profile loaded from: {profile_path}")

    def _load_profile(self) -> str:
        """Load user profile from text file."""
        try:
            with open(self.profile_path, 'r', encoding='utf-8') as f:
                profile = f.read().strip()
            if not profile:
                print(f"Warning: Profile file '{self.profile_path}' is empty")
                return ""
            return profile
        except FileNotFoundError:
            print(f"Warning: Profile file '{self.profile_path}' not found")
            print("Creating a template profile.txt file...")
            self._create_template_profile()
            return ""

    def _create_template_profile(self):
        """Create a template profile file."""
        template = """# User Profile Information
# This file contains information about you that the AI will use to interact with websites.
# Fill in the relevant details below.

Name: Your Name
Age: 25
Location: City, Country
Occupation: Your Job Title
Interests: Technology, Reading, Travel
Education: Your Education Level

# Additional Information:
# Add any other relevant information that might be useful for web interactions
"""
        with open(self.profile_path, 'w', encoding='utf-8') as f:
            f.write(template)
        print(f"✓ Created template profile at: {self.profile_path}")
        print("Please edit this file with your information before continuing.")

    def start_browser(self):
        """Start the Playwright browser."""
        print("\nStarting browser...")
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=self.headless)
        self.context = self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        self.page = self.context.new_page()
        print("✓ Browser started")

    def close_browser(self):
        """Close the browser and cleanup."""
        if self.page:
            self.page.close()
        if self.context:
            self.context.close()
        if self.browser:
            self.browser.close()
        if self.playwright:
            self.playwright.stop()
        print("✓ Browser closed")

    def navigate_to(self, url: str):
        """Navigate to a URL."""
        print(f"\nNavigating to: {url}")
        self.page.goto(url, wait_until='networkidle', timeout=60000)
        time.sleep(self.action_delay)
        print("✓ Page loaded")

    def get_page_info(self) -> Dict[str, Any]:
        """Get current page information for AI context."""
        return {
            'url': self.page.url,
            'title': self.page.title(),
            'html_snippet': self.page.content()[:5000]  # First 5000 chars
        }

    def take_screenshot(self, filename: str = "screenshot.png"):
        """Take a screenshot of the current page."""
        self.page.screenshot(path=filename, full_page=True)
        print(f"✓ Screenshot saved: {filename}")
        return filename

    def ask_gemini(self, instruction: str, include_page_context: bool = True) -> str:
        """
        Ask Gemini AI for guidance on how to proceed.

        Args:
            instruction: User instruction or question
            include_page_context: Whether to include current page information

        Returns:
            AI response as string
        """
        print("\n🤖 Consulting Gemini AI...")

        context_parts = [
            "You are a web automation assistant helping a user interact with websites.",
            f"\nUser Profile:\n{self.profile_data}",
            f"\nUser Instruction: {instruction}"
        ]

        if include_page_context and self.page:
            page_info = self.get_page_info()
            context_parts.append(f"\nCurrent Page URL: {page_info['url']}")
            context_parts.append(f"Page Title: {page_info['title']}")
            context_parts.append(f"\nPage HTML (snippet):\n{page_info['html_snippet']}")

        context_parts.append(
            "\nProvide clear, specific instructions on what actions to take. "
            "If you need more information, ask questions."
        )

        prompt = "\n".join(context_parts)

        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error communicating with Gemini: {str(e)}"

    def execute_action(self, action_type: str, **kwargs):
        """
        Execute a web automation action.

        Supported actions:
        - click: Click an element (selector required)
        - fill: Fill a text input (selector and text required)
        - select: Select from dropdown (selector and value required)
        - wait: Wait for element (selector required)
        - scroll: Scroll the page (direction: 'down' or 'up')
        """
        print(f"\n⚙️  Executing action: {action_type}")

        try:
            if action_type == "click":
                selector = kwargs.get('selector')
                self.page.click(selector, timeout=10000)
                print(f"✓ Clicked: {selector}")

            elif action_type == "fill":
                selector = kwargs.get('selector')
                text = kwargs.get('text', '')
                self.page.fill(selector, text, timeout=10000)
                print(f"✓ Filled: {selector} with '{text}'")

            elif action_type == "select":
                selector = kwargs.get('selector')
                value = kwargs.get('value')
                self.page.select_option(selector, value, timeout=10000)
                print(f"✓ Selected: {value} in {selector}")

            elif action_type == "wait":
                selector = kwargs.get('selector')
                self.page.wait_for_selector(selector, timeout=10000)
                print(f"✓ Waited for: {selector}")

            elif action_type == "scroll":
                direction = kwargs.get('direction', 'down')
                pixels = kwargs.get('pixels', 500)
                if direction == 'down':
                    self.page.evaluate(f"window.scrollBy(0, {pixels})")
                else:
                    self.page.evaluate(f"window.scrollBy(0, -{pixels})")
                print(f"✓ Scrolled {direction}")

            elif action_type == "press":
                key = kwargs.get('key')
                self.page.keyboard.press(key)
                print(f"✓ Pressed key: {key}")

            else:
                print(f"⚠️  Unknown action type: {action_type}")
                return False

            time.sleep(self.action_delay)
            return True

        except Exception as e:
            print(f"❌ Action failed: {str(e)}")
            return False

    def interactive_mode(self):
        """Run in interactive mode where user gives instructions."""
        print("\n" + "="*70)
        print("GEMINI WEB ASSISTANT - Interactive Mode")
        print("="*70)
        print("\nCommands:")
        print("  goto <url>          - Navigate to a URL")
        print("  ask <question>      - Ask Gemini for guidance")
        print("  click <selector>    - Click an element")
        print("  fill <selector> <text> - Fill a text input")
        print("  screenshot [name]   - Take a screenshot")
        print("  info                - Show current page info")
        print("  help                - Show this help message")
        print("  quit                - Exit the assistant")
        print("\nYou can also type natural language instructions, and Gemini will help!")
        print("="*70)

        while True:
            try:
                user_input = input("\n>>> ").strip()

                if not user_input:
                    continue

                # Parse commands
                parts = user_input.split(maxsplit=1)
                command = parts[0].lower()
                args = parts[1] if len(parts) > 1 else ""

                if command == "quit" or command == "exit":
                    print("\nExiting...")
                    break

                elif command == "goto":
                    if args:
                        self.navigate_to(args)
                    else:
                        print("Usage: goto <url>")

                elif command == "ask":
                    if args:
                        response = self.ask_gemini(args)
                        print(f"\n🤖 Gemini: {response}")
                    else:
                        print("Usage: ask <question>")

                elif command == "click":
                    if args:
                        self.execute_action("click", selector=args)
                    else:
                        print("Usage: click <selector>")

                elif command == "fill":
                    fill_parts = args.split(maxsplit=1)
                    if len(fill_parts) == 2:
                        self.execute_action("fill", selector=fill_parts[0], text=fill_parts[1])
                    else:
                        print("Usage: fill <selector> <text>")

                elif command == "screenshot":
                    filename = args if args else "screenshot.png"
                    self.take_screenshot(filename)

                elif command == "info":
                    info = self.get_page_info()
                    print(f"\nURL: {info['url']}")
                    print(f"Title: {info['title']}")

                elif command == "help":
                    print("\nSee commands list above, or type natural language instructions!")

                else:
                    # Treat as natural language instruction
                    print("\n💭 Processing your instruction with Gemini...")
                    response = self.ask_gemini(user_input)
                    print(f"\n🤖 Gemini suggests:\n{response}")

                    confirm = input("\nExecute this suggestion? (y/n): ").strip().lower()
                    if confirm == 'y':
                        print("Note: You'll need to execute the suggested actions manually.")
                        print("Future versions could auto-execute safe actions.")

            except KeyboardInterrupt:
                print("\n\nInterrupted. Type 'quit' to exit.")
            except Exception as e:
                print(f"\n❌ Error: {str(e)}")

    def run(self, start_url: Optional[str] = None):
        """
        Run the web assistant.

        Args:
            start_url: Optional URL to start with
        """
        try:
            self.start_browser()

            if start_url:
                self.navigate_to(start_url)
            else:
                print("\nBrowser ready. Use 'goto <url>' to navigate to a website.")

            self.interactive_mode()

        finally:
            self.close_browser()


def main():
    """Main entry point."""
    print("="*70)
    print("GEMINI WEB ASSISTANT")
    print("AI-Powered Web Automation Tool")
    print("="*70)
    print("\n⚠️  IMPORTANT: Use this tool responsibly!")
    print("   - Only use on websites where automation is permitted")
    print("   - Respect website terms of service and robots.txt")
    print("   - Do not use for fraudulent or malicious purposes")
    print("="*70)

    # Parse command line arguments
    import argparse
    parser = argparse.ArgumentParser(description="Gemini Web Assistant")
    parser.add_argument('--url', type=str, help='Starting URL')
    parser.add_argument('--profile', type=str, default='profile.txt', help='Path to profile file')
    parser.add_argument('--headless', action='store_true', help='Run in headless mode')
    args = parser.parse_args()

    try:
        assistant = GeminiWebAssistant(
            profile_path=args.profile,
            headless=args.headless
        )
        assistant.run(start_url=args.url)
    except KeyboardInterrupt:
        print("\n\nExiting...")
    except Exception as e:
        print(f"\n❌ Fatal error: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
