# OpenMFD
OpenMFD is a fully-functional Multi-Function Display which can be used independently or as the screen for human interface devices like the Thrustmaster Cougar MFDs. It is intended for users to easily create new profiles through use of a declarative JSON definition for profiles, pages, and button functionality. It is cross-platform by virtue of relying on NodeJS's Electron framework for desktop applications. It was originally a fork of the OpenCDU project. 

## Installation
Install the NodeJS and NPM (Node Package Manager) appropriate for your operating system. 
Download the source via git or ZIP file. Navigate to that directory and run 
    
    npm install
    
## Running the application
    npm start

You can run as many instances of the MFD as you want (I run at least two).

## Editing profiles
### Sample profile
The sample profile profiles/tie_fighter.json is provided as a starting point. 

### Grid system
The MFD screen is layed out in a grid of 7 columns (x value) and rows (y value). Button labels are anchored to their appropriate button and other elements can be positioned anywhere in the x, y ranges 1 - 6.

### Buttons
Since the UI is meant to interoperate with the Thrustmaster Cougar MFDs, I used TM's unusual designation for the buttons. It starts at the top left corner and increments in a clockwise direction: 
Top Row:
- OSB01
- OSB02
- ...
- OSB05 

Right Column:
- OSB06
- ...
- OSB10

Bottom Row (Right to Left)
- OSB11
- ...
- OSB15

Left Column (Bottom to Top)
- OSB16
- ...
- OSB20

## Implementation and extension
I used FabricJS for manipulating the objects on the canvas and lodash for functional programming and other utility functions. 

