import { useState } from 'react'
import axios from 'axios';


const GroceryListItem = ({item, token}) => {
    console.log(item)
    const [itemData, setItemData] = useState(item);
    const [itemCount,setItemCount] = useState();

    const deleteItem = (item) => {
        axios.delete(`https://grocerease.herokuapp.com/grocerease/delete_item/${item.pk}/`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`
            },
        })
        .then (res => {
            setItemData(item.filter(itemData => (item !== item.pk)))
        })
        .catch(error => {setItemCount()})
    }
    

return (
    <div className='grocery_list'>
        <div className='grocery_item_detail'>
            <div className='delete_button'>
                <i className='fas fa-times-circle fa-3x' onClick={(event) => {
                    event.preventDefault()
                    deleteItem(item)
                }}>
                </i>
            </div>
            <div className='grocery_item_text'>
                <h2 className='item_name'>{item.name}</h2>
                {/* <input className='item_count'
                    type='number'
                    value={itemCount}
                    onChange={(event) => {
                        setItemCount(event.target.value);
                        console.log({itemCount})
                        axios.patch(`https://grocerease.herokuapp.com/grocerease/item_detail/${item.pk}/`,
                        console.log(event),
                        {
                         quantity: item.item_quantity,
                        },console.log(item.item_quantity))}}>    
                </input> */}
                <p className='count'>ct.</p>
                <div className='item_count_container'>
                    <input className='item_count'
                        type='number'
                        value={itemCount}
                        onChange={(event) => setItemCount(event.target.value)}>
                    </input>
                    <p className='count'>ct.</p>
                </div>
                <p>{item.choices}</p>
                </div>
            </div>
        </div>
)}


export default GroceryListItem;