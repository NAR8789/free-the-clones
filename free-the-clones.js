new Vue({
  el: '#free-the-clones',
  data: {
    pebbles: [[true, true],
              [true]]
    // true for pebble, false for no pebble
  },
  computed: {
    board: function() {
      return this.pebbles.map(
        (row, i) => row.map(
          (hasPebble, j) => ({ location: [i,j], pebble: hasPebble })
        )
      )
    },
  },
  methods: {
    ensureSpace: function(i, j) {
      while(i >= this.pebbles.length) { this.pebbles.push([]) }
      while(j >= this.pebbles[i].length) { this.pebbles[i].push(false) }
    },
    clonePebble: function(i, j) {
      if (!this.pebbles[i][j]) { return }

      this.ensureSpace(i  , j+1)
      this.ensureSpace(i+1, j  )

      if (this.pebbles[i][j+1] || this.pebbles[i+1][j]) { return }

      this.pebbles[i  ].splice(j  , 1, false)
      this.pebbles[i+1].splice(j  , 1, true)
      this.pebbles[i  ].splice(j+1, 1, true)
      this.pebbles = this.pebbles
    }
  }
})
