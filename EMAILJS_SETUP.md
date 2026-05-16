# EmailJS Setup Instructions

To make your contact form functional, follow these steps to set up EmailJS:

## 1. Create an EmailJS Account
Go to [emailjs.com](https://www.emailjs.com/) and create a free account.

## 2. Add an Email Service
- Go to the **Email Services** tab.
- Click **Add New Service**.
- Select your email provider (e.g., Gmail).
- Connect your account and click **Create Service**.
- **Copy the "Service ID"** (e.g., `service_xxxxxx`).

## 3. Create an Email Template
- Go to the **Email Templates** tab.
- Click **Create New Template**.
- Customize the email content. Ensure you use the following variable names in the template to match the code:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{message}}`
- Click **Save**.
- **Copy the "Template ID"** (e.g., `template_xxxxxx`).

## 4. Get Your Public Key
- Go to the **Account** tab (usually under your name in the top right).
- Look for the **Public Key** section.
- **Copy the "Public Key"** (e.g., `user_xxxxxx` or a random string).

## 5. Configure Environment Variables
1. Create a file named `.env.local` in the root of your project.
2. Copy the content from `.env.example` into `.env.local`.
3. Paste your actual keys:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```

## 6. Restart Development Server
After adding `.env.local`, restart your development server to load the new variables:
```bash
npm run dev
```

Your contact form should now be fully functional!
