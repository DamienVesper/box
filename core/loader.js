import * as components from "../config/components.json";

// Getting data from json
var loading = {};
for (let elem in components) {
  typeof components[elem] === "string"
    ? (loading[elem] = components[elem])
    : "";
    console.log('loading', components[elem]);
}



// Loading modules from component data
var loadedComponents = {};
for (let elem in loading) {
  loadedComponents[elem] = require(loading[elem] + "").default;
  console.log('load', loadedComponents[elem]);
}


// Loading all component in components.json file
export { loadedComponents };
