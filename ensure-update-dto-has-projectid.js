const fs = require('fs');
const path = require('path');

const dtoPath = path.join(__dirname, 'src', 'arbetsorder', 'dto', 'update-arbetsorder.dto.ts');

function ensureUpdateDtoHasProjectId() {
  try {
    console.log('🔍 Checking UpdateArbetsorderDto for projectId field...');
    
    if (!fs.existsSync(dtoPath)) {
      console.error('❌ UpdateArbetsorderDto file not found at:', dtoPath);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(dtoPath, 'utf8');
    
    // Check if projectId exists in the file
    const hasProjectId = /projectId\s*\?:/g.test(fileContent);
    
    if (hasProjectId) {
      console.log('✅ UpdateArbetsorderDto already has projectId field');
      console.log('📝 File location:', dtoPath);
      return true;
    } else {
      console.error('❌ UpdateArbetsorderDto is missing projectId field');
      console.error('📝 File location:', dtoPath);
      console.error('\n💡 The DTO should include:');
      console.error('   @IsString()');
      console.error('   @IsOptional()');
      console.error('   projectId?: string;');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error checking UpdateArbetsorderDto:');
    console.error(error.message);
    process.exit(1);
  }
}

ensureUpdateDtoHasProjectId();

