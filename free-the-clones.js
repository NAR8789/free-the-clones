new Vue({
  el: '#free-the-clones',
  data: {
    pebbles: [[true], [true,true]]
    // true for pebble, false for no pebble.
    // pebble at [i][j] will have children at [i+1][j] and [i+1][j+1]
    /** ________ ________ ________ ________                   ________ ________
     * [       ][       ][       ][       ]                  [       ][       ]
     * [  0,0  ][  1,1  ][  2,2  ][  3,3  ]   ...            [  j,j  ][j+1,j+1]
     * [_______][_______][_______][_______]                  [_______][_______]
     * [       ][       ][       ]                  [       ][       ]
     * [  1,0  ][  2,1  ][  3,2  ]   ...               ...      ...
     * [_______][_______][_______]                  [       ][       ]
     * [       ][       ]                  [       ][       ]
     * [  2,0  ][  3,1  ]   ...               ...      ...
     * [_______][_______]          ________[_______][       ]
     * [       ]                  [       ][       ]
     * [  3,0  ]   ...            [  j,i  ][j+1,i+1]
     * [_______]                  [_______][_______]
     *                   [       ][       ]
     *    ...               ...  ][j+1,i  ]
     *           ________[       ][_______]
     *          [       ][       ]
     *          [  j,1  ]   ...
     *  ________[_______][       ]
     * [       ][       ]
     * [  j,0  ][j+1,1  ]
     * [_______][_______]
     * [       ]
     * [j+1,0  ]
     * [_______]
     */
  },
  computed: {
    board: function() {
      return _.zip.apply(_,
        _.zip.apply(_, this.pebbles).
          map(col => col.filter(sq => typeof sq === 'boolean' ))
      )
      // it's a little weird that this works... in brief, if we look at the pebbles array as a representation
      // of a standard square grid everything stays in the same column but gets bottom-aligned. (each column
      // gets padded from above with undefined spaces, until the triangle sits in the lower left corner instead
      // of the upper left)
      //
      // So, we can "fix" this into something displayable by truncating the undefined spaces from above. intuitively,
      // we want `pebbles.transpose.map(?.compact).transpose`, but...
      // - instead of `?.transpose` we use `_.zip.apply(_, ?)`
      // - instead of `?.compact` we use `?.filter(...blah...)` (there is a `_.compact`, but this removes all falsey)
    }
  }
})
