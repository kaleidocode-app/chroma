<div align="center">

<img align="center" height="50" src="https://user-images.githubusercontent.com/35271042/62403727-34380180-b544-11e9-844a-6fe8d3779c4d.png" />
<hr>
A Figma plugin for creating bulk color styles from selection

<img align="center" height="400" src="https://user-images.githubusercontent.com/35271042/62403691-fd61eb80-b543-11e9-821d-b38e240cff17.png" />

</div>

## How to use
Simply select any objects that have a fill color, run the plugin, and it will generate the color styles for you automatically. 

The color style name will be the same as your layer name. You can also add a "/" in your layer name to create color style groups.

## Building from source
This plugin template uses Typescript. If you are familiar with Javascript, Typescript will
look very familiar. In fact, valid Javascript code is already valid Typescript code.

Typescript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using Typescript requires a compiler to convert Typescript (code.ts) into Javascript (code.js)
for the browser to run.

To get the TypeScript compiler working:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Install the TypeScript compiler globally: `sudo npm install -g typescript`.
3. Open this directory in Visual Studio Code.
4. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
    then select "tsc: watch - tsconfig.json". You will have to do this again every time
    you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
