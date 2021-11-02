import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list'); 
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

function App() {
  const [name, setName] =useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditting, setIsEditting] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ 
    show:false, 
    msg: '', 
    type: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name) {
      showAlert(true,'danger','Please enter value');
    } else if(name && isEditting) {
      
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {...item, title:name}
          }
          return item;
        })
      )
      setName('');
      setEditID(null);
      setIsEditting(false);
      showAlert(true, 'success', 'Value changed')
    } else {
      showAlert(true,'success', 'Item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name}
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show=false,type="",msg="") => {
    setAlert({show,type,msg})
  }

  const editItem = (id) => {
    const specialItem = list.find((item) => item.id === id);
    setIsEditting(true);
    setEditID(id);
    setName(specialItem.title)
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item has removed');
    setList(list.filter((item) =>  item.id !== id ))
    console.log(id);
  
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return ( 
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input type='text' className='grocery' placeholder='e.g: Banana' value={name} onChange={(e) => setName(e.target.value)}></input>
          <button className="submit-btn">
            {isEditting ? 'edit' : 'Submit'}
          </button>
        </div>
      </form>
      { list.length > 0 && <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className='clear-btn' onClick={clearList}>Clear Items</button>
      </div> 
      }  
    </section>
  )
}

export default App
