# Python Handbook

## Prompts

- Define all variables types in Python with explanations and examples of how to use
- list all type names defined in Python, divided them into 2 groups: frequently used, and rarely used
- summarize all in markdown file

## CLI

```bash
python3
import this
```

```plaintext
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

Create a comprehensive Python reference guide in markdown format with the following specifications:

1. Structure:

   - Include an auto-generated table of contents with clickable links
   - Use hierarchical numeric headings (1, 1.1, 1.1.1, etc.)
   - Divide content into two main sections: "Frequently Used Features" and "Advanced Concepts"
   - Use collapsible sections (HTML <details>/<summary> tags) for subsections to improve readability while keeping all content accessible

2. File organization:

   - Prioritize containing all content in a single markdown file
   - Only split into two separate files if the content exceeds markdown rendering capabilities
   - If splitting is necessary, the first file should contain the table of contents, introduction, and "Frequently Used Features"
   - The second file should contain "Advanced Concepts" with its own mini table of contents

3. Content:

   - For each Python concept, provide a direct comparison with JavaScript in table format
   - Include practical code examples for both languages
   - Cover language fundamentals, data structures, functions, OOP, error handling, and modern features

4. Comparison tables should include:

   - Syntax differences
   - Performance characteristics
   - Common gotchas and edge cases
   - Best practices for each language

5. Coverage depth:

   - "Frequently Used Features" should include everyday programming concepts
   - "Advanced Concepts" should cover topics typically asked in senior developer interviews
   - Include interview-focused notes highlighting key differences senior developers should understand

6. Interview preparation focus:
   - Highlight architectural differences between Python and JavaScript
   - Include sections on performance optimization techniques in both languages
   - Cover modern features (Python 3.9+ and ES2020+)
   - Address system design considerations when using either language
