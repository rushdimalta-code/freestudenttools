# CLAUDE.md — Free Student Tools

Inherits WAT framework principles from global CLAUDE.md.

## Project Purpose
Public static web app offering free document utilities for students.
Current tools: OCR Scanner, PDF Converter, Translator, PDF Compressor.
Monetisation target: Google AdSense.

## Stack
- Static HTML/CSS/JS — one HTML file per tool
- No backend, no auth, no user accounts — all tools run client-side

## Key Rules
- Each tool is a separate HTML file — keep them independent
- No paid API calls without confirming with user first
- New tools follow the same pattern — check existing HTML files before building anything new

## Reference Docs
- `ANALYTICS-SETUP.md` — analytics config (@mention when needed)
- `workflows/` — SOPs per tool