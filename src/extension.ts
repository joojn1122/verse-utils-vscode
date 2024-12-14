import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import { generateEnum } from './enumParser';

const {
    registerCommand
} = vscode.commands;

function cmd(context: vscode.ExtensionContext, name: string, callback: () => void): vscode.Disposable {
    const cmd = registerCommand(name, callback);
    context.subscriptions.push(cmd);
    return cmd;
}

function insertVerseUsings() {
    const editor = vscode.window.activeTextEditor;
    
    if (!editor) {
        return;
    }
    
    editor.edit(editBuilder => {
        const usings = [
            "/Fortnite.com/Devices",
            "/Verse.org/Simulation",
            "/Verse.org/Colors",
            "/Fortnite.com/Teams",
            "/Fortnite.com/Game",
            "/Fortnite.com/Characters",
            "/UnrealEngine.com/Temporary/Diagnostics",
            "/UnrealEngine.com/Temporary/UI",
            "/UnrealEngine.com/Temporary/SpatialMath",
            "/Fortnite.com/UI",
            "/Verse.org/Assets",
            "/Verse.org/Random",
            "/Fortnite.com/FortPlayerUtilities",
            "/Verse.org/Simulation/Tags",
            "/Fortnite.com/AI",
            "/Fortnite.com/Animation/PlayAnimation"
        ];
        
        const usingsText = usings.map(u => `using { ${u} }\n`).join('')
        
        editBuilder.insert(new vscode.Position(0, 0), usingsText);
    });
}

export function activate(context: vscode.ExtensionContext) {
    cmd(context, 'verse-utils.verse-usings', insertVerseUsings);
    cmd(context, 'verse-utils.enum-str', generateEnum);
    cmd(context, 'verse-utils.exlude-nonverse', checkAndExcludeFolders);
    
    const disposable = vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('files.exclude')) {
            const filesExclude = vscode.workspace.getConfiguration().get<any>('files.exclude');
            
            // If configuration was removed
            if(filesExclude && !filesExclude.__VerseUtilsVsCodeChanged__) {
                checkAndExcludeFolders();
            }
        }
    });
    
    context.subscriptions.push(disposable);
    
    checkAndExcludeFolders();
}

async function checkAndExcludeFolders() {
    const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (rootPath) {
        const files = fs.readdirSync(rootPath);
        
        // Non uefn project
        if(!files.find(f => f == "__ExternalActors__")) {
            return;
        }
        
        const config = vscode.workspace.getConfiguration();
        const foldersToExclude = config.get<any>('files.exclude');
        
        const excludeEmptyFolders = vscode.workspace.getConfiguration("verse-utils").get<boolean>("excludeEmptyFolders") ?? false;
        
        for (const file of files) {
            const filePath = path.join(rootPath, file);
            
            if (fs.statSync(filePath).isDirectory()) {
                const files = fs.readdirSync(filePath);
                
                // Exclude folder
                if(
                    (excludeEmptyFolders && files.length === 0) ||
                    (files.length > 0 && !files.some(f => f.endsWith('.verse')))
                ) {
                    foldersToExclude[file] = true;
                }
                else {
                    // Include folder
                    try {
                        delete foldersToExclude[file];
                    }
                    catch{}
                }
            }
        }
        
        // Add switch to avoid infinite recursion
        foldersToExclude.__VerseUtilsVsCodeChanged__ = true;
        
        await config.update('files.exclude', foldersToExclude, vscode.ConfigurationTarget.Workspace);
    }
}

export function deactivate() {}
