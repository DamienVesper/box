// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine as noaEngine } from "noa-engine";
import { Mesh as noaMesh } from "@babylonjs/core/Meshes/mesh";
import config from "../config/config.json";
import { movementComp } from "../core/components/movement";
import SaveMapButton from "./components/editor/ui/mapSaver";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import { Entity } from "./entity.js";

export class Engine extends Entity {
  constructor() {
    super();
    this.noa = new noaEngine(config);
    this.noa.inputs.unbind("forward");
    this.noa.inputs.unbind("left");
    this.noa.inputs.unbind("backward");
    this.noa.inputs.unbind("jump");
    this.noa.inputs.unbind("right");
    this.Mesh = noaMesh;
    this.entities = {};
    this.myPlayer;
  }
  start() {
    console.log("starting the noa engine...");

    // Generate the world
    generateWorld();

    const scene = this.noa.rendering.getScene();

    this.noa.camera.sensitivityX = 5;
    this.noa.camera.sensitivityY = 5;

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );

    BOX.inputs.bind("move-up", "W", "<up>");
    BOX.inputs.bind("move-left", "A", "<left>");
    BOX.inputs.bind("move-down", "S", "<up>");
    BOX.inputs.bind("move-right", "D", "<left>");
    BOX.inputs.bind("jump", "<space>");
    BOX.inputs.bind("change-material", "P", "<left>");
    BOX.inputs.bind("add-block", "L", "<left>");
    BOX.inputs.bind("remove-block", "K", "<left>");

    // setting the player Unit as main unit
    this.myPlayer = new BOX.Player({
      name: "john",
    });
    this.myPlayer.createUnit();

    // run unit ticks
    //unit.tick();
  }

  loadMap(mapData) {}

  engineStep() {
    if (global.isServer) {
      this.serverNetworkComponent.createSnapshot(this.body);
    }
  }

  entityTick(dt, states) {
    for (let elem in states) {
      let noaEntityId = states[elem].__id;
      let body = BOX.Engine.noa.entities.getPhysicsBody(noaEntityId);
      let boxEntity = body.boxEntity;
      if (boxEntity) {
        boxEntity.tick(dt, states);
      }
    }
  }

  destroyEntity(entityId) {
    delete this.entities[entityId];
  }
}

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
