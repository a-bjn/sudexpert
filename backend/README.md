# Sudexpert Backend

Spring Boot REST API for the Sudexpert e-commerce platform.

## Technology Stack

- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Security** with JWT authentication
- **Spring Data JPA** with PostgreSQL
- **Lombok** for reducing boilerplate
- **Maven** for dependency management

## Prerequisites

- Java 21 or higher
- Maven 3.9+
- PostgreSQL 16+ (or Docker)

## Getting Started

### 1. Database Setup

#### Using Docker Compose (Recommended)
```bash
# From project root
docker-compose up -d postgres
```

#### Manual PostgreSQL Setup
```sql
CREATE DATABASE sudexpert;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE sudexpert TO postgres;
```

### 2. Configuration

Create `application-local.properties` (optional):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sudexpert
spring.datasource.username=postgres
spring.datasource.password=your_password

application.security.jwt.secret-key=your_secret_key_here
```

### 3. Run the Application

```bash
# Using Maven wrapper
./mvnw spring-boot:run

# Or with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

The API will be available at: `http://localhost:8080`

## API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/authenticate` - Login

### Products (Public)
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{categoryId}` - Get products by category
- `POST /api/products` - Create product (Admin)

### Categories (Public)
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create category (Admin)

### Orders (Protected)
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order

## Testing

### Run All Tests
```bash
./mvnw test
```

### Run Specific Test
```bash
./mvnw test -Dtest=ProductServiceTest
```

### Run with Coverage
```bash
./mvnw test jacoco:report
```

See [TESTING.md](../TESTING.md) for detailed testing documentation.

## Building for Production

### Create JAR
```bash
./mvnw clean package -DskipTests
```

The JAR will be in `target/sudexpert-0.0.1-SNAPSHOT.jar`

### Run JAR
```bash
java -jar target/sudexpert-0.0.1-SNAPSHOT.jar
```

## Docker

### Build Image
```bash
docker build -t sudexpert-backend .
```

### Run Container
```bash
docker run -p 8080:8080 \
  -e DB_URL=jdbc:postgresql://host.docker.internal:5432/sudexpert \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=password \
  sudexpert-backend
```

## Project Structure

```
src/main/java/com/backend/sudexpert/
├── config/              # Security, JWT configuration
├── controller/          # REST controllers
├── domain/              # JPA entities
├── dto/                 # Data Transfer Objects
├── repository/          # JPA repositories
├── service/             # Business logic
└── SudexpertApplication.java
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_URL` | Database JDBC URL | `jdbc:postgresql://localhost:5432/sudexpert` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `password` |
| `JWT_SECRET` | JWT signing key | (default key) |

## Security

- JWT-based authentication
- Passwords encrypted with BCrypt
- CORS enabled for frontend
- CSRF disabled (stateless API)

## Development

### Code Style
- Follow Java naming conventions
- Use Lombok annotations
- Keep controllers thin, logic in services

### Adding New Endpoints
1. Create/update domain entity
2. Create repository interface
3. Implement service logic
4. Create controller endpoint
5. Write tests

## Troubleshooting

### Port Already in Use
```bash
# Change port in application.properties
server.port=8081
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker ps

# Check connection
psql -h localhost -U postgres -d sudexpert
```

### JWT Issues
```bash
# Generate new secret key (Base64)
openssl rand -base64 64
```

## Contributing

1. Create feature branch
2. Write tests
3. Ensure all tests pass
4. Submit pull request

## License

Proprietary - All rights reserved

