# Pagenodes Extras

This library is being built to create a set of modules to be included in pagenodes.  This means that you can create any kind of modules you want at ease or configure pagenodes however you would like!

### Current Configuration

Think of pagenodes as an engine and these modules as the tie in for its building. This is the proprietary drivers of pagenodes.

### File Layout

* ** index.js **

Use this file for bundling your project together, used as an entry point for variables from the rest of the files in the future.

* ** modules.js **

This is a file that injects the specifics of modules into pagenodes.  It is included in `/src/red/nodes/loader.js`.

* ** cachedNodeFiles.js **

This provides the UI with a list of the modules actually loaded and what their names are. It is required in /src/red/nodes/registry/localfilesystem.js

* ** /modules/ **

These modules will be included in `/src/editor/main.js`. We want to call these using `/src/editor/main.js`.

* ** /nodes/ **

This is the main area of creation of a node.  It currently contains an html and corresponding javascript file.  The html file is a simple registry and howto for the right panel in the editor.  The javascript is the actual functionality of the node.

* ** /nodeDefs **

This file holds the JS functionality of the UI and what the nodes actually look like.  It currently has an html and js file side; however the javascript is the only one in usage.  This file is the UI creation of the actual node, color, inputs etc.  This is all then included by the `modules.js` in this directory.


