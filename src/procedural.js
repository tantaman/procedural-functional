const {intersect} = require('./stdLib');
/*
const tile = {
  edges: {
    top:
  },
};
*/

type ImagePath = string;

type Side = 'top' | 'left' | 'bottom' | 'right';
type EdgeType = 'water' | 'underground' | 'sky' | 'land_surface' | 'water_surface';

type Tile = $ReadOnly<{
  edges: $ReadOnly<{
    top: Edge,
    left: Edge,
    bottom: Edge,
    right: Edge,
  }>,
  image: ImagePath,
}>;

// Edge would need to be an interface because whether or not it connects with another edge is mosty
// easily modeled and best organized as a method. If the connection logic was separate than how could we
// pull new edge types into our system?
// Hmm data edges with a function to `getPartner` may be better as we can have a set of rules for edges that govern pairing
// and a registry of available edges... to see which ones meet that pairing.
// Well registry of edge types...
type Edge = $ReadOnly<{
  type: EdgeType,
}>;

type TileMap = $ReadOnly<{
  [key: EdgeType]: $ReadOnly<{
    [key: Side]: $ReadOnlyArray<Side>,
  }>,
}>;

// We need new in memory storage that has a different concept of identity. Nominal identity -- same name over time but the concrete named changes -- with a link to its concrete instances over time.
// Nominal identity vs Structural identity.
// Nominal typing vs structural typing.

// Nomnial identity is that the named thing is always the same thing when recalled by that name even though its particular attributes might change over time.
// The James river is always the James river even though its banks and volume might shift. Some general properties always hold for nominal identities/
// When does a nominal identity break? When some essential characteristics no longer hold.
// Could man think without using nominal identities? If we had no nomnial identity for the james river then how would you and I know we are both talking about the same river?
// How would we name it? But are we, even with nominal identity, ever actually talking about the same river? We both call it the James but our particular knowledge of the James
// is based on our point in time experience of it.
// Without nomnial identity we couldn't tell someone to ship a thing down the James or speak of the average depth of the James or the speed of the James during a particular season.
// Nominal identities let us collect observations over time and attribute them to that identity.
// We rarely need recourse to exact instances at exact moments in time. But a simulation very much needs to know of exact instances at exact moments in time and even more so
// if it needs to reverse or inspect a past event. Or if history should bear influence over subsequent events. Well shouldn't that history be implicitly captured at all times in the
// current state of the system at any snapshot in time? Not if the system includes a reasoning being that can look at the past? Well do we look at the past or just artifacts in the present
// that represent moments in the past.

function generateTile(neighborOne: [Side, Tile], neighborTwo: [Side, Tile]): Tile {
  // 1. pick random tiles until one fits with left and bottom
  // 2. intersect getTiles(getPartners(leftNeighbor->edges->right)) with getTiles(getPartners(bottomNeighbor->edges->top))
  return intersect(
    getTilesFor(
      getPartnersFor(
        neighborOne[1].edges[mirror(neighborOne[0])],
      ),
    ),
    getTilesFor(
      getPartnersFor(
        neighborTwo[1].edges[mirror(neighborTwo[0])],
      ),
    ),
  );
}

function mirror(side: Side): Side {
  return ({
    left: 'right',
    top: 'bottom',
    right: 'left',
    bottom: 'top',
  })[side];
}

function getTilesFor(tileMap: TileMap, edge: Edge, side: Side): $ReadOnlyArray<Tile> {
  // look up available tiles that have the given edge on the given side
  return tileMap[edge][side];
}

function getPartnersFor(edge: Edge): $ReadOnlyArray<Edge> {
  // edges can only be paired with themselves at the moment
  return [edge];
}

function loadTileMap(directory: string): TileMap {
  // read the directory
  // parse the tile file names which will encode the edges and sides
}

// Need the current state of the screen?
// Need an orientation?
// Start generating at a given corner?
function generateScreen(): Screen {

}

module.exports = {
  mirror,
  getTilesFor,
  getPartnersFor,
  loadTileMap,
  generateScreen,
  generateTile,
};
