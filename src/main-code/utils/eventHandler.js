import { diamond, gold, tree, dirt } from "./textures";
import { filterData } from "./filterData";

import { io } from "socket.io-client";

const eventPlayer = (noa) => {
  const socket = io("http://localhost:3000");

  const build = [];
  // Event handlers
  const waterEvent = document.querySelector(".game_build-water");
  const blocksEvent = document.querySelector(".game_build-blocks");
  const pauseEvent = document.querySelector(".game_build-pause");
  const goldEvent = document.querySelector(".game_build-gold");
  const diamondEvent = document.querySelector(".game_build-diamond");
  const dirtEvent = document.querySelector(".game_build-dirt");

  //register texture in memory
  noa.registry.registerMaterial("tree", null, tree);
  noa.registry.registerMaterial("dirt", null, dirt);
  noa.registry.registerMaterial("gold", null, gold);
  noa.registry.registerMaterial("diamond", null, diamond);

  // Save texture inside register Block
  const waterID = noa.registry.registerBlock(1, { material: "water" });
  const blocksID = noa.registry.registerBlock(2, { material: "grass" });
  const goldID = noa.registry.registerBlock(3, { material: "gold" });
  const diamondID = noa.registry.registerBlock(4, { material: "diamond" });
  const dirtID = noa.registry.registerBlock(5, { material: "dirt" });

  // Player Event on keyborad or mouse click
  dirtEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(dirtID, pos[0], pos[1], pos[2]);
        filterData(build, { dirt: [pos[0], pos[1], pos[2]] }, "dirt")
          ? build.push({ dirt: [pos[0], pos[1], pos[2]] })
          : "";
      }
    });
  });
  diamondEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(diamondID, pos[0], pos[1], pos[2]);
        filterData(build, { diamond: [pos[0], pos[1], pos[2]] }, "diamond")
          ? build.push({ diamond: [pos[0], pos[1], pos[2]] })
          : "";
      }
    });
  });
  goldEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(goldID, pos[0], pos[1], pos[2]);
        filterData(build, { gold: [pos[0], pos[1], pos[2]] }, "gold")
          ? build.push({ gold: [pos[0], pos[1], pos[2]] })
          : "";
      }
    });
  });
  waterEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(waterID, pos[0], pos[1], pos[2]);
        socket.emit("build", { data: { water: [pos[0], pos[1], pos[2]] } });
      }
    });
  });
  blocksEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(blocksID, pos[0], pos[1], pos[2]);
        filterData(build, { block: [pos[0], pos[1], pos[2]] }, "block")
          ? build.push({ block: [pos[0], pos[1], pos[2]] })
          : "";
      }
    });
  });
  let paused = false;
  pauseEvent.addEventListener("click", () => {
    paused = !paused;
    noa.setPaused(paused);
  });
  noa.inputs.down.on("alt-fire", () => {
    if (noa.targetedBlock) {
      let pos = noa.targetedBlock.position;
      noa.setBlock(0, pos[0], pos[1], pos[2]);
    }
  });
};

export default eventPlayer;
