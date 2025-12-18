"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const dotenv = __importStar(require("dotenv"));
// Load environment variables from .env file
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Get configuration from environment variables with defaults
    const host = process.env.HOST || '192.168.1.114'; // Default to specific IP for network access
    const port = parseInt(process.env.PORT || '3000', 10);
    const frontendPort = process.env.FRONTEND_PORT || '5175';
    // Build CORS origins dynamically
    const corsOrigins = [
        `http://localhost:${frontendPort}`, // Always allow localhost
        `http://192.168.1.114:${frontendPort}`, // Always allow network IP
    ];
    // If host is not localhost/0.0.0.0/192.168.1.114, add it to CORS origins
    if (host !== '0.0.0.0' && host !== 'localhost' && host !== '127.0.0.1' && host !== '192.168.1.114') {
        corsOrigins.push(`http://${host}:${frontendPort}`);
    }
    // Allow additional CORS origins from environment variable (comma-separated)
    // Example: CORS_ORIGIN=http://192.168.1.114:5173,http://192.168.1.100:5173
    if (process.env.CORS_ORIGIN) {
        const additionalOrigins = process.env.CORS_ORIGIN
            .split(',')
            .map(origin => origin.trim())
            .filter(origin => origin.length > 0); // Filter out empty strings
        corsOrigins.push(...additionalOrigins);
    }
    // Enable CORS for frontend
    app.enableCors({
        origin: corsOrigins,
        credentials: true,
    });
    // Log CORS configuration for debugging
    console.log('CORS enabled for origins:', corsOrigins);
    // Enable validation pipe for DTOs
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(port, host);
    const displayHost = host === '0.0.0.0' ? 'localhost' : host;
    console.log(`Backend running on http://${displayHost}:${port}`);
    if (host === '0.0.0.0') {
        console.log(`Backend accessible on all network interfaces (0.0.0.0:${port})`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map