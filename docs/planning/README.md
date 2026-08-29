Absolutely. Since you want **AI Text Cleaner** and **CleanPaste** as the primary competitors, I’d define V1 around the overlap between them, but with a stronger UX and a clearer product proposition.

I’ve structured the document into:

1. **V1 Feature Specification**
2. **Website Layout & UX Specification**

The core principle is: **the hero section is the product**. A user should be able to paste text, clean it, inspect the result, and copy it without needing to scroll through a marketing page.

AI Text Cleaner currently emphasizes browser-side processing, independent cleaning toggles, Unicode/invisible-character cleanup, Markdown cleanup, and a side-by-side comparison. ([AI Text Cleaner][1]) CleanPaste positions itself around invisible-character and AI-artifact cleanup. ([Clean Paste][2])

# AI Text Cleaning Tool — V1 Product & Website Specification

## 1. Product Overview

### Product concept

A browser-based tool that allows users to paste AI-generated text and instantly clean unwanted:

* Invisible characters
* Unicode artifacts
* AI-style formatting
* Markdown leftovers
* Special symbols
* Unwanted whitespace
* Typography inconsistencies
* Other text artifacts

### Primary user promise

> **Paste AI text. Clean it instantly. Copy clean text.**

The product should be:

* Fast
* Simple
* Free to start
* Privacy-focused
* Browser-based
* No account required
* No unnecessary configuration
* Useful immediately after landing on the website

### Primary competitors

**AI Text Cleaner**

Positioning:

> Fix AI formatting and hidden text artifacts.

Its current implementation uses individual cleaning rules/toggles and browser-side processing. ([AI Text Cleaner][1])

**CleanPaste**

Positioning:

> Remove invisible characters and AI-related artifacts from pasted text.

### Our opportunity

Rather than competing only on the number of cleaning rules, compete on:

> **Better UX + clearer cleaning results + transparency + speed.**

---

# SECTION 1 — V1 FEATURES

## 1.1 Core Cleaning Engine

The cleaning engine should be completely client-side.

### A. Invisible character removal

Remove:

* Zero-width space
* Zero-width non-joiner
* Zero-width joiner where appropriate
* Byte Order Mark
* Soft hyphen
* Word joiner
* Invisible formatting characters
* Directional formatting marks
* Unicode control characters
* Unicode tag characters
* Other known invisible formatting artifacts

### User benefit

Text may look normal visually while containing characters that can cause:

* Search problems
* Copy/paste problems
* Database inconsistencies
* Regex failures
* Unexpected text comparisons
* Formatting issues

This is one of the core problems competitors such as AI Text Cleaner explicitly target. ([AI Text Cleaner][1])

---

# 1.2 Whitespace Cleaning

### Remove/normalize

* Non-breaking spaces
* Narrow non-breaking spaces
* Multiple spaces
* Trailing spaces
* Excessive blank lines
* Tabs where appropriate
* Unusual Unicode whitespace

### Example

```text
Hello     world


This is text.
```

becomes:

```text
Hello world

This is text.
```

### Option

Allow:

> **Normalize whitespace**

---

# 1.3 Typography Normalization

Normalize common AI-generated typography.

### Smart quotes

```text
“Hello”
‘World’
```

↓

```text
"Hello"
'World'
```

### Dashes

```text
This is an example — with an em dash.
```

↓

```text
This is an example - with an em dash.
```

Support:

* Em dash
* En dash
* Horizontal bar

### Ellipsis

```text
Wait…
```

↓

```text
Wait...
```

These are directly aligned with the functionality currently offered by AI Text Cleaner. ([AI Text Cleaner][1])

---

# 1.4 Unicode Normalization

Use Unicode normalization to handle visually unusual representations.

Examples:

```text
Ｈｅｌｌｏ
```

↓

```text
Hello
```

And:

```text
ﬁ
```

↓

```text
fi
```

Use Unicode NFKC normalization where appropriate.

### Important

Do **not** blindly convert every non-Latin character.

Users may legitimately use:

* Urdu
* Arabic
* Chinese
* Japanese
* Cyrillic
* Greek
* etc.

Therefore Unicode normalization should be safe by default.

AI Text Cleaner similarly treats lookalike-character conversion as a potentially destructive operation and keeps it separate from normal Unicode normalization. ([AI Text Cleaner][1])

---

# 1.5 Markdown Cleanup

AI-generated content frequently contains Markdown.

V1 should optionally remove:

### Headings

```text
# Heading
## Heading
### Heading
```

↓

```text
Heading
Heading
Heading
```

### Bold

```text
**important text**
```

↓

```text
important text
```

### Italic

```text
*important text*
```

↓

```text
important text
```

### Code formatting

```text
`some text`
```

↓

```text
some text
```

### Blockquotes

```text
> Important information
```

↓

```text
Important information
```

### Horizontal separators

```text
---
```

↓

removed.

### Lists

Potentially support:

```text
- Item
* Item
• Item
```

with an option:

> **Remove list formatting**

Do not automatically destroy list structure unless the user chooses that option.

---

# 1.6 Special Character Cleanup

Provide a configurable option:

> **Remove unwanted symbols**

Possible targets:

```text
★
☆ 
→
⇒
✓
✔
✦
◆
●
```

However, this needs to be implemented carefully.

**Do not simply remove every non-ASCII character.**

For example:

```text
Café
José
السلام عليكم
你好
```

must remain valid.

Therefore the cleaner should distinguish between:

* Language characters
* Useful punctuation
* Formatting symbols
* Decorative symbols

---

# 1.7 Emoji Removal

Option:

> **Remove emojis**

Example:

```text
This is amazing! 🚀🔥✨
```

↓

```text
This is amazing!
```

This should be optional.

Some users may actually want emojis preserved.

---

# 1.8 AI Formatting Cleanup

Create a dedicated category:

### AI Formatting

Potential rules:

* Remove unnecessary Markdown
* Remove decorative separators
* Remove excessive formatting
* Normalize bullet formatting
* Remove unnecessary heading syntax
* Remove excessive blank lines
* Normalize quotation marks
* Normalize dashes
* Remove decorative symbols

The objective isn't to rewrite the content.

It is:

> **Keep the user's words while removing formatting artifacts.**

---

# 1.9 AI Boilerplate Cleanup

This is a possible V1/V1.1 feature.

Detect common conversational prefixes such as:

```text
Sure!
Certainly!
Of course!
Absolutely!
Here is a comprehensive guide...
Here's a detailed breakdown...
I hope this helps!
```

However, this should **not automatically delete sentences based purely on keyword matching**.

Instead, consider:

> **Remove AI intro/outro phrases**

with conservative pattern matching.

This could become one of your differentiating features later.

---

# 1.10 Hidden Character Inspector

This should be one of the major UX features.

Instead of simply saying:

> Cleaned successfully.

Show the user what was actually found.

Example:

```text
TEXT ANALYSIS

Words                 1,284
Characters            7,392

Issues Found

Invisible characters       12
Non-breaking spaces         8
Smart quotes               24
Em dashes                  13
Markdown artifacts          7
Extra whitespace           31
```

This creates trust.

The user understands:

> **Why does my text need cleaning?**

---

# 1.11 Before / After Comparison

Use a two-panel interface.

```text
┌──────────────────────────┬──────────────────────────┐
│ ORIGINAL                 │ CLEANED                  │
│                          │                          │
│ AI-generated text...     │ Clean text...            │
│                          │                          │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
```

Highlight changes where practical.

For example:

```text
Original:
Hello — this is “AI” text.

Clean:
Hello - this is "AI" text.
```

Changed characters should be visually identifiable.

This follows the useful transparency approach used by AI Text Cleaner, which provides a side-by-side diff. ([AI Text Cleaner][1])

---

# 1.12 Cleaning Controls

Instead of forcing one cleaning configuration, provide categories.

### Recommended V1 controls

```text
CLEANING OPTIONS

☑ Remove invisible characters
☑ Normalize whitespace
☑ Normalize quotes
☑ Normalize dashes
☑ Normalize Unicode
☑ Remove Markdown
☐ Remove emojis
☐ Remove decorative symbols
☐ Remove AI boilerplate
```

### Quick presets

Add:

**Clean Everything**

**Safe Clean**

**Formatting Only**

**Custom**

This is much easier for normal users than exposing 15 individual checkboxes immediately.

---

# 1.13 One-Click Cleaning

Primary button:

> **Clean Text**

After cleaning:

> **Copy Clean Text**

Secondary:

> **Clean Again**

---

# 1.14 Copy

Output actions:

```text
Copy
Download .txt
Clear
```

Copy should provide a temporary confirmation:

> ✓ Copied

No popup required.

---

# 1.15 Character / Word Statistics

Display:

```text
1,284 words · 7,392 characters
```

After cleaning:

```text
1,284 words · 7,341 characters
```

This makes the transformation measurable.

---

# 1.16 Cleaning Summary

After processing:

```text
✓ Text cleaned

42 formatting issues removed
12 invisible characters removed
8 spaces normalized
13 punctuation marks normalized
```

This is an important selling/UX element.

---

# 1.17 Privacy

This should be a **major selling point**.

Since V1 is frontend-only:

> **Your text never leaves your browser.**

Supporting copy:

> We clean your text directly on your device. No upload. No account. No storage.

This is already a major positioning element for AI Text Cleaner. ([AI Text Cleaner][1])

---

# 1.18 No Account

V1:

* No login
* No signup
* No email
* No account required

User lands → pastes → cleans → copies.

---

# 1.19 Offline Capability

Because the cleaning engine is JavaScript-based, the application can potentially work without an active connection after loading.

This is another strong privacy/performance benefit and is explicitly used by AI Text Cleaner. ([AI Text Cleaner][1])

---

# 1.20 V1 Feature Priority

### P0 — Must Have

```text
✓ Paste text
✓ Clean text
✓ Invisible character removal
✓ Whitespace normalization
✓ Unicode normalization
✓ Smart quote normalization
✓ Dash normalization
✓ Ellipsis normalization
✓ Markdown cleanup
✓ Before/after output
✓ Copy cleaned text
✓ Clear text
✓ Word count
✓ Character count
✓ Cleaning summary
✓ Client-side processing
✓ Mobile responsive UI
```

### P1 — Important

```text
✓ Emoji removal
✓ Decorative symbol removal
✓ Cleaning presets
✓ Individual cleaning toggles
✓ Highlight changes
✓ Download TXT
✓ Hidden-character inspection
✓ Settings persistence
```

### P2 — Later

```text
○ AI boilerplate removal
○ PII detection
○ Custom replacement rules
○ Batch text cleaning
○ Browser extension
○ API
○ User accounts
○ Cleaning history
○ Team functionality
```

---

# SECTION 2 — WEBSITE LAYOUT & UX

## 2.1 Core UX Principle

### The hero is the product.

Do **not** make the homepage:

```text
Hero
↓
Image slider
↓
Features
↓
Testimonials
↓
Pricing
↓
FAQ
↓
Tool
```

That creates unnecessary friction.

Instead:

```text
┌──────────────────────────────────────────────┐
│ Logo                 How it works    Privacy │
├──────────────────────────────────────────────┤
│                                              │
│          Clean AI Text Instantly             │
│     Remove hidden characters & formatting    │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ Paste your AI-generated text here...     │ │
│ │                                          │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│          [ ✨ Clean Text ]                   │
│                                              │
│     Private • Browser-based • No signup      │
│                                              │
└──────────────────────────────────────────────┘
```

The user can complete the entire job **above the fold**.

---

# 2.2 Header

Keep it extremely simple.

### Left

Logo:

> **CleanText**

or whatever final brand name you choose.

### Right

```text
How it works
Privacy
```

Optional:

```text
☾
```

for dark mode.

Avoid 7–8 navigation items.

The website exists primarily to perform one action.

---

# 2.3 Hero

### Primary headline

Potential direction:

> **Clean AI Text in One Click**

Alternative:

> **Paste AI Text. Get Clean Text.**

I prefer the second style because it immediately communicates the workflow.

### Supporting text

> Remove invisible characters, unwanted formatting, Markdown artifacts, and other AI text quirks — instantly in your browser.

### Main CTA

The textarea itself is the primary interaction.

Do not make the user click:

> Get Started

before seeing the tool.

---

# 2.4 Hero Input

The input should dominate the screen.

### Empty state

```text
Paste your AI-generated text here...

        Ctrl + V
```

Bottom bar:

```text
0 words · 0 characters
```

Right/Bottom:

```text
Clear
```

Then:

```text
[ ✨ Clean Text ]
```

---

# 2.5 After User Pastes Text

The interface transforms.

```text
┌─────────────────────────────────────────────────────┐
│ Original                         742 words           │
│                                                     │
│ User's pasted AI text...                            │
│                                                     │
└─────────────────────────────────────────────────────┘

                ↓

        [ ✨ Clean Text ]

                ↓

┌─────────────────────────────────────────────────────┐
│ Cleaned                           719 words          │
│                                                     │
│ Cleaned output...                                   │
│                                                     │
│                              [Copy] [Download]       │
└─────────────────────────────────────────────────────┘
```

On desktop, use side-by-side.

On mobile, stack them vertically.

---

# 2.6 Cleaning Options Placement

Do **not** put 15 checkboxes between the input and output.

That creates cognitive overload.

Instead:

```text
Cleaning: Safe Clean ▼
```

Clicking it opens:

```text
Cleaning Preset

● Safe Clean
○ Clean Everything
○ Formatting Only
○ Custom

Custom Options

☑ Invisible characters
☑ Whitespace
☑ Unicode
☑ Quotes
☑ Dashes
☑ Markdown
☐ Emojis
☐ Symbols
```

Default users never need to interact with this.

Power users can.

---

# 2.7 Cleaning Result

The result should immediately communicate:

### Success

> **Your text is clean.**

Then:

```text
42 issues removed
```

and:

```text
[ Copy Clean Text ]
```

Make Copy the most prominent action after cleaning.

---

# 2.8 Diff / Changes

Add a small expandable section:

> **See what we changed**

Click:

```text
12 invisible characters removed
8 non-breaking spaces converted
13 dashes normalized
9 quotation marks normalized
```

Then:

> **View detailed changes**

This keeps the main interface clean while still giving advanced users transparency.

---

# 2.9 Privacy Selling Point

Directly below the tool:

```text
🔒 Private by design

Your text is cleaned directly in your browser.
Nothing is uploaded, stored, or sent to a server.
```

This should be visible **without scrolling much**.

It is not just legal copy.

It is a product advantage.

AI Text Cleaner explicitly uses browser-only processing and "nothing uploaded" as a major differentiator. ([AI Text Cleaner][1])

---

# 2.10 Micro Feature Strip

Instead of a giant feature section:

```text
✓ 100% Browser-Based
✓ No Signup
✓ No Upload
✓ Instant Cleaning
```

This can sit directly below the hero.

---

# 2.11 How It Works

Only after the user has access to the tool.

Three simple steps:

```text
01
Paste

Paste text generated by ChatGPT,
Claude, Gemini or another AI.

        ↓

02
Clean

We remove hidden characters,
formatting artifacts and unwanted symbols.

        ↓

03
Copy

Copy your clean text and use it
wherever you need it.
```

No large image slider.

No carousel.

No unnecessary illustrations.

---

# 2.12 Feature Section

Use categories rather than a huge list.

### Invisible Character Cleanup

> Find and remove characters you can't see.

### Formatting Cleanup

> Remove Markdown and unwanted formatting artifacts.

### Typography Cleanup

> Normalize quotes, dashes, spaces and Unicode.

### Privacy

> Your text stays in your browser.

### Instant Results

> No upload. No waiting. No account.

Each card should contain a short explanation.

---

# 2.13 "What We Clean" Section

This is useful for SEO and user understanding.

Example:

```text
What can we remove?

Invisible characters
Zero-width spaces
Non-breaking spaces
Smart quotes
Em dashes
Ellipsis characters
Markdown formatting
Extra whitespace
Unicode formatting
Decorative symbols
Emoji
```

This section can be visually compact.

---

# 2.14 Use Cases

Don't overdo this.

Three/four cards:

### Writers

Clean AI-generated drafts before publishing.

### Developers

Clean AI-generated code snippets and text.

### Students

Remove unwanted formatting when moving AI-generated content into documents.

### Content Creators

Clean AI output before moving it into CMSs and social platforms.

These audiences also overlap with the developer, writer/editor and content-creator audiences identified by AI Text Cleaner. ([AI Text Cleaner][1])

---

# 2.15 FAQ

Keep around 5–7 questions.

Examples:

### Does my text get uploaded?

No. Cleaning happens directly in your browser.

### Does it work with ChatGPT?

Yes. It can clean text copied from ChatGPT and other AI assistants.

### Does it remove the meaning of my text?

No. The cleaner is designed to modify formatting and text artifacts rather than rewrite your content.

### Does it detect AI-generated text?

No. The product cleans text; it is not an AI detector.

### Is it free?

V1 can be completely free.

---

# 2.16 Footer

Minimal:

```text
CleanText

Clean AI-generated text instantly.

Privacy
Terms
Contact

© 2026 CleanText
```

No huge footer sitemap.

---

# SECTION 3 — USER JOURNEY

The ideal journey is:

```text
Google / Social / Direct Visit
          ↓
         Hero
          ↓
   Paste AI-generated text
          ↓
     Clean Text
          ↓
   See result + changes
          ↓
    Copy Clean Text
          ↓
        Done
```

The user should **not need to scroll** to accomplish the primary task.

---

# SECTION 4 — SELLING POINTS

Your strongest marketing messages should be:

### 1. Instant

> **Clean AI text in one click.**

### 2. Private

> **Your text never leaves your browser.**

### 3. Simple

> **Paste. Clean. Copy.**

### 4. Transparent

> **See exactly what was removed.**

### 5. No signup

> **No account. No email. No friction.**

### 6. Broad compatibility

> **Clean text from ChatGPT, Claude, Gemini and other AI tools.**

### 7. Free

> **Free to use, with no complicated setup.**

---

# SECTION 5 — PRODUCT POSITIONING

I would **not** position V1 as:

> "Make AI text undetectable."

That puts the product into a much more problematic and technically ambiguous category.

Instead:

> **Clean the hidden formatting and artifacts that come with AI-generated text.**

The distinction is important.

You're selling:

**Text quality + compatibility + privacy**

rather than:

**AI detector bypassing.**

---

# SECTION 6 — RECOMMENDED HOMEPAGE STRUCTURE

Final page hierarchy:

```text
HEADER
│
├── Logo
├── How it works
└── Privacy
│
▼
HERO / ACTUAL TOOL
│
├── Headline
├── Short explanation
├── Text input
├── Cleaning controls
├── Clean button
├── Output
├── Copy button
└── Cleaning summary
│
▼
TRUST STRIP
│
├── Browser-based
├── No upload
├── No signup
└── Instant
│
▼
HOW IT WORKS
│
├── Paste
├── Clean
└── Copy
│
▼
WHAT WE CLEAN
│
├── Invisible characters
├── Unicode
├── Formatting
├── Markdown
└── Typography
│
▼
WHO IT'S FOR
│
├── Writers
├── Developers
├── Students
└── Content creators
│
▼
FAQ
│
▼
FOOTER
```

**No image carousel.**

**No giant marketing hero image.**

**No "Get Started" page before the actual tool.**

The user should encounter the textarea almost immediately.

---

# SECTION 7 — V1 DESIGN PHILOSOPHY

### Visual style

I'd recommend:

* Clean
* Minimal
* Modern SaaS
* White/light neutral background
* Strong typography
* One accent color
* Rounded textarea
* Subtle borders
* Minimal shadows
* Plenty of whitespace
* No distracting illustrations

### Most important component

The **text editor** should visually dominate the page.

The website should feel like:

> **A useful tool first, a marketing website second.**

That is the biggest UX opportunity I see against these competitors.

### Core interaction

```text
PASTE
  ↓
CLEAN
  ↓
INSPECT
  ↓
COPY
```

Everything else is secondary.

[1]: https://www.aitextclean.com/ "AI Text Cleaner — Remove Hidden Characters from AI-Generated Text"
[2]: https://cleanpaste.site/ "Clean Paste – Remove Invisible Characters & AI Watermarks from Text"
