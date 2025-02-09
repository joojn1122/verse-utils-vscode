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

export function activate(context: vscode.ExtensionContext) {
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

async function* walk(dir: string): AsyncGenerator<string> {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile()) yield entry;
    }
}

async function shouldExcludeFolder(folderPath: string, excludeEmptyFolders: boolean) {
    const files = fs.readdirSync(folderPath);

    if(excludeEmptyFolders && files.length == 0) {
        return true;
    }

    for await (const file of walk(folderPath)) {
        if(file.endsWith('.verse')) {
            return false;
        }
    }

    return true;
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
                // Exclude folder
                if(await shouldExcludeFolder(filePath, excludeEmptyFolders)) {
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
