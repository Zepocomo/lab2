class SpaceStation_on_orbit extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('spaceStations_on_orbit')
      this.fields = this.fields.concat(['name', 'number'])
    }
    Delete (id) {
      super.Delete(id)
    }
  }
  