# Claude Code Repository Guide

## Repository Overview

**Repository**: `daierlu6-sys/Claude-`  
**Purpose**: A comprehensive resource for Claude Code documentation, examples, and development workflows  
**Type**: Documentation and guidance repository  
**Hosted**: GitHub (with local proxy access)

This repository serves as a centralized hub for documenting best practices, workflows, and conventions for AI assistants working with Claude Code and related development tools.

## Table of Contents

1. [Repository Structure](#repository-structure)
2. [Development Workflow](#development-workflow)
3. [Branching Strategy](#branching-strategy)
4. [Commit Conventions](#commit-conventions)
5. [Code Quality Standards](#code-quality-standards)
6. [Documentation Standards](#documentation-standards)
7. [AI Assistant Guidelines](#ai-assistant-guidelines)
8. [Tools and Technologies](#tools-and-technologies)

---

## Repository Structure

The repository is organized as follows (to be expanded as content is added):

```
Claude-/
├── CLAUDE.md                    # This file - repository guide for AI assistants
├── README.md                    # Project overview (to be created)
├── docs/                        # Documentation directory (to be created)
│   ├── getting-started/         # Getting started guides
│   ├── workflows/               # Development workflow documentation
│   ├── conventions/             # Code and documentation conventions
│   └── examples/                # Code examples and templates
├── guides/                      # User guides (to be created)
│   ├── claude-code-setup.md     # Claude Code setup instructions
│   ├── git-workflow.md          # Git workflow guide
│   └── ai-assistant-guide.md    # Guidelines for AI assistants
├── templates/                   # Project templates (to be created)
├── scripts/                     # Utility scripts (to be created)
└── .github/                     # GitHub configuration (to be created)
    ├── workflows/               # GitHub Actions workflows
    └── CODEOWNERS               # Code owners configuration
```

### Current State

This repository is in its early stages. The primary structure uses GitHub branches for feature development and documentation. Key files to be added will include:

- Comprehensive README with project overview
- CLI tool documentation for Claude Code
- Setup and configuration guides
- Best practices for integration with AI assistants
- Examples of effective prompts and workflows

---

## Development Workflow

### Overview

The development workflow follows a standard feature branch model with clear separation between development and production branches.

### Initial Setup

```bash
# Clone the repository
git clone http://local_proxy@127.0.0.1:38001/git/daierlu6-sys/Claude-

# Navigate to directory
cd Claude-

# Check available branches
git branch -a

# Create and switch to your development branch
git checkout -b feature/your-feature-name
```

### Development Process

1. **Create a feature branch** from the appropriate base (usually `main`)
   - Branch naming follows the convention: `feature/`, `docs/`, `fix/`, etc.

2. **Make changes locally**
   - Edit files and test thoroughly
   - Commit frequently with clear, descriptive messages

3. **Push changes to remote**
   - Use: `git push -u origin your-branch-name`
   - This tracks the remote branch and simplifies future pushes

4. **Create a Pull Request**
   - Document what changed and why
   - Reference any related issues
   - Request appropriate reviewers

5. **Address review feedback**
   - Make requested changes on the same branch
   - Push updates: `git push origin your-branch-name`
   - Do not force-push unless explicitly authorized

6. **Merge when approved**
   - Use GitHub's merge functionality (preferred: squash or rebase)
   - Delete the feature branch after merging

### Emergency Procedures

In rare cases where immediate action is needed:

- **For critical fixes**: Follow the same workflow but prioritize reviews
- **For infrastructure changes**: Notify maintainers and coordinate merges
- **Destructive operations**: Always confirm with the team before proceeding
  - Examples: force-push, deleting branches, removing files, resetting commits

---

## Branching Strategy

### Branch Naming Conventions

Use descriptive, kebab-case branch names with clear prefixes:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features or functionality | `feature/add-api-documentation` |
| `docs/` | Documentation improvements | `docs/update-workflow-guide` |
| `fix/` | Bug fixes | `fix/typo-in-readme` |
| `refactor/` | Code refactoring | `refactor/simplify-utils` |
| `test/` | Test additions or improvements | `test/add-integration-tests` |
| `chore/` | Maintenance tasks | `chore/update-dependencies` |

### Main Branches

- **`main`**: Production-ready code. Always stable and deployable.
  - Only accepts merges from pull requests
  - Requires review and passing checks
  - Tagged with version releases

- **`claude/add-claude-documentation-3Outs`**: Current development branch for Claude documentation enhancements
  - Active feature branch for documentation improvements
  - Will merge to `main` when complete and reviewed

### Lifetime of a Branch

```
main
  ↓ (create from)
feature/your-feature
  ↓ (push & create PR)
Pull Request Review
  ↓ (address feedback)
feature/your-feature (updated)
  ↓ (approved & merge)
main (merged commit)
  ↓ (delete branch)
[branch archived in history]
```

---

## Commit Conventions

### Commit Message Format

Follow the conventional commits format for clear, scannable commit history:

```
type(scope): subject

body

footer
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **test**: Test additions or modifications
- **chore**: Maintenance tasks, dependency updates
- **ci**: CI/CD pipeline changes

### Examples

```
feat(documentation): add Claude Code setup guide

Adds comprehensive setup instructions for Claude Code including:
- Installation steps
- Configuration options
- First project walkthrough

Closes #42

---

fix(readme): correct typo in contribution guidelines

---

docs(api): update endpoint documentation for v2.0

Breaking change: endpoint /v1/users now returns full user objects
instead of user IDs. See migration guide in docs/migrations/v1-v2.md

Refs #156
```

### Guidelines

- **Use imperative mood**: "add feature" not "added feature"
- **Keep subject line under 50 characters**
- **Separate subject from body with blank line**
- **Wrap body at 72 characters**
- **Reference issues**: Use "Closes #123" or "Refs #123"
- **Document breaking changes**: Clearly mark any non-backward-compatible changes
- **Be atomic**: One logical change per commit
- **Write clear rationale**: Explain WHY, not just WHAT

### Commit Best Practices

✅ **Do**:
- Make small, focused commits
- Commit frequently during development
- Write descriptive messages
- Reference related issues
- Create new commits rather than amending published commits

❌ **Don't**:
- Mix unrelated changes in one commit
- Use vague messages like "update stuff" or "WIP"
- Amend commits that have been pushed and reviewed
- Force-push without explicit authorization
- Create empty commits

---

## Code Quality Standards

### General Principles

1. **Clarity over cleverness**
   - Code should be readable and maintainable
   - Prefer explicit implementations to magical behavior
   - Use clear variable and function names

2. **DRY (Don't Repeat Yourself)**
   - Avoid duplicating code logic
   - Create reusable utilities and components
   - Three similar lines can be extracted; one is not premature

3. **KISS (Keep It Simple, Stupid)**
   - Implement what's needed, not what might be needed
   - Avoid over-engineering for hypothetical future requirements
   - Simplify when possible without sacrificing readability

4. **Security First**
   - Validate all external input
   - Use secure defaults
   - Avoid common vulnerabilities (SQL injection, XSS, command injection, etc.)
   - Store secrets securely (never commit credentials)

### Code Style

- **Formatting**: Use consistent indentation (2 or 4 spaces, not tabs)
- **Line Length**: Aim for 80-100 character limits where practical
- **Naming**: Use clear, descriptive names in the appropriate case convention
  - Variables/functions: `camelCase` or `snake_case` depending on language
  - Classes: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE`
- **Comments**: Use only when the WHY is non-obvious
  - Avoid redundant comments that restate the code
  - Explain hidden constraints, edge cases, and workarounds

### Comments and Documentation

Only add comments when:
- The purpose is non-obvious
- There's a hidden constraint or invariant
- Workarounds for specific bugs are needed
- Complex algorithms need explanation

**Don't** comment:
- Self-explanatory code
- WHAT the code does (well-named identifiers do that)
- Current task references (belongs in PR description)

### Testing

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Verify interactions between components
- **Edge Cases**: Include tests for boundary conditions
- **Error Paths**: Test error handling and recovery

Tests should:
- Have clear, descriptive names
- Test one thing per test function
- Use meaningful assertions with helpful error messages
- Be independent and not rely on execution order

### Error Handling

- **Validate at boundaries**: User input, external APIs, file system
- **Trust internal code**: No need to validate data from trusted internal sources
- **Handle only recoverable errors**: Let unrecoverable errors propagate
- **Provide context**: Error messages should explain what went wrong and what was expected

---

## Documentation Standards

### Documentation Files

All documentation should use Markdown format with consistent structure:

```markdown
# Title

Brief one-sentence description.

## Overview

Longer explanation of the topic (2-3 paragraphs).

## Key Concepts

- Concept 1: description
- Concept 2: description

## How To / Examples

Step-by-step guide or code examples.

## Best Practices

- Practice 1
- Practice 2

## Related Topics

- [Link to related docs](path)
- [External reference](url)
```

### README Requirements

Every project or major component should have a README that includes:

- **Title and Description**: What is this?
- **Quick Start**: How do I get started?
- **Installation**: How do I set it up?
- **Usage**: How do I use it?
- **Configuration**: What can I configure?
- **Contributing**: How do I contribute?
- **License**: What license is this under?

### API Documentation

For APIs or libraries:

- Document all public methods/endpoints
- Include parameter descriptions and types
- Show example usage for common scenarios
- Document return values and error conditions
- Provide example requests/responses

### Changelog

Maintain a CHANGELOG.md with sections for:

```markdown
# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Added
- New features

### Changed
- Changes to existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security vulnerability fixes

## [1.0.0] - YYYY-MM-DD

[Release notes for version 1.0.0]
```

---

## AI Assistant Guidelines

### Purpose

This section provides clear guidance for AI assistants (like Claude) working within this repository.

### Before Starting Work

1. **Review this CLAUDE.md file** to understand repository conventions
2. **Check the current branch**: Ensure you're on the correct feature branch
3. **Understand the task**: Read the issue or task description completely
4. **Explore the structure**: Familiarize yourself with relevant parts of the codebase
5. **Check recent commits**: Understand what's been worked on recently

### Working with Files

✅ **Preferred Approach**:
- Use `Read` tool to view existing files
- Use `Edit` tool for modifying existing files
- Use `Write` tool to create new files (when necessary)
- Use `Bash` tool for git operations and shell commands

❌ **Avoid**:
- Creating unnecessary files
- Duplicating existing functionality
- Modifying files outside the scope of the task
- Making changes without understanding the context

### Making Changes

**Before Editing**:
1. Read the entire file to understand context
2. Identify the specific location that needs changes
3. Understand why the change is needed

**During Editing**:
1. Make focused, minimal changes
2. Preserve existing code style and conventions
3. Don't introduce unrelated refactoring
4. Test changes when possible

**After Editing**:
1. Verify the changes are correct
2. Check for any side effects
3. Ensure no new issues are introduced

### Commit Workflow

For each task:

1. **Stage changes**: Use `git add` for specific files, not `git add -A`
2. **Create a commit**: Follow the [Commit Conventions](#commit-conventions) section
3. **Push to remote**: Use `git push -u origin branch-name`
4. **Verify on GitHub**: Confirm changes appear in the remote repository

Example:
```bash
git status                           # Review changes
git add docs/new-guide.md            # Stage specific files
git commit -m "docs(guide): add new setup documentation"
git push -u origin docs/claude-setup # Push to remote
```

### Handling Errors and Blockers

When encountering issues:

1. **Investigate thoroughly**
   - Don't use destructive operations to bypass issues
   - Identify root causes
   - Try safer alternatives first

2. **Ask for clarification**
   - If requirements are ambiguous, ask the user
   - If changes affect architecture, discuss before implementing

3. **Provide context**
   - Explain what you found
   - Explain why you're blocked
   - Suggest potential solutions

### Code Review Standards

When reviewing code:

- Check for adherence to conventions in CLAUDE.md
- Verify commits follow the commit message format
- Ensure tests pass and coverage is appropriate
- Look for security issues and edge cases
- Suggest improvements with clear rationale

### Destructive Operations

The following operations require explicit user approval:

- `git push --force` (force push)
- `git reset --hard` (discard changes)
- `git checkout .` (discard all changes)
- `git branch -D` (delete branch)
- Deleting files or directories
- Modifying CI/CD pipelines
- Changing public APIs

Always:
- Explain what you plan to do
- Describe the impact
- Ask for confirmation
- Wait for approval before proceeding

### Workflow Checklist

Before marking a task complete:

- [ ] Changes address the original task/issue
- [ ] Code follows repository conventions
- [ ] Commits have clear, descriptive messages
- [ ] Changes are pushed to the correct branch
- [ ] No unrelated changes are included
- [ ] Testing has been performed (if applicable)
- [ ] Documentation has been updated (if applicable)
- [ ] No security issues have been introduced

---

## Tools and Technologies

### Version Control

- **Git**: Distributed version control system
- **GitHub**: Repository hosting and collaboration platform
- **Branching Model**: Feature branch model with `main` as stable branch

### Communication

- **GitHub Issues**: Task and bug tracking
- **Pull Requests**: Code review and collaboration
- **Commit Messages**: Clear, structured communication of changes

### Development Tools

- **Claude Code**: CLI and IDE extensions for AI-assisted development
- **Local Development**: Standard text editors and IDEs
- **Terminal/Shell**: For git operations and running scripts

### CI/CD (To be implemented)

- GitHub Actions for automated testing and validation
- Branch protection rules on `main`
- Required checks before merging

---

## Common Workflows

### Starting a New Feature

```bash
# Switch to main and pull latest
git checkout main
git pull origin main

# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Make changes, commit, and push
git add <files>
git commit -m "feat(scope): description"
git push -u origin feature/your-feature-name
```

### Updating a Branch with Latest Main

```bash
# Fetch latest main
git fetch origin main

# Rebase your branch (or merge, depending on preference)
git rebase origin/main
# or
git merge origin/main

# Push updated branch
git push origin your-branch-name
```

### Reviewing Your Own Changes

```bash
# View uncommitted changes
git diff

# View staged changes
git diff --cached

# View last commit
git show HEAD

# View commit history
git log --oneline -10
```

### Reverting Changes

```bash
# Revert specific file to last commit
git checkout -- path/to/file

# Undo last commit (keep changes)
git reset --soft HEAD~1

# View what would be reverted
git diff HEAD~1
```

---

## Resources and References

### Documentation to Create

- [ ] README.md - Project overview
- [ ] docs/getting-started.md - Getting started guide
- [ ] docs/workflows/git-workflow.md - Detailed git workflows
- [ ] docs/conventions/code-style.md - Code style guide
- [ ] docs/conventions/documentation-style.md - Documentation conventions
- [ ] guides/claude-code-setup.md - Claude Code setup and configuration
- [ ] guides/ai-assistant-guide.md - Extended guidelines for AI assistants

### External References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Git Documentation](https://git-scm.com/doc)

---

## Maintenance and Updates

This CLAUDE.md file should be updated when:

- Repository structure changes significantly
- New conventions are established
- Workflow processes change
- New tools are adopted
- Documentation standards are refined

### Updating This File

1. Create a branch: `docs/update-claude-md`
2. Make changes following the conventions in this file
3. Commit with message: `docs(claude): [describe what changed]`
4. Create a pull request with clear explanation
5. Merge after review

---

## Questions or Clarifications?

If anything in this guide is unclear:

1. Refer to the [Commit Conventions](#commit-conventions) and [AI Assistant Guidelines](#ai-assistant-guidelines) sections
2. Check relevant example files or existing code
3. Ask in GitHub issues or pull request discussions
4. Review this file for related information

---

**Last Updated**: 2026-05-07  
**Maintained By**: Development team and AI assistants  
**Version**: 1.0
