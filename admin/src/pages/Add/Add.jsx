import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

  
const Add = ({url}) => {

    const [image ,setImage] = useState(false);
    const [data,setData] = useState({
      name:'',  
      description:'',
      price:'',
      category:'Fruits',
    });

    const onChnageHandler = (event)=>{
      const name = event.target.name; 
      const value = event.target.value; 
      setData(data =>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) =>{
      event.preventDefault();
      const formData = new FormData();
      formData.append('name',data.name)
      formData.append('description',data.description)
      formData.append('price',Number(data.price))
      formData.append('category',data.category)
      formData.append('image',image)
console.log(formData);

      const response = await axios.post(`${url}/api/food/add`,formData)
      if(response.data.success){
        setData({
          name:'',
          description:'',
          price:'',
          category:'Fruits',
        })
        setImage(false)
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p> 
          <label htmlFor='image'>
              <img src={image? URL.createObjectURL(image) :assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])}  type="file" id='image' hidden required/>
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChnageHandler} value={data.name} type="text" name='name' placeholder='type here' />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea  onChange={onChnageHandler} value={data.description} name='description' placeholder='Write content here'></textarea>
        </div>
        <div className='add-category-price'>
          <div className="add-category flex-col">
            <p>Product category</p>
            <select  onChange={onChnageHandler}  name='category'>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Bread and baked goods">Bread and baked goods</option>
              <option value="Meat and fish">Meat and fish</option>
              <option value="Meat alternatives">Meat alternatives</option>
              <option value="Cans and jars">Cans and jars</option>
              <option value="Pasta, rice, and cereals">Pasta, rice, and cereals</option>
              <option value="Sauces and condiments">Sauces and condiments</option>
              <option value="Herbs and spices">Herbs and spices</option>
              <option value="Frozen foods">Frozen foods</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
              <option value="Household and cleaning">Household and cleaning</option>
              <option value="Personal care">Personal care</option>
              <option value="Pet care">Pet care</option>
              <option value="Baby products">Baby products</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input  onChange={onChnageHandler} value={data.price} type='Number' name='price' placeholder='$20'/>
          </div>
        </div>

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add