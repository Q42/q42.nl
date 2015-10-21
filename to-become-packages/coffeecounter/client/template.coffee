Template.numCupsOfCoffee.helpers
  numCupsOfCoffee: ->
    d = new Date()
    d.setUTCHours(0,0,0,0)
    CoffeeCounter.find(
      {
        published_at: { $gte: d.toISOString() },
        location: "q020"
      }
    ).count()
