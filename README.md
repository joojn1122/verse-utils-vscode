# 📜 **Verse Utils**

**Verse Utils** is a Visual Studio Code extension that provides helpful utilities for working with Verse files in UEFN (Unreal Editor for Fortnite) projects. This extension aims to streamline common Verse development tasks, making your workflow faster and more efficient.

---

## 🚀 **Features**

### 1️⃣ **Exclude Non-Verse Files**
This command helps you filter out files that are not Verse files from your project tree, improving project organization and focus.

**Command**: `Exclude non Verse files`

**Usage**:
- Run `Exclude non Verse files` from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
- The extension will hide non-Verse files from the project explorer.

**The extension will also run this command on startup and on every workspace settings change.**

### 2️⃣ **Verse Default Usings**
Easily insert default "usings" statements for Verse scripts with one command.

**Command**: `Verse Default Usings`

**Usage**:
- Run `Verse Default Usings` from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
- Default Verse "usings" will be inserted into the active editor.

### 3️⃣ **Verse Enum ToString**
Generate a function to convert Verse enums into string representations, since Verse doesn't support enum-to-string conversion by default.

**Command**: `Verse Enum ToString`

**Usage**:
- Select the lines that define the Verse `enum`.
- Run `Verse Enum ToString` from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
- The extension will automatically generate a function that converts the enum values into strings.

> **Example**
```py
action_type := enum:
    Left
    Right
    Middle

# Generated Function
(EnumValue: action_type).ToString():string=
  case(action):
    action_type.Left => "Left"
    action_type.Right => "Right"
    action_type.Middle => "Middle"
```

---

## ⚙️ **Configuration Options**

The extension provides customization options in your **settings.json** file. To customize these options, open **File > Preferences > Settings** and search for "Verse Utils".

| **Setting**                   | **Type**    | **Default** | **Description**                         |
|---------------------------------|------------|-------------|------------------------------------------|
| `verse-utils.excludeEmptyFolders` | `boolean`  | `false`     | If enabled, empty folders will be excluded from the project tree. |

> **Example (settings.json)**
```json
{
  "verse-utils.excludeEmptyFolders": true
}
```

---

## 📦 **Installation**

1. Download the latest **.vsix** file from the [Releases Page](https://github.com/joojn1122/verse-utils-vscode/releases).
2. Open Visual Studio Code.
3. Go to the **Extensions View** (`Ctrl+Shift+X` or `Cmd+Shift+X`).
4. Click the **...** (More Actions) button in the top-right corner.
5. Select **Install from VSIX...**.
6. Choose the downloaded **.vsix** file and click **Install**.

---

## 📘 **Usage**

1. Open any Verse file in Visual Studio Code.
2. Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P`).
3. Search for the commands listed below and execute them as needed:
   - `Verse Default Usings`
   - `Verse Enum ToString`

---

## 🛠️ **Development**

If you want to contribute or modify the extension, you can clone the repository and build it locally.

### **Build Instructions**
1. Clone the repository:
   ```bash
   git clone https://github.com/joojn1122/verse-utils-vscode.git
   cd verse-utils-vscode
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open the project in Visual Studio Code:
   ```bash
   code .
   ```

4. Run the extension in a **VS Code Extension Host**:
   - Press `F5` to launch the development host.

### **Available Scripts**
| **Command**        | **Description**                       |
|--------------------|---------------------------------------|
| `npm run compile`  | Compile the TypeScript files to JS    |
| `npm run watch`    | Watch for file changes and recompile  |
| `npm run lint`     | Lint the TypeScript files             |
| `npm run test`     | Run unit tests for the extension      |

---

## 📚 **Commands**

| **Command**            | **Description**                         |
|-----------------------|------------------------------------------|
| `Verse Default Usings` | Insert default Verse "usings"          |
| `Verse Enum ToString`  | Generate a function to convert Verse enums to strings |
| `Exclude non Verse files` | Exclude non-Verse files from the file tree |

---

## 🙌 **Contributing**

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

---

## ❓ **FAQ**

**Q: How do I configure the extension to exclude empty folders?**
> A: Set the `verse-utils.excludeEmptyFolders` option in **settings.json** to `true`.

**Q: How do I generate an Enum toString function?**
> A: Highlight the enum in your Verse file and run the **Verse Enum ToString** command from the command palette.

**Q: I encountered a bug. How do I report it?**
> A: Open an issue on [GitHub](https://github.com/joojn1122/verse-utils-vscode/issues) with details and steps to reproduce.

---

## 👤 **Author**
**Publisher**: joojn  
This extension is maintained and developed by **joojn**.

If you have questions, suggestions, or feedback, feel free to reach out or open an issue.

---

## 📃 **License**
This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.

