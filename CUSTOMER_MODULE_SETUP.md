# Customer Module Setup - Complete ✅

## Files Created

All Customer module files have been created following the same pattern as the Projects module:

### 1. Entity
- ✅ `src/entities/customer.entity.ts` - TypeORM entity definition

### 2. DTOs
- ✅ `src/customers/dto/create-customer.dto.ts` - Create customer DTO with validation
- ✅ `src/customers/dto/update-customer.dto.ts` - Update customer DTO

### 3. Service
- ✅ `src/customers/customers.service.ts` - Business logic for CRUD operations

### 4. Controller
- ✅ `src/customers/customers.controller.ts` - REST API endpoints

### 5. Module
- ✅ `src/customers/customers.module.ts` - NestJS module configuration

### 6. App Module
- ✅ `src/app.module.ts` - Updated to include Customer entity and CustomersModule

### 7. Database Migration
- ✅ `Database/migrations/create_customer_table.sql` - SQL migration script

## Next Steps

### 1. Run the Database Migration

You need to create the Customer table in your PostgreSQL database. You can do this by:

**Option A: Run the SQL file directly**
```bash
psql -U postgres -d your_database_name -f Database/migrations/create_customer_table.sql
```

**Option B: Execute via pgAdmin or your database tool**
- Open the SQL file: `Database/migrations/create_customer_table.sql`
- Execute it against your database

### 2. Restart the Backend Server

After running the migration, restart your NestJS backend:

```bash
cd C:\SMIM\BackEnd\PM_BackEnd
npm run start:dev
```

### 3. Test the Endpoints

Once the backend is running, test the endpoints:

```bash
# Get all customers (should return empty array initially)
curl http://localhost:3000/customers

# Create a customer
curl -X POST http://localhost:3000/customers \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test Customer",
    "streetAddress": "123 Main St",
    "postalCode": "12345",
    "city": "Stockholm",
    "contactPerson": "John Doe",
    "contactPersonPhone": "+46 123 456 789",
    "contactPersonEmail": "john@example.com"
  }'
```

## API Endpoints

The following endpoints are now available:

- `GET /customers` - Get all customers
- `POST /customers` - Create a new customer
- `GET /customers/:id` - Get a specific customer
- `PATCH /customers/:id` - Update a customer
- `DELETE /customers/:id` - Delete a customer

## Field Requirements

- **customerName** (required) - String
- **streetAddress** (optional) - String
- **postalCode** (optional) - String
- **city** (optional) - String
- **contactPerson** (optional) - String
- **contactPersonPhone** (optional) - String
- **contactPersonEmail** (optional) - String (validated as email format)

## Frontend Integration

The frontend is already configured to use these endpoints. Once the backend is running with the migration applied, the Customer page should work automatically.

## Troubleshooting

### Error: "Customer table does not exist"
- **Solution:** Run the database migration SQL file

### Error: "Cannot connect to backend"
- **Solution:** Make sure the backend server is running on port 3000

### Error: "Validation failed"
- **Solution:** Check that `customerName` is provided and `contactPersonEmail` is a valid email format (if provided)

