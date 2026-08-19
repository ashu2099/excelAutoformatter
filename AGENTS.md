# File Modification Gate

Treat all file operations as prohibited by default. Do not create, write, edit, modify, move, rename, or delete any file or directory unless the user's current prompt explicitly contains the exact phrase `write files`.

If that exact phrase is absent, use read-only actions only and do not touch the filesystem. The phrase must appear in each prompt that authorizes file changes; do not infer, carry forward, or assume permission from earlier prompts.
