'use strict'
const planetModel = new Planet() // eslint-disable-line no-undef
const spaceStation_on_orbitModel = new SpaceStation_on_orbit() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#spaceStation_on_orbit-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const spaceStation_on_orbitData = {}
    formData.forEach((value, key) => {
      spaceStation_on_orbitData[key] = value
    })

    spaceStation_on_orbitModel.Create(spaceStation_on_orbitData)

    e.target.reset()
  })
}


function initRemoveButton () {
  const list = window.document.querySelector('#spaceStation_on_orbit-remove-form')
  list.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
      const id = parseInt(e.target.parentElement.parentElement.querySelector('.data-id').textContent)
      spaceStation_on_orbitModel.Delete(id)
    }
  })
}


function initList () {
  const data = planetModel.Select()
//   const data2 = spaceStationModel.Select()
//   const data3 = planetModel.Select()
  
  const dataTable = window.jQuery('#planet-list').DataTable({
    data:  data, //, data2, data3
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Planet', data: 'name' },
    //   { title: 'SpaceStation', data: 'number' },
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
    spaceStation_on_orbitModel.Delete(data.id)
  })

  // Event listener for edit button click
  dataTable.on('click', '.btn-edit', function () {
    const data = dataTable.row($(this).parents('tr')).data()
    
    const newData = {}
    newData.name = prompt('Enter new name:', data.name)
    // newData.number = prompt('Enter new number:', data.number)
    
    spaceStation_on_orbitModel.Update(data.id, newData)
  })
}

function initListEvents () {
  document.addEventListener('spaceStations_on_orbitListDataChanged', function (e) {
    const dataTable = window.jQuery('#spaceStation_on_orbit-list').DataTable()

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


