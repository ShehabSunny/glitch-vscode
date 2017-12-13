var vscode = require('vscode');
var fs = require('fs');
var path = require('path');
var events = require('events');
var msg = require('./messages').messages;

var fileUrl = require('file-url');

const indicatorClass = '__CUSTOM_CSS_JS_INDICATOR_CLS'
const indicatorCSS = `<link rel="stylesheet" type="text/css" href="${fileUrl(__dirname + '/glitch.css')}"/>`

function activate(context) {

	console.log('vscode-customcss is active!');

	process.on('uncaughtException', function (err) {
		if (/ENOENT|EACCES|EPERM/.test(err.code)) {
			vscode.window.showInformationMessage(msg.admin);
			return;
		}
	});

	var eventEmitter = new events.EventEmitter();
	var isWin = /^win/.test(process.platform);
	var appDir = path.dirname(require.main.filename);

	var base = appDir + (isWin ? '\\vs\\workbench' : '/vs/workbench');

	var htmlFile = base + (isWin ? '\\electron-browser\\bootstrap\\index.html' : '/electron-browser/bootstrap/index.html');
	var htmlFileBack = base + (isWin ? '\\electron-browser\\bootstrap\\index.html.bak-customcss' : '/electron-browser/bootstrap/index.bak-customcss');
	
	var preloadFile = base + (isWin ? '\\electron-browser\\bootstrap\\preload.js' : '/electron-browser/bootstrap/preload.js');
	var preloadFileBack = base + (isWin ? '\\electron-browser\\bootstrap\\preload.js.bak-customcss' : '/electron-browser/bootstrap/preload.bak-customcss');

	function editFiles() {
		
		try {
			// update html to load css 
			var html = fs.readFileSync(htmlFile, 'utf-8');
			html = html.replace(/<!-- !! VSCODE-CUSTOM-CSS-START !! -->[\s\S]*?<!-- !! VSCODE-CUSTOM-CSS-END !! -->/, '');
			html = html.replace(/(<\/html>)/,
				'<!-- !! VSCODE-CUSTOM-CSS-START !! -->' + indicatorCSS + '<!-- !! VSCODE-CUSTOM-CSS-END !! --></html>');
			fs.writeFileSync(htmlFile, html, 'utf-8');

			// update preload file
			var preload = fs.readFileSync(preloadFile, 'utf-8');
			preload = preload.replace(/c.body.className="glitch /, 'c.body.className="');
			preload = preload.replace(/c.body.className="/, 'c.body.className="glitch ');
			fs.writeFileSync(preloadFile, preload, 'utf-8');
			enabledRestart();

		} catch (e) {
			vscode.window.showInformationMessage(msg.admin);
			return;
		}
    }
    
	function restore() {
		try {
			// restore html to load css 
			var html = fs.readFileSync(htmlFile, 'utf-8');
			html = html.replace(/<!-- !! VSCODE-CUSTOM-CSS-START !! -->[\s\S]*?<!-- !! VSCODE-CUSTOM-CSS-END !! -->/, '');
			html = html.replace(/<body class="glitch /, '<body class="');
			fs.writeFileSync(htmlFile, html, 'utf-8');

			// restore preload file
			var preload = fs.readFileSync(preloadFile, 'utf-8');
			preload = preload.replace(/c.body.className="glitch /, 'c.body.className="');
			fs.writeFileSync(preloadFile, preload, 'utf-8');
			enabledRestart();

		} catch (e) {
			vscode.window.showInformationMessage(msg.admin);
			return;
		}
	}

	function reloadWindow() {
		// reload vscode-window
		vscode.commands.executeCommand("workbench.action.reloadWindow");
	}

	function enabledRestart() {
		vscode.window.showInformationMessage(msg.enabled, { title: msg.restartIde })
			.then(function (msg) {
				reloadWindow();
			});
	}

	function disabledRestart() {
		vscode.window.showInformationMessage(msg.disabled, { title: msg.restartIde })
			.then(function (msg) {
				reloadWindow();
			});
	}

	function enableGlitch(){
		editFiles();
	}

	function disableGlitch(){
		restore();
	}

	var enableGlitch = vscode.commands.registerCommand('extension.enableGlitch', enableGlitch);
	var disableGlitch = vscode.commands.registerCommand('extension.disableGlitch', disableGlitch);

	context.subscriptions.push(enableGlitch);
	context.subscriptions.push(disableGlitch);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { 
	restore();
}
exports.deactivate = deactivate;