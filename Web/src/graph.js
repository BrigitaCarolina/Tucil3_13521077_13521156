function graphVisual(marker, adjmatrix, path, id) {
    let container;
    if (id == 1) {
        container = document.getElementById('map');
    } else {
        container = document.getElementById('map2');
    }
    // Create a new vis.Network instance
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();
    let tint;

    for (let i = 0; i < marker.length; i++) {
        if (path.indexOf(i) >= 0) {
            tint = 'lightsalmon';
        } else {
            tint = 'lightblue';
        }
        nodes.add({ id: i, label: marker[i].title, color: tint });
    }

    for (let i = 0; i < marker.length; i++) {
        for (let j = i; j < marker.length; j++) {
            if (adjmatrix[i][j] > 0) {
                if (path.indexOf(j) == (path.indexOf(i) + 1) && path.indexOf(j) >= 0 && path.indexOf(i) >= 0) {
                    tint = 'lightsalmon';
                } else {
                    tint = 'lightblue';
                }
                edges.add({ from: i, to: j, label: adjmatrix[i][j].toString(), color: tint });
            }
        }
    }

    const data = { nodes: nodes, edges: edges };
    const options = {
        nodes: {
            shape: 'dot',
            size: 10,
            font: {
                size: 10,
            },
        },
        edges: {
            font: {
                size: 10,
            },
            width: 2,
        },
    };
    console.log("ngegraph")
    const network = new vis.Network(container, data, options);
}