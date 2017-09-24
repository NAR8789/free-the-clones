new Vue({
  el: '#free-the-clones',
  data: {
    pebbles: [[true], [true,true]]
    // true for pebble, false for no pebble.
    // pebble at [i][j] will have children at [i+1][j] and [i+1][j+1]
    /** ________ ________ ________ ________                   ________ ________
     * [       ][       ][       ][       ]                  [       ][       ]
     * [  0,0  ][  1,1  ][  2,2  ][  3,3  ]   ...            [  i,i  ][i+1,i+1]
     * [_______][_______][_______][_______]                  [_______][_______]
     * [       ][       ][       ]                  [       ][       ]
     * [  1,0  ][  2,1  ][  3,2  ]   ...               ...      ...
     * [_______][_______][_______]                  [       ][       ]
     * [       ][       ]                  [       ][       ]
     * [  2,0  ][  3,1  ]   ...               ...      ...
     * [_______][_______]          ________[_______][       ]
     * [       ]                  [       ][       ]
     * [  3,0  ]   ...            [  i,j  ][i+1,j+1]
     * [_______]                  [_______][_______]
     *                   [       ][       ]
     *    ...               ...  ][i+1,j  ]
     *           ________[       ][_______]
     *          [       ][       ]
     *          [  i,1  ]   ...
     *  ________[_______][       ]
     * [       ][       ]
     * [  i,0  ][i+1,1  ]
     * [_______][_______]
     * [       ]
     * [i+1,0  ]
     * [_______]
     */
  },
  computed: {
    squaresWithLocations: function() {
      return this.pebbles.map(
        (diag, i) => diag.map(
          (hasPebble, j) => ({ location: [i,j], pebble: hasPebble })
        )
      )
    },
    board: function() {
      return _.zip(
        ..._.zip(...this.squaresWithLocations).
          map(col => _.compact(col))
      ).map(row => _.compact(row))
      // it's a little weird that this works... in brief, if we look at the pebbles array as a representation
      // of a standard square grid everything stays in the same column but gets bottom-aligned. (each column
      // gets padded from above with undefined spaces, until the triangle sits in the lower left corner instead
      // of the upper left)
      //
      // So, we can "fix" this into something displayable by truncating the undefined spaces from above. intuitively,
      // we want `pebbles.transpose.map(?.compact).transpose`, but...
      // - instead of `?.transpose` we use `_.zip(...?)`
      // - instead of `?.compact` we use `_.compact(?)`
      // - we compact one more time at the end, because the last zip adds trailing undefineds
    }
  },
  methods: {
    clonePebble: function(i, j) {
      while (i >= this.pebbles.length) {
        this.pebbles.push(new Array(this.pebbles.length + 2).fill(false))
      }
      if (!this.pebbles[i, j]) { return }
      if (this.pebbles[i+1, j] || this.pebbles[i, j+1]) { return }
      this.pebbles[i  , j  ] = false
      this.pebbles[i+1, j  ] = true
      this.pebbles[i  , j+1] = true
    }
  }
})
