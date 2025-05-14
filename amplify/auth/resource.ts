// Import the defineAuth function from Amplify's backend utilities
import { defineAuth } from '@aws-amplify/backend';

// Export the authentication configuration
export const auth = defineAuth({
  // Define the login mechanism — here using email-based login replace your company with your company name
  loginWith: {
    email: {
      // Subject line for the verification email
      verificationEmailSubject: "Verify your email for YourCompany",

      // HTML body for the verification email
      verificationEmailBody: (createCode: () => string) => `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; color: #333333;">
            <div style="max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2C3E50; margin-bottom: 20px;">Welcome to YourCompany!</h1>

              <p>Thank you for signing up. To complete your registration, please verify your email address by entering the following verification code:</p>

              <div style="background-color: #F7F9FA; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: center;">
                <span style="font-size: 24px; font-weight: bold; letter-spacing: 3px;">${createCode()}</span>
              </div>

              <p>This code will expire in 24 hours for security reasons.</p>

              <p>If you didn't create an account with YourCompany, please ignore this email.</p>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #EAEAEA;">
                <p style="font-size: 12px; color: #666666;">
                  This is an automated message, please do not reply to this email.<br>
                  © ${new Date().getFullYear()} YourCompany. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    },
  },

  // Define user groups for role-based access control
  groups: ["USERS", "ADMIN"],

  // Define sender email settings for verification and notifications
  senders: {
    email: {
      // Email address configured in Amazon SES or Cognito
      fromEmail: "you@example.com",

      // Display name that appears as the sender
      fromName: "YourCompany",
    }
  }
});
