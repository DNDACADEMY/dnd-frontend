# Create Draft Pull Request

Same as `/pr` command but creates a **draft pull request** instead of a ready-for-review PR.

## Usage

```bash
/pr-draft
```

## What it does

1. Analyzes changes (same as `/pr`)
2. Generates title and body (same as `/pr`)
3. Pushes branch if needed (same as `/pr`)
4. **Creates DRAFT PR** using `gh pr create --draft`

## When to use

- Work in progress (WIP)
- Want feedback before marking ready
- PR not complete yet but want to show progress
- Need CI checks to run first

## Converting to ready PR

After creation, mark as ready on GitHub or use:

```bash
gh pr ready <PR-NUMBER>
```
