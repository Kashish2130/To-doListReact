import './ShowItem.css';

function ShowItems({ txt ,color,handleUp,handleDown,handleDelete,handleDone}) {
    return (
        <div className="container">
            <div className='item' style={{backgroundColor:color}}>{txt}</div>
            <div className='buttons'>
                <button style={{backgroundColor:'#F7B787'}} onClick={handleUp} className='upbutton'>up</button>
                <button style={{backgroundColor:'#BB9CC0'}} onClick={handleDown} className='downbutton'>down</button>
                <button style={{backgroundColor:'#FFE382'}} className='cross' onClick={handleDelete}>&#10060;</button>
                <button style={{backgroundColor:'#D2DE32'}} className='right' onClick={handleDone}>&#x2714;</button>
            </div>
        </div>
    )
}

export default ShowItems;