# Playwright Syntax and Examples from `practice-1.spec.ts`

## Syntax and Examples

### 1. **Page Navigation**

#### Syntax:

```typescript
await page.goto(url);
```

#### Example:

```typescript
await page.goto(
  "https://material.playwrightvn.com/01-xpath-register-page.html"
);
```

### 2. **Filling Input Fields**

#### Syntax:

```typescript
await page.locator(xpath).fill(value);
```

#### Example:

```typescript
await page.locator("//input[@id='username']").fill("demo");
```

### 3. **Checking Radio Buttons and Checkboxes**

#### Syntax:

```typescript
await page.locator(xpath).check();
```

#### Example:

```typescript
await page.locator("//input[@type='radio' and @id='male']").check();
await page.locator("//input[@type='checkbox' and @id='reading']").check();
```

### 4. **Selecting Dropdown Options**

#### Syntax:

```typescript
await page.locator(xpath).selectOption(value);
```

#### Example:

```typescript
await page.locator("//select[@id='country']").selectOption("uk");
```

### 5. **Clicking Elements**

#### Syntax:

```typescript
await page.locator(xpath).click();
await page.locator(xpath).dblclick();
await page.locator(xpath).click({ clickCount: count, modifiers: [modifier] });
```

#### Example:

```typescript
await page.locator("//div[@id='topLeft']").click();
await page.locator("//div[@id='topLeft']").dblclick();
await page
  .locator("//div[@id='bottomRight']")
  .click({ clickCount: 5, modifiers: ["Shift"] });
```

### 6. **Role-based Locator**

#### Syntax:

```typescript
await page.getByRole(role, { name: name }).click();
```

#### Example:

```typescript
await page.getByRole("button", { name: "Register" }).click();
```

### 7. **XPath Locators**

#### Syntax:

```typescript
await page.locator(xpath);
```

#### Example:

```typescript
await page.locator("//input[@id='email']").fill("demo@co.co");
```
