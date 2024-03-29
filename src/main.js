////////////////////////////////////////////////////////////////////////////////////
// Developed by Nathan Ma, Sam Nguyen, Victor Chung
// Published by Abomination
////////////////////////////////////////////////////////////////////////////////////

"use strict";

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 30;

let config = {
  type: Phaser.AUTO,
  title: "Junk Rat",
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 960,
      height: 1024,
  },
  physics: {
    default: 'arcade',
    arcade:{
      fps: 240,
      gravity: {y: 1500},
      checkCollision: {
        up: false
      },
      debug: false
  },
  pixelArt: true
  },
  scene: [Load, Menu, Controls, Option, Play, Credits, GameOver, GameEnd]
};

let game = new Phaser.Game(config);

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER, keySPACE, keyESC;
let bgMusic;
let songList;
let nextSong;
let volPt = 20;
let sfxPt = 20;
let collisionDebug = false;
let maxVolume = 100;