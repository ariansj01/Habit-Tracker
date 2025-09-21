#!/usr/bin/env node

/**
 * Test Runner Script for Habit Tracker API
 * 
 * This script provides a convenient way to run different types of tests
 * with proper setup and teardown.
 */

const { spawn } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    log(`Running: ${command} ${args.join(' ')}`, 'cyan');
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function checkServerHealth() {
  try {
    const http = require('http');
    
    return new Promise((resolve) => {
      const req = http.get('http://localhost:3000/api/habits', (res) => {
        resolve(res.statusCode === 200);
      });
      
      req.on('error', () => {
        resolve(false);
      });
      
      req.setTimeout(5000, () => {
        req.destroy();
        resolve(false);
      });
    });
  } catch (error) {
    return false;
  }
}

async function waitForServer(maxAttempts = 30, delay = 2000) {
  log('Checking if API server is running...', 'yellow');
  
  for (let i = 0; i < maxAttempts; i++) {
    const isHealthy = await checkServerHealth();
    
    if (isHealthy) {
      log('✓ API server is running and healthy', 'green');
      return true;
    }
    
    log(`Attempt ${i + 1}/${maxAttempts}: Server not ready, waiting ${delay}ms...`, 'yellow');
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  log('✗ API server is not responding after maximum attempts', 'red');
  return false;
}

async function runCypressTests(options = {}) {
  log('\n🧪 Running Cypress E2E Tests', 'bright');
  
  const args = ['cypress', 'run'];
  
  if (options.browser) {
    args.push('--browser', options.browser);
  }
  
  if (options.headless) {
    args.push('--headless');
  }
  
  if (options.spec) {
    args.push('--spec', options.spec);
  }
  
  try {
    await runCommand('npx', args);
    log('✓ Cypress tests completed successfully', 'green');
  } catch (error) {
    log('✗ Cypress tests failed', 'red');
    throw error;
  }
}

async function runLoadTests(options = {}) {
  log('\n⚡ Running Load Tests', 'bright');
  
  const configFile = options.config || 'load-test-no-limit.yml';
  const args = ['artillery', 'run', configFile];
  
  if (options.output) {
    args.push('--output', options.output);
  }
  
  try {
    await runCommand('npx', args);
    log('✓ Load tests completed successfully', 'green');
    
    if (options.output) {
      log(`📊 Generating HTML report from ${options.output}...`, 'yellow');
      await runCommand('npx', ['artillery', 'report', options.output]);
      log('✓ HTML report generated', 'green');
    }
  } catch (error) {
    log('✗ Load tests failed', 'red');
    throw error;
  }
}

async function runAllTests() {
  log('\n🚀 Running All Tests', 'bright');
  
  try {
    // Run Cypress tests
    await runCypressTests({ headless: true });
    
    // Run load tests
    await runLoadTests({ config: 'load-test-no-limit.yml' });
    
    log('\n✅ All tests completed successfully!', 'green');
  } catch (error) {
    log('\n❌ Some tests failed', 'red');
    process.exit(1);
  }
}

function showHelp() {
  log('\n📋 Test Runner Help', 'bright');
  log('Usage: node scripts/test-runner.js [command] [options]', 'cyan');
  log('\nCommands:', 'yellow');
  log('  cypress [options]     Run Cypress E2E tests');
  log('  load [options]        Run Artillery load tests');
  log('  all                   Run all tests');
  log('  help                  Show this help message');
  log('\nCypress Options:', 'yellow');
  log('  --browser <browser>   Run in specific browser (chrome, firefox, edge)');
  log('  --headless           Run in headless mode');
  log('  --spec <pattern>     Run specific test files');
  log('\nLoad Test Options:', 'yellow');
  log('  --config <file>      Use specific config file');
  log('  --output <file>      Save results to file');
  log('  --report             Generate HTML report');
  log('\nExamples:', 'yellow');
  log('  node scripts/test-runner.js cypress --browser chrome');
  log('  node scripts/test-runner.js load --config load-test-stress.yml --report');
  log('  node scripts/test-runner.js all');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help') {
    showHelp();
    return;
  }
  
  // Check if server is running
  const serverRunning = await waitForServer();
  if (!serverRunning) {
    log('\n❌ Please start the API server first:', 'red');
    log('   npm run dev', 'cyan');
    process.exit(1);
  }
  
  try {
    switch (command) {
      case 'cypress': {
        const options = {};
        for (let i = 1; i < args.length; i += 2) {
          const flag = args[i];
          const value = args[i + 1];
          
          switch (flag) {
            case '--browser':
              options.browser = value;
              break;
            case '--headless':
              options.headless = true;
              i--; // No value for this flag
              break;
            case '--spec':
              options.spec = value;
              break;
          }
        }
        await runCypressTests(options);
        break;
      }
      
      case 'load': {
        const options = {};
        for (let i = 1; i < args.length; i += 2) {
          const flag = args[i];
          const value = args[i + 1];
          
          switch (flag) {
            case '--config':
              options.config = value;
              break;
            case '--output':
              options.output = value;
              break;
            case '--report':
              options.output = options.output || 'report.json';
              break;
          }
        }
        await runLoadTests(options);
        break;
      }
      
      case 'all':
        await runAllTests();
        break;
      
      default:
        log(`Unknown command: ${command}`, 'red');
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    log(`\n❌ Unexpected error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  runCypressTests,
  runLoadTests,
  runAllTests,
  checkServerHealth,
  waitForServer
};
