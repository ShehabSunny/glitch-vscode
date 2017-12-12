# Glitch

This is an extension that enables glitch effect for vs code.

##### SPECIAL NOTE: If Code complains about that it is corrupted, simply click “Don't show again”.


## Features

A glitch effect is enabled into all the texts shown in vs code.

![Glitch effect](https://github.com/ShehabSunny/glitch-vscode/blob/master/glitch.gif)

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension commands

As you know to access the command palette and introduce commands you can use ***F1*** (all OS), ***Ctrl+Shift+P*** (Windows & Linux) or ***Cmd+Shift+P*** (OS X).

- ***Glitch (Enable)*** : It enables the glitch effect. 
- ***Glitch (Disable)*** : It will disable glitch effect.
Note: in both cases vs code needs to be reloaded.

## Windows users

**In Windows, make sure you run your VS Code in Administrator mode before enabling or disabling your custom style!**

## Linux users
**Linux also requires you to reclaim ownership of the vs code folders** 
You can achieve this by executing this on your terminal (Ubuntu):
```sh
#for vs code:
sudo chown -R $(whoami) /usr/share/code
#for vs code insiders:
sudo chown -R $(whoami) /usr/share/code-insiders
#if you want to check your folder's owner:
ls -la /usr/share/code
#if you want to rollback this permissions back to root:
sudo chown -R root /usr/share/code
```

# Disclaimer
This extension modifies some VS Code files so use it at your own risk.
Currently, custom CSS is not supported by the extension functionality that VS Code provides so this extension solves this issue by injecting code into:

- `electron-browser/index.html`.

The extension will restore back to original file when disable command is executed. 

As this extension modifies VS Code files it will get disabled with every VS Code update. You will have to enable via command palette.

**Enjoy!**