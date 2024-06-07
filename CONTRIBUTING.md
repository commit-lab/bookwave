# How To Contribute

## Git Workflow

We will work off of one default `main` (mainline) branch.

All of the code that gets merged into `main` will be continuously deployed to Vercel (frontend) and GCP (backend).

Workflow in a nutshell:

```sh
# Before working, sync local main to remote git
git pull origin main

# Checkout a new branch to commit your work
git checkout -b name/your-branch-name

# ... make changes, stage, and commit:
git commit -m '...'

# OPTIONAL:
# if `main` has been updated by someone else and you want to incorporate those
# changes before submiting your PR, this is when you would rebase and follow the
# instructions.
git rebase main

# Push your branch to the remote repo. (You can also configure `git push` to
# work too so you don't have to manually type in the name of the branch every
# time.)
git push origin name/your-branch-name
```

Then, submit a PR!

If your PR can't be merged because of a merge conflict:

```sh
# Checkout the main branch again
git checkout main

# Sync your local main with the remote source
git pull origin main

# Go back to the branch that can't be merged through a PR
git checkout name/your-branch-name

# Rebase to incorporate changes that have been made to `main`
git rebase

# Push and submit a PR.
git push
```
