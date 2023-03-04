class SpaceStation extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('spaceStations')
    this.fields = this.fields.concat(['number', 'capacity','requirement'])
  }
  Delete (id) {
    super.Delete(id)
  }
}
