@echo off
setlocal
set NODE_PATH=C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Microsoft\VisualStudio\NodeJs
set NODE_EXE=%NODE_PATH%\win-x64
set NPM_CLI_JS=%NODE_PATH%\node_modules\npm\bin\npm-cli.js
set Path=%Path%;%NODE_EXE%
"%NODE_EXE%\node.exe" "%NPM_CLI_JS%" %*
endlocal
