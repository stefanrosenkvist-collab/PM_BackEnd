const { Client } = require('pg');
require('dotenv').config();

async function verifyMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not defined');
    process.exit(1);
  }

  const client = new Client({
    connectionString: databaseUrl,
  });

  try {
    await client.connect();
    console.log('🔌 Connected to database\n');

    // Check if new columns exist
    const columnsCheck = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Arbetsorder' 
      AND column_name IN ('workplace', 'street', 'postalCode', 'city', 'addressWorkplace')
      ORDER BY column_name;
    `);

    console.log('📊 Current columns in Arbetsorder table:');
    columnsCheck.rows.forEach(row => {
      console.log(`   ✓ ${row.column_name} (${row.data_type})`);
    });

    // Check if addressWorkplace still exists
    const oldColumnExists = columnsCheck.rows.some(row => row.column_name === 'addressWorkplace');
    if (oldColumnExists) {
      console.log('\n⚠️  Warning: addressWorkplace column still exists');
    } else {
      console.log('\n✅ addressWorkplace column has been removed');
    }

    // Check data migration
    const dataCheck = await client.query(`
      SELECT 
        COUNT(*) as total,
        COUNT("workplace") as has_workplace,
        COUNT("street") as has_street,
        COUNT("postalCode") as has_postalCode,
        COUNT("city") as has_city
      FROM "Arbetsorder";
    `);

    console.log('\n📈 Data statistics:');
    console.log(`   Total records: ${dataCheck.rows[0].total}`);
    console.log(`   Records with workplace: ${dataCheck.rows[0].has_workplace}`);
    console.log(`   Records with street: ${dataCheck.rows[0].has_street}`);
    console.log(`   Records with postalCode: ${dataCheck.rows[0].has_postalCode}`);
    console.log(`   Records with city: ${dataCheck.rows[0].has_city}`);

  } catch (error) {
    console.error('❌ Verification failed:');
    console.error(error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed');
  }
}

verifyMigration();

