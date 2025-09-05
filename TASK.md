This task is to improve the implementation of the solveWhiteCross() function defined in
@src/solve_white_cross.ts. Its current implementation naively solves the green/white edge, then the
red/white edge, the the blue/white edge, then, finally, the orange/white edge. It also attempts to
solve them immediately into their final position. Both of these facts generally produce a suboptimal
sequence of moves, in terms of the number of moves required to solve the white cross. Fewer moves
can be achieved by adapting these two simplistic approaches. This task's goal is to do just that.

The first improvement is to pick the solving order of the edges intelligently, rather than blindly
solving the green/white edge first. For example, the orange/white edge may already be solved, or
simply require a single U move to move it into its final position. In this case it would be
suboptimal to solve the green/white edge first because it could move the orange/white edge out of
this convenient location.

The second improvement is to solve the edges relative to each other, rather than in their exact
final position. This can allow solving other edges in fewer moves and elimiates "positioning" moves
after solving each edge. Once all 4 edges are solved correctly relative to each other (that is, the
white face is a white cross) then a single U, U', or U2 move can orient the white face so that all
of its edges are solved into their final position.

Here is a description of the finite state machine of the algorithm:

State sak4r: The cube is in an unknown state.

- Count the number of white edges present on the white face (between 0 and 4).
  - If 0: Go to state sb2nd.
  - If 1: Go to state sc4wf.
  - If 2: Go to state sdhjx.
  - If 3: Go to state sefr6.
  - If 4: Go to state sfyh8.

State sb2nd: There are 0 white edges present on the white face.

- Count the number of white edges in the middle row of the cube.
- If not 0:
  - Pick one of the counted edge pieces at random. Call this piece "pwgvn".
  - [lgf64] Move piece pwgvn using 1 move so that the white sticker is on the white face.
  - Go to state sak4r.
- Count the number of white edge stickers on the yellow (down) face.
- If not 0:
  - Pick one of the counted edge pieces at random. Call this piece "pnwpt".
  - Go to label [lgf64], using pnwpt as the value for pwgvn.
- Assert that all of the remaining white edges have their white sticker either in the top row
  or the bottom row.
- Pick one of the asserted white edge pieces at random.
- Move that piece using 2 moves so that the white sticker is on the white face.
- Go to state sak4r.

State sc4wf: There is 1 white edge present on the white face.

- Count the number of white edges in the middle row of the cube.
- If not 0:
  - Pick one of the counted edge pieces at random. Call this piece "pzc9f".
  - [lcvgk] Determine (but do not execute) the move that would put the white sticker of pzc9f on
    the white face. Call this move "mxqah".
  - Perform a U, U', or U2 move, if required, to orient the white face such that, after performing
    the move mxqah, the pzc9f edge will be in the solved position relative to the already-solved
    white edge on the white face.
  - Perform the move pzc9f.
  - Go to state sak4r.
- Count the number of white edge stickers on the yellow (down) face.
- If not 0:
  - Pick one of the counted edge pieces at random. Call this piece "pcxtm".
  - Go to label [lcvgk], using pcxtm as the value for pzc9f.
- Count the number of white edge stickers on top row facing outwards (i.e. NOT on the white/up
  face).
- If not 0:
  - Pick one of the counted edge pieces at random. Call this piece "pfhy9".
  - Perform a single move to put the white sticker of pfhy9 into the middle row.
  - Go to label [lcvgk], using pfhy9 as the value for pzc9f.
- Assert that all of the unsolved white edges have their white sticker in the bottom row facing
  outwards (i.e. NOT on the yellow/down face).
- Count the number of asserted pieces that are NOT in the same column as the already-solved white
  edge. Assert that this count is greater than 1 (otherwise we wouldn't be at this step).
- Pick one of the counted edge pieces at random. Call this piece "pbt77".
- Choose (but do not execute) a move that would put the white sticker of pbt77 into the middle
  row. Call this move "mpzfs".
- Go to label [lcvgk], using pbt77 as the value for pzc9f.
