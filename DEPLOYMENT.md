# Deploying to Hostinger

This guide outlines the steps to deploy the Dutch Funding Opportunities platform on Hostinger's Node.js hosting.

## Prerequisites

- A Hostinger account with Node.js hosting plan
- FTP client (like FileZilla) or Hostinger's File Manager
- Access to terminal/command line

## Deployment Steps

### 1. Prepare Your Project

1. Build your project locally:
   ```
   npm run build
   ```
   This will generate the `.next` directory with the compiled application.

2. Prepare the following files for upload:
   - `.next` folder (compiled application)
   - `public` folder (static assets)
   - `package.json` and `package-lock.json` (dependencies)
   - `next.config.js` (Next.js configuration)
   - `.env` files (with production credentials)

### 2. Upload Files to Hostinger

1. Connect to your Hostinger account using FTP or the File Manager
2. Upload all the prepared files to your hosting environment
3. Make sure to maintain the directory structure

### 3. Configure Node.js Settings

1. Log in to your Hostinger Control Panel
2. Navigate to the Node.js section
3. Set the following configuration:
   - **Node.js version**: Select the latest LTS version (14+)
   - **Entry point**: `node_modules/next/dist/bin/next`
   - **Arguments**: `start`
   - **Node.js environment**: `production`

### 4. Set Up Environment Variables

1. In your Hostinger Control Panel, locate the Environment Variables section
2. Add all the required environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
   NODE_ENV=production
   ```

### 5. Install Dependencies

1. Connect to your hosting environment via SSH (if available)
2. Navigate to your project directory
3. Run:
   ```
   npm install --production
   ```

### 6. Start the Application

1. In your Hostinger Control Panel, restart the Node.js application
2. Check the application logs for any errors

### 7. Configure Domain

1. Point your domain to the Hostinger servers
2. Set up SSL certificate for HTTPS

## Troubleshooting

If you encounter issues:

1. Check the Node.js application logs in the Hostinger Control Panel
2. Verify that all environment variables are set correctly
3. Ensure all required files have been uploaded
4. Check that the Node.js version is compatible with your project

## Performance Optimization

For best performance:

1. Enable GZIP compression in the Hostinger Control Panel
2. Set up proper caching headers for static assets
3. Enable Hostinger's CDN if available