import './App.css';
import AddItem from './components/AddItem';
import { useState } from 'react';
import ShowItems from './components/ShowItems';

function App() {

  const [items, setItems] = useState([]);
  const [recentlydeleted, setRecentlyDeleted] = useState(null);
  const [completedItems, setCompletedItems] = useState([]);
  const [showClearCompletedButton, setShowClearCompletedButton] = useState(false);
  const totalitems = items.length + completedItems.length;

  function getRandomColor() {
    const colors = ['#ACB1D6', '#C7E9B0', '#FFC5C5', '#EFD595', '#FFD4B2', '#DEBACE']; // Add your specific colors here
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function AddNewItem(List) {
    setItems([...items, { ...List, id: items.length + 1, color: getRandomColor() }])
  }

  return (
    <div className="background">
      <h1 className="mainheading" style={{ textAlign: 'center', marginTop: '5px' }}>───── To do list ─────</h1>
      <AddItem newitem={AddNewItem}></AddItem>
      {
        items.map((item, index) =>
          <ShowItems txt={item.txt} color={item.color} handleUp={() => handleUp(index)} handleDown={() => handleDown(index)} handleDelete={() => handleDelete(index)} handleDone={() => handleDone(index)}></ShowItems>)
      }
      {
        recentlydeleted && (
          <div className='undoContainer'>
            <button onClick={handleUndo} className='undoButton'>Undo</button>
          </div>
        )
      }

      {
        completedItems.length > 0 && (
          <div className='completeditems'>
            <div className='headerforcitems'>
              <p><span style={{fontWeight: 'bolder'}}>Completed Items :</span>({completedItems.length} / {totalitems})</p>
              <button className="clearCompletedButton" onClick={handleClearCompleted}>
                Clear Completed Items
              </button>
            </div>
            {
              completedItems.map((citem, index) => (
                <button className='AddBackButton' onClick={() => handleDoneUndo(index)}>
                  {citem.txt}
                </button>
              ))
            }
          </div>
        )
      }
    </div>
  );


  function handleUp(index) {
    const updatedItem = [...items];//creating a copy of state variable to decrease its index because you cannot directly update a state variable
    if (index > 0) {
      [updatedItem[index], updatedItem[index - 1]] = [updatedItem[index - 1], updatedItem[index]]
      setItems(updatedItem);
    }
  }

  function handleDown(index) {
    const updatedItem = [...items];
    if (index < items.length - 1) {
      [updatedItem[index], updatedItem[index + 1]] = [updatedItem[index + 1], updatedItem[index]]
      setItems(updatedItem);
    }
  }

  function handleDelete(index) {
    const updatedItem = [...items];
    let removedItems = updatedItem.splice(index, 1);//here 
    setItems(updatedItem);
    setRecentlyDeleted(removedItems[0])
    setTimeout(() => {
      setRecentlyDeleted(null);
    }, 3000);

  }

  function handleUndo() {
    setItems([...items, recentlydeleted]);
    setRecentlyDeleted(null);
  }

  function handleDone(index) {
    const updatedItem = [...items];
    let completedtasks = updatedItem.splice(index, 1);
    setItems(updatedItem);
    setCompletedItems([...completedItems, completedtasks[0]]);
  }

  function handleDoneUndo(index) {
    const updatedCompletedItems = [...completedItems];
    let undoneItem = updatedCompletedItems.splice(index, 1);
    setCompletedItems(updatedCompletedItems);
    setItems([...items, undoneItem[0]]);
  }

  function handleClearCompleted() {
    setCompletedItems([]);
    setShowClearCompletedButton(false); // Hide the clear completed button
  }
}
export default App;
