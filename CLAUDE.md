# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a new repository currently in its initial setup phase. It's designed to serve as a project space for development and documentation work.

## Branch Structure

- **main**: Production/stable branch. Use for merged, reviewed changes only.
- **claude/add-claude-documentation-RiuCx**: Feature branch for adding Claude documentation and establishing project structure.

### Branch Conventions

1. All development happens on feature branches (format: `claude/<feature-name>`)
2. Create pull requests when merging to main
3. Ensure all changes are committed before switching branches
4. Use descriptive branch names that reflect the work being done

## Development Workflow

### Getting Started

```bash
# Check current branch and status
git branch -a
git status

# Fetch latest changes
git fetch origin

# Switch to a feature branch for new work
git checkout -b claude/<your-feature-name>
```

### Making Changes

1. Make your code changes
2. Stage changes: `git add <files>` or `git add .`
3. Commit with a clear, descriptive message: `git commit -m "description"`
4. Push to the feature branch: `git push -u origin claude/<your-feature-name>`
5. Create a pull request when ready for review

### Commit Messages

Use clear, imperative commit messages:
- ✅ Good: "Add documentation structure" or "Fix git configuration issue"
- ❌ Avoid: "Updates" or "Working on stuff"

## Current Project State

The repository is newly initialized with:
- Basic git configuration
- Two branches (main and the documentation feature branch)
- Minimal starter files

## Future Development Considerations

As the project evolves, consider adding:

1. **Documentation**
   - README.md (project overview and setup instructions)
   - Contributing guidelines
   - Architecture documentation

2. **Configuration Files**
   - .gitignore (for language-specific files, dependencies, etc.)
   - .github/workflows (for CI/CD if needed)
   - Project-specific configuration files

3. **Code Structure**
   - Organize code by feature or domain
   - Establish clear module boundaries
   - Document API contracts and interfaces

4. **Quality Assurance**
   - Test suite and testing strategies
   - Linting and formatting rules
   - Pre-commit hooks for code quality

## Git Operations

### Push Changes

```bash
# Push to feature branch (creates remote branch if needed)
git push -u origin claude/<your-feature-name>

# Push to main (only after PR review and merge)
git push origin main
```

### Pulling Latest Changes

```bash
# Fetch specific branch
git fetch origin <branch-name>

# Pull and merge changes
git pull origin <branch-name>
```

## Common Patterns for Claude Code

When working in this repository:

1. **Exploratory Work**: Use feature branches to experiment and explore
2. **Documentation First**: Consider documenting architectural decisions and patterns
3. **Clear Naming**: Use clear, descriptive names for files, functions, and branches
4. **Atomic Commits**: Keep commits focused and logically separated
5. **Regular Pushes**: Push changes regularly to avoid losing work in ephemeral environments

## Repository Configuration

The repository is configured with:
- Remote: `origin` → Local proxy (for development/testing)
- Default branch: main
- Multi-branch setup for collaborative development

## When Adding New Content

1. Consider the project's long-term structure
2. Document major architectural decisions
3. Keep related code together
4. Use meaningful file and directory names
5. Update CLAUDE.md as the project evolves
