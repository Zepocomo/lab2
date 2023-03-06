class SpaceStation_on_orbit extends BaseModel {
  constructor () {
    super('spaceStations_on_orbit')
    this.fields = this.fields.concat([Name])
  }
  
  Delete (id) {
    super.Delete(id)
  }
}