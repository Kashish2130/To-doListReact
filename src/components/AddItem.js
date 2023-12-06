import { useState } from 'react';
import './AddItem.css';

let initialvalue = { id: '', txt: '' };

function AddItem({ newitem }) {
    const [List, SetList] = useState(initialvalue);

    function handleClick(e) {
        e.preventDefault();
        if (List.txt != "") {
            newitem(List);
            SetList(initialvalue);
        }
    }

    function handleChange(e) {
        e.stopPropagation();
        SetList({ ...List, [e.target.name]: e.target.value })
    }

    return (
        <form>
            <input type="text" name="txt" placeholder="Enter item" onChange={handleChange} value={List.txt}></input>
            <input type="submit" value="Add Item" className="addItemButton" onClick={handleClick}></input>
        </form>
    )
}

export default AddItem;