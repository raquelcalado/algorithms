var graph = {
    '0': { '1': 2, '4': 3 },
    '1': { '0': 2, '3': 8, '5': 9, '6': 6 },
    '2': { '5': 3, '6': 7 },
    '3': { '1': 8, '7': 6 },
    '4': { '0': 3, '6': 5, '7': 9 },
    '5': { '1': 9, '2': 3, '6': 4, '7': 5 },
    '6': { '1': 6, '2': 7, '4': 5, '5': 4 },
    '7': { '3': 6, '4': 9, '5': 5 },
};

function dijkstra(graph, s) {
    var solutions = {};
    solutions[s] = [];
    solutions[s].cost = 0;
    
    while(true) {
      var parent = null;
      var node = null;
      var cost = Infinity;
      
      for(var n in solutions) {

        if(!solutions[n]) continue

        var ndist = solutions[n].cost;
        var adj = graph[n];

        for(var a in adj) {
          if(solutions[a]) continue;

          var d = adj[a] + ndist;

          if(d < cost) {
            parent = solutions[n];
            node = a;
            cost = d;
          }
        }
      }

      if(cost === Infinity) break;

      solutions[node] = parent.concat(node);
      solutions[node].cost = cost;

    }

    return (solutions);

  }
  
  var startingPoint = '0';
  var solutions = dijkstra(graph, startingPoint);

  for(var s in solutions) {
    (solutions[s]).unshift(startingPoint)
    if(!solutions[s]) continue;
    console.log("Vertex, Cost, Path -> " + s + ", " + solutions[s].cost + ", " + solutions[s].join("-"));
  }
