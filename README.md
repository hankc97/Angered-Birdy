
# Angered Birds
======
[Live Website](https://hankc97.github.io/Angered-Birdy/)

### Features
------
* Each Object on the canvas has their own real-life physical properties such as mass, velocity, friction, gravity, torque. NO PREBUILT GAME ENGINE.
* Each Object has properties of collision such as bird on pig and bird on block detection.
* Ability to create a stage with ease. Every object has adjustable properties so positioning them or changing their shape can be done with a simple key value pair relationship.
* Ability to reset and increase stages of all entities when the round is won or loss.
* Dynamic Bird Launching, as any object can be launched from the sling shot and the magnitude/angle of launch can be adjusted for a further or shorter shot.
* Use Local Storage to store current and previous best highscore inside the client browser. 
* Implemented Timer Animations as each object has state.

### Background
------
Angered Birds is a Projectile and Destruction game that includes real time physics and levels. Every level includes a preloaded world where an object is fired from a static point to destroy the enemy objects to gain points and stars. 
--This project was built in 2 weeks with no prebuilt game engine

### Technologies
------
Packaging
* Webpack
UI / Styling
* SASS
Logic / Display
* Vanilla Javascript
* Canvas (no game engine)

### WireFrames / Website Structure
------
![wireframe](https://user-images.githubusercontent.com/70183272/119266785-212f6f00-bbba-11eb-84da-859c62236452.png)
1) Game.js will kick off game recursive loop to load entities
2) StageLoader will take in key, value pairs to load all starting positions of objects and highscore
3) Each Object pig, block, and bird will load their constructor properties first to display all object locations prelaunch
4) The Projectile Object will load the bird type and wait for the player to launch the bird
5) Once properties are loaded, the update and render cycle will be triggered for each property, constantly checking for collision detection and movement based off bird launch
6) The cycle will run continuosly until the player has run out of birds or the field has run out of pigs which will trigger a stage reset or stage advancement

### Website Features
------
## Launching with Bird Collision and Physical Properties
The Bird can be adjusted based off the pull for its magnitude and angle. The further it pulled back the further the bird will go based off the magnitude. 
Once the bird collides with the bird, it will gain points and cause the pig to enter a "dead" state which would enable the animation

![](https://media0.giphy.com/media/wsmfIv9TPA9tdURNyi/giphy.gif?cid=790b7611243d16285e4591c433708976e6aef4c791cd02d6&rid=giphy.gif&ct=g)

## Different Stages and Stage loss / win detection
Ability to advance to the next stage when all the pigs are in their 'dead' state.
![](https://media0.giphy.com/media/FnMgnary56SGBb1joo/giphy.gif?cid=790b7611f684c9f3cb8f27131cde1e10cf7e7493a7a65bd0&rid=giphy.gif&ct=g)




