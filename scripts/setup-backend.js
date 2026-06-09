#!/usr/bin/env node

/**
 * Setup backend path configuration
 * Creates .env file with backend path
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

function askQuestion(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

async function setupBackend() {
  console.log('\n🔧 Backend Configuration Setup\n');

  // Check if .env exists
  if (fs.existsSync(envPath)) {
    const modify = await askQuestion('❓ .env already exists. Modify it? (y/n): ');
    if (modify.toLowerCase() !== 'y') {
      rl.close();
      return;
    }
  }

  // Ask for backend path
  console.log('\nEnter the ABSOLUTE path to your backend (use forward slashes /):');
  console.log('Example: C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque\n');
  const backendPath = await askQuestion('Backend path: ');

  if (!backendPath.trim()) {
    console.error('❌ Backend path cannot be empty');
    rl.close();
    return;
  }

  // Verify the path contains Dockerfile
  const dockerfilePath = backendPath.replace(/\\/g, '/').replace(/\/$/, '') + '/Dockerfile';
  
  console.log(`\n✓ Verifying path: ${dockerfilePath}`);

  // For validation, just check if it's a reasonable path
  if (!backendPath.includes(':') && !backendPath.includes('/')) {
    console.error('❌ Invalid path format. Use absolute path with forward slashes.');
    rl.close();
    return;
  }

  // Create .env content
  const envContent = `# Backend Configuration
BACKEND_PATH=${backendPath.replace(/\\/g, '/')}

# Port Configuration
FRONTEND_PORT=4200
BACKEND_PORT=8080
POSTGRES_PORT=5432
MAILPIT_PORT=8025

# Database Configuration
POSTGRES_DB=bibliotheque
POSTGRES_USER=bibliotheque_user
POSTGRES_PASSWORD=bibliotheque_password

# Spring Boot Configuration
SPRING_PROFILES_ACTIVE=docker
`;

  // Write .env file
  fs.writeFileSync(envPath, envContent);
  console.log(`\n✅ .env file created successfully!`);
  console.log(`📁 Backend path: ${backendPath}`);
  console.log('\n✨ Ready to run: npm run docker:up\n');

  rl.close();
}

setupBackend().catch(err => {
  console.error('❌ Error:', err.message);
  rl.close();
  process.exit(1);
});
