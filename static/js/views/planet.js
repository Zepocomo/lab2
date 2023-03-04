'use strict'

const planetModel = new Planet() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#planet-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const planetData = {}
    formData.forEach((value, key) => {
        planetData[key] = value
    })

    planetModel.Create(planetData)

    e.target.reset()
  })
}


function initRemoveButton () {
  const list = window.document.querySelector('#planet-remove-form')
  list.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
      const id = parseInt(e.target.parentElement.parentElement.querySelector('.data-id').textContent)
      planetModel.Delete(id)
    }
  })
}


function initList () {
  const data = planetModel.Select()

  const dataTable = window.jQuery('#planet-list').DataTable({
    data: data,
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Storage_capacity', data: 'storage_capacity' },
      { title: 'Mass', data: 'mass' },
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
    planetModel.Delete(data.id)
  })

  // Event listener for edit button click
  dataTable.on('click', '.btn-edit', function () {
    const data = dataTable.row($(this).parents('tr')).data()
    
    const newData = {}
    newData.name = prompt('Enter new name:', data.number)
    newData.storage_capacity = prompt('Enter new storage_capacity:', data.capacity)
    newData.mass = prompt('Enter new mass:', data.requirement)
    
    planetModel.Update(data.id, newData)
  })
}

function initListEvents () {
  document.addEventListener('planetsListDataChanged', function (e) {
    const dataTable = window.jQuery('#planet-list').DataTable()

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