const graph = {
      0: [],
      1: [],
      2: [1],
      3: [0],
      4: [],
      5: [3],
      6: [5, 2, 4],
      7: [5, 6],
  };

let loadedModules = [];

function main(graph){
    verifyException(graph);

    loadModulesWithoutDependency(graph)
    removeVisitedNodesofDependences(loadedModules);
    addNextItems(loadedModules, graph);

    console.log(loadedModules)
}
   
function loadModulesWithoutDependency(graph){
    Object.keys(graph).forEach(function(item){
        if(!graph[item].length) loadedModules.push(item);
    })
}

function removeVisitedNodesofDependences(loadedModules){
    loadedModules.forEach((item) => {
        Object.keys(graph).forEach(function(elem){
            if((graph[elem]).includes(item)){
                (graph[elem]).splice(graph[elem].indexOf(item), 1)
            }
        })
    });
}

function addNextItems(loadedModules, graph){
    Object.keys(graph).forEach(function(elem){
        if(!loadedModules.includes(elem)){
            loadedModules.push(elem)
        }
    });
}

function findCyclicException(graph, node) {

    let visited = [];
    var searchDependencies = function(currentNode) {

      if (visited.indexOf(currentNode) !== -1)  currentNode === node;   
      
      visited.push(currentNode);

      var found = graph[currentNode].some(searchDependencies);
      if (!found) visited.splice(visited.indexOf(currentNode), 1);
  
      return found;
    };
  }

function verifyException(graph){
    Object.keys(graph).forEach(function(item){
        if(graph[item].length > 0){
            const hasCyclic = findCyclicException(graph, graph[item][0])
            if(hasCyclic) throw new Error('Cyclic dependency detected', hasCyclic)
        }
    });
}

console.log(main(graph))