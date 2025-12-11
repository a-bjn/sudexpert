# Git Branching Strategy

This document outlines the branching strategy used in the Sudexpert project.

## 🌳 Branch Structure

### Main Branches

- **`main`** - Production-ready code
  - Always stable and deployable
  - Protected branch (requires pull requests)
  - Merged from `backend-dev` and `frontend-dev`

- **`backend-dev`** - Backend development branch
  - Integration branch for backend features
  - Merged into `main` when stable

- **`frontend-dev`** - Frontend development branch
  - Integration branch for frontend features
  - Merged into `main` when stable

## 📋 Branch Naming Conventions

### Feature Branches
Format: `feature/<scope>-<description>`

Examples:
- `feature/backend-order-code-implementation`
- `feature/frontend-authentication`
- `feature/frontend-checkout-payment`

### Fix Branches
Format: `fix/<scope>-<description>`

Examples:
- `fix/backend-security-tests`
- `fix/frontend-checkout-auth-redirect`

### Chore Branches
Format: `chore/<scope>-<description>`

Examples:
- `chore/backend-initial-setup`
- `chore/frontend-initial-setup`

## 🔄 Workflow

### Creating a New Feature

1. **Create feature branch from dev branch:**
   ```bash
   # For backend features
   git checkout backend-dev
   git pull origin backend-dev
   git checkout -b feature/backend-new-feature
   
   # For frontend features
   git checkout frontend-dev
   git pull origin frontend-dev
   git checkout -b feature/frontend-new-feature
   ```

2. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "feat(backend): add new feature description"
   ```

3. **Push feature branch:**
   ```bash
   git push -u origin feature/backend-new-feature
   ```

4. **Create Pull Request:**
   - Open PR from `feature/backend-new-feature` → `backend-dev`
   - Or from `feature/frontend-new-feature` → `frontend-dev`

5. **After merge, delete feature branch:**
   ```bash
   git branch -d feature/backend-new-feature
   git push origin --delete feature/backend-new-feature
   ```

### Releasing to Production

1. **Merge dev branches to main:**
   ```bash
   git checkout main
   git pull origin main
   
   # Merge backend
   git merge backend-dev --no-ff -m "Release backend v1.x.x"
   
   # Merge frontend
   git merge frontend-dev --no-ff -m "Release frontend v1.x.x"
   
   git push origin main
   ```

2. **Tag the release:**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

## 📝 Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `security`: Security-related changes

### Scopes
- `backend`: Backend changes
- `frontend`: Frontend changes
- `api`: API changes
- `database`: Database changes
- `config`: Configuration changes

### Examples
```bash
feat(backend): add unique order code generation
fix(frontend): resolve checkout authentication redirect issue
docs: update API documentation
chore(backend): upgrade Spring Boot to 3.2.0
security(backend): remove hardcoded API keys
```

## 🎯 Current Branches

### Active Development Branches
- `backend-dev` - Backend development
- `frontend-dev` - Frontend development

### Feature Branches (Backend)
- `feature/backend-order-code-implementation` - Unique order codes
- `feature/backend-database-migration` - Database migration system
- `chore/backend-initial-setup` - Initial Spring Boot setup

### Feature Branches (Frontend)
- `feature/frontend-api-integration` - API client
- `feature/frontend-authentication` - JWT authentication
- `feature/frontend-checkout-payment` - Checkout & Stripe
- `feature/frontend-order-success` - Order confirmation page
- `chore/frontend-initial-setup` - Initial Next.js setup

### Fix Branches
- `fix/backend-security-tests` - Security test improvements
- `fix/frontend-checkout-auth-redirect` - Checkout auth fixes

## 🔒 Branch Protection Rules (Recommended)

### For `main` branch:
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Include administrators in restrictions

### For `backend-dev` and `frontend-dev`:
- Require pull request reviews before merging
- Require status checks to pass before merging

## 🚀 Best Practices

1. **Keep branches focused** - One feature/fix per branch
2. **Update regularly** - Pull from dev branches frequently
3. **Small commits** - Make atomic, logical commits
4. **Descriptive messages** - Write clear commit messages
5. **Clean up** - Delete merged branches
6. **Test before merging** - Ensure all tests pass
7. **Review code** - Use pull requests for code review
8. **Document changes** - Update documentation with features

## 📊 Branch Lifecycle

```
feature/new-feature
    ↓ (development)
    ↓ (commit, commit, commit)
    ↓ (push)
    ↓ (pull request)
    ↓ (code review)
    ↓ (merge)
backend-dev / frontend-dev
    ↓ (testing)
    ↓ (integration)
    ↓ (pull request)
    ↓ (final review)
    ↓ (merge)
main
    ↓ (tag)
    ↓ (deploy)
Production
```

## 🛠️ Useful Commands

### View all branches
```bash
git branch -a
```

### View branch history
```bash
git log --oneline --graph --all
```

### Clean up local branches
```bash
git fetch --prune
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

### Sync with remote
```bash
git fetch origin
git checkout backend-dev
git pull origin backend-dev
```

---

**Last Updated:** December 11, 2025  
**Version:** 1.0.0

