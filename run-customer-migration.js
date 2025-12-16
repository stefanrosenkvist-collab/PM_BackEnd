const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not defined in environment variables');
    console.error('Please make sure you have a .env file with DATABASE_URL set');
    process.exit(1);
  }

  const client = new Client({
    connectionString: databaseUrl,
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully');

    // Read the migration file
    const migrationPath = path.join(__dirname, 'Database', 'migrations', 'create_customer_table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📝 Executing migration to create Customer table...');
    await client.query(migrationSQL);
    
    console.log('✅ Migration completed successfully!');
    console.log('📊 Customer table has been created in the database.');
    
  } catch (error) {
    console.error('❌ Migration failed:');
    console.error(error.message);
    if (error.code === '42P07') {
      console.log('ℹ️  Table already exists. This is okay if you\'ve run the migration before.');
    } else {
      process.exit(1);
    }
  } finally {
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

runMigration();

