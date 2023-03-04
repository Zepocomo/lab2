class BaseModel {// eslint-disable-line no-unused-vars
  constructor (collectionName) {
    this.collectionName = collectionName
    this.fields = ['id']
  }
  /**
   * @returns {Number}
   */
  getNextId (collection) {
    return collection.length + 1
  }
  /**
   * @returns {Object}
   */
  GetEmpty () {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }
  /**
   * @returns {Array}
   */
  Select () {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }
  Commit (collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }
  /**
   * @param {Number} id
   * @returns {BaseModel|undefined}
   */
  FindById (id) {
    return this.Select().find(item => item.id === id)
  }
  /**
   * @param {Number} id
   * @returns {Number}
   */
  FindIndexById (id) {
    return this.Select().findIndex(item => item.id === id)
  }
  Create (data) {
    const collection = this.Select()
    const lastEntry = collection[collection.length - 1]
    const newId = lastEntry ? lastEntry.id + 1 : 1 // get a new unique ID
  
    // check if the new ID is unique
    while (collection.some(entry => entry.id === newId)) {
      newId++ // increment the ID until it is unique
    }
  
    data.id = newId
    collection.push(data)
    this.Commit(collection)
  
    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
  
  Delete (id) {
    let collection = this.Select()
    const index = this.FindIndexById(id)
    if (index >= 0) {
      collection.splice(index, 1)
      this.Commit(collection)
  
      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }
  }

  Update (id, row) {
    const collection = this.Select()
    const index = this.FindIndexById(id)
    if (index >= 0) {
      const entry = collection[index]
      for (const key in row) {
        if (entry.hasOwnProperty(key) && entry.key !== 'id') {
          entry[key] = row[key]
        }
      }
      this.Commit(collection)
  
      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }
  }
}

