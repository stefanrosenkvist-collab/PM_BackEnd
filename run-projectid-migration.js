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

  // Parse the DATABASE_URL
  const client = new Client({
    connectionString: databaseUrl,
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully');

    // Read the migration file
    const migrationPath = path.join(__dirname, 'Database', 'migrations', 'add_arbetsorder_projectid.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📝 Executing migration to add projectId column to Arbetsorder table...');
    await client.query(migrationSQL);
    
    console.log('✅ Migration completed successfully!');
    console.log('📊 Arbetsorder table now has projectId column.');
    console.log('💡 You can now update arbetsorders with projectId values.');
    
  } catch (error) {
    console.error('❌ Migration failed:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

runMigration();

