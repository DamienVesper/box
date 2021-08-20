import { Entity } from "./entity";

export class Player extends Entity {
  constructor(data) {
    super();
    this.name = data.name;
    this.clientId = undefined; // socketId
    this.type = 'player';

    //console.log("global", global.ControlComponent);
    if (BOX.isServer) {
      // add other player controls
    } else {
      this.addComponent("ControlComponent");
    }
  }
  
  createUnit() {
    let unit = new BOX.Unit({ownerPlayer: this});
  }

  tick() {
    super.tick(); // call Entity.tick()
    console.log("this isn't running")
  }
}
