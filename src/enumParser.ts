import * as vscode from 'vscode';

export function parseEnum(text: string) {
    const enumPattern = /(\w+).*?:=\s*enum.*?[{:](.*)/s;
    const match = enumPattern.exec(text);

    if (!match) {
        return null;
    }

    const name = match[1];
    const content = match[2].replaceAll(" ", "");

    const wordRegex = /\w+/sg;
    const allWords = content.match(wordRegex);

    if(allWords === null || allWords.length === 0) return null;

    const visiblity = text.includes("<public>") ? "<public>" : "";
    
    return (
        `(EnumValue: ${name}).ToString${visiblity}():string=\n    case(EnumValue):\n` + 
        allWords.map(word => `        ${name}.${word} => "${word}"`).join("\n")
    );
}

export async function generateEnum() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    const enumCode = parseEnum(selectedText);
    if(enumCode === null) {
        vscode.window.showErrorMessage("Could not parse enum!");
        return;
    }

    editor.edit(editBuilder => {
        editBuilder.insert(
            new vscode.Position(editor.selection.end.line + 1, 0), enumCode);
    });
}