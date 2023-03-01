'use strict'

const spaceStationModel = new SpaceStation() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#spaceStation-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const spaceStationData = {}
    formData.forEach((value, key) => {
      spaceStationData[key] = value
    })

    spaceStationModel.Create(spaceStationData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#spaceStation-list').DataTable({
    data: spaceStationModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'number' },
      { title: 'Capacity', data: 'capacity' },
      { title: 'Requirement', data: 'requirement' }
    ]
  })
}

function initListEvents () {
  document.addEventListener('spaceStationsListDataChanged', function (e) {
    const dataTable = window.jQuery('#spaceStation-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})