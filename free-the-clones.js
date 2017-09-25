import Vue from 'vue'

new Vue({
  el: '#free-the-clones',
  data: {
    pebbles: [[true, true ],
              [true, false]]
    // true for pebble, false for no pebble
  },
  computed: {
    board: function() {
      return this.pebbles.map(
        (row, i) => row.map(
          (hasPebble, j) => ({
            location: [i,j],
            pebble: hasPebble,
            clonable: this.clonable(i, j),
          })
        )
      )
    },
  },
  methods: {
    clonePebble: function(i, j) {
      if (!this.clonable(i, j)) { return }

      this.ensureSpace(i  , j+1)
      this.ensureSpace(i+1, j  )
      this.ensureSpace(i+1, j+1) // hack for double borders fix

      this.setPebble(i  ,j  , false)
      this.setPebble(i+1,j  , true)
      this.setPebble(i  ,j+1, true)
    },
    setPebble: function(i, j, hasPebble) {
      this.pebbles[i].splice(j, 1, hasPebble)
      // workaround for vue not picking up updates to nested arrays
    },
    hasPebble: function(i, j) {
      return this.pebbles[i] && this.pebbles[i][j]
    },
    clonable: function(i, j) {
      return this.hasPebble(i,j) &&
        !this.hasPebble(i  , j+1) &&
        !this.hasPebble(i+1, j  )
    },
    ensureSpace: function(i, j) {
      while(i >= this.pebbles.length) { this.pebbles.push([]) }
      while(j >= this.pebbles[i].length) { this.pebbles[i].push(false) }
    },
  }
})
