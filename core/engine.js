// Engine
import * as BABYLON from "@babylonjs/core";
const { Engine: noaEngine } = require("noa-engine");
//import { Engine as noaEngine } from "noa-engine";

// Files
import "./utils/state.min.js";
import { config } from "../config/config";
import generateWorld from "./world.js";
import { Player } from "./player";
import { Unit } from "./unit";
import { Entity } from "./entity.js";
import * as components from "../config/components.json";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

global.Mesh = Mesh;

var box = class Engine extends Entity {
  constructor() {
    super();
    this.noa = new noaEngine(config);
    this.noa.inputs.disabled = true // disable default player input built-in noa

    this.entities = {};
    this.box = this;
    if (window === undefined) {
      this.isClient = false;
      this.isServer = true;
    } else {
      this.isClient = true;
      this.isServer = false;
    }
  }
  start() {
    console.log("starting the noa engine...");

    // Generate the world
    generateWorld(this.noa);
    const scene = this.noa.rendering.getScene();

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
  }
  loadComponents() {
    for (let key of Object.keys(components)) {
      console.log(key + " -> " + components[key]);
      // ... and putting modules inside global object
      //loading json data
      if (key === "ControlComponent") {
        const { ControlComponent } = require("" + components[key].toString());
        global[key] = ControlComponent;
      }
      // modulesComponent.push(require(components[key]));
    }
  }
  engineStep() {
    if (global.isServer) {
      this.serverNetworkComponent.createSnapshot(this.body);
    }
  }
  createEntity(entityType, data) {
    const { id, position } = data;
    switch (entityType) {
      case "unit":
        let unit = new Unit();
        this.unit.createBody(id, position);
        this.entities[id] = unit;
      case "player":
        let player = new Player(id, this.noa);
        this.entities[id] = player;
        break;
      case "item":
        let item = new Item();
        this.entities[item.id()] = item;
        break;
      case "projectile":
        let projectile = new Projectile();
        this.entities[projectile.id()] = projectile;
        break;
    }
  }
  destroyEntity(entityId) {
    delete this.entities[entityId];
  }
};

/**
 //player
const playerEvent = new Player(noa, player);
// init event listener
playerEvent.playerEvent();
 */

/*

// Client side server logic for socket
export const socket = io("http://localhost:3000");
socket.on("connect", () => {
  // Logging out offline players
  socket.on("removePlayer", removePlayerEvent);
  // Listening for player movement change
  socket.on("players", playersEvent);
  // Listening for new block creation
  socket.on("createBlock", createBlockEvent);
  // Listening for new block deletion
  socket.on("removeBlock", removeBlockEvent);
  // Emit your your ID and your initial position to the server
  socket.emit("players", playersDataEvent(socket.id, [0, 10, 0]));
  socket.on("ballshoot", (position) => {
    console.log("ball shoot data", position);
    playerEvent.playerShootBall(position);
  });
});
**/

// Event listener for input of the user (createBlock, edit, movement)
//blockSelector(noa, socket);
