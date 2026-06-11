#!/usr/bin/env node

/**
 * Main setup script
 * Checks prerequisites and triggers backend setup if needed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const envPath = path.join(__dirname, '..', '.env');

console.log('\n Application Setup\n');

// Cleanup old containers if they exist
try {
  console.log(' Cleaning up old containers...');
  execSync('docker-compose --env-file .env down -v 2>/dev/null || true', { stdio: 'ignore' });
  console.log(' Cleanup complete\n');
} catch (err) {
  // Ignore errors during cleanup
}

// Check if .env exists
if (!fs.existsSync(envPath)) {
  console.log('.env not found. Running backend configuration...\n');
  
  try {
    execSync('node scripts/setup-backend.js', { stdio: 'inherit' });
  } catch (err) {
    console.error(' Setup failed');
    process.exit(1);
  }
} else {
  console.log('.env already configured');
  console.log(`Backend path: ${fs.readFileSync(envPath, 'utf8').match(/BACKEND_PATH=(.+)/)?.[1] || 'Not set'}\n`);
}

console.log('Setup complete!');
console.log('Next step: npm install && npm run docker:up\n');
