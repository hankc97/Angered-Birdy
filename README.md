```
# Angered Birds
_________

Background
Angered Birds is a Projectile and Destruction game that includes real time physics and levels. Every level includes a preloaded world where an object is fired from a static point to destroy the enemy objects to gain points and stars. 


MVP & Functionality
* Start and Restart Game 
* Initial State of pigs to be alive then dead, Initial State of Bird pre launch and launch
* 3 main objects with physical properties ( bird, pig, block)
* Properties: x pos, y pos, velX, velY, gravity, friction, accX, accY, restitution(bounce), mass
* All objects respond to collision and response
* Local Storage for score and highscore
* Projectile Launch objects

Architecture and Technologies
* Canvas to display graphics and interactions
* Node for game logic interactions
* firebase to store points and game logic
Scripts
* Canvas.js: Handles Boundaries / Platform and background image 
* Game.js: Handles kickoff and main update loop logic
* Bird.js: Stores state of bird, and collision detection of bird between objects
* Pig.js: Stores state of pig, and collison between pig and objects
* block.js: Stores state of block, and collison between block and objects
* projectile.js: Stores functionality game logic for launching bird
* score.js: handles score display and storage
* level.js: stores different levels and x, y coords of objects on map (bonus)

TimeLine
Day 1) Implement bird / pig / block collision logic
Day 2) Implement projectile launch logic and object collision logic
Day 3) Add Start and Restart Game / Ability to turn on and off sounds
Day 4) Add sprites and animations to all objects

WireFrames
https://wireframe.cc/bsL1j9


```
