class Planet extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('planets')
      this.fields = this.fields.concat(['name', 'storage_capacity','mass'])
    }
    Delete (id) {
      super.Delete(id)
    }
  }
  