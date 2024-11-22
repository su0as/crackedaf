# CrackedAF

A modern news aggregator platform.

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Security Notes

- Never commit the `.env` file to version control
- Update the admin credentials in your production environment
- Use strong, unique passwords for admin access
- Consider implementing additional security measures like:
  - Rate limiting for login attempts
  - Two-factor authentication
  - IP whitelisting for admin access

## Environment Variables

- `VITE_ADMIN_USERNAME`: Admin username for the platform
- `VITE_ADMIN_PASSWORD`: Admin password for the platform
- Other environment variables as needed

## Production Deployment

1. Update environment variables in your production environment
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the `dist` directory to your hosting provider