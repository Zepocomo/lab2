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


function initRemoveButton () {
  const list = window.document.querySelector('#spaceStation-remove-form')
  list.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
      const id = parseInt(e.target.parentElement.parentElement.querySelector('.data-id').textContent)
      spaceStationModel.Delete(id)
    }
  })
}


function initList () {
  const data = spaceStationModel.Select()

  const dataTable = window.jQuery('#spaceStation-list').DataTable({
    data: data,
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'number' },
      { title: 'Capacity', data: 'capacity' },
      { title: 'Requirement', data: 'requirement' },
      {
        title: '',
        data: null,
        defaultContent: '<button class="btn btn-primary btn-sm btn-edit">Edit</button> <button class="btn btn-danger btn-sm btn-delete">Remove</button>'
      }
    ]
  })

  // Event listener for remove button click
  dataTable.on('click', '.btn-delete', function () {
    const data = dataTable.row($(this).parents('tr')).data()
    spaceStationModel.Delete(data.id)
  })

  // Event listener for edit button click
  dataTable.on('click', '.btn-edit', function () {
    const data = dataTable.row($(this).parents('tr')).data()
    
    const newData = {}
    newData.number = prompt('Enter new number:', data.number)
    newData.capacity = prompt('Enter new capacity:', data.capacity)
    newData.requirement = prompt('Enter new requirement:', data.requirement)
    
    spaceStationModel.Update(data.id, newData)
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
  initRemoveButton()
})

