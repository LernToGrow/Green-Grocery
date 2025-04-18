import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"; 
import Stripe from 'stripe';

const STRIPE_SECRET_KEY="sk_test_51LqtOrSGYIgVpoiwjAPux95NFt7BeQKqroPh2jRTkUAYu19kco8wWnZlt4rS8Ey8Jz2JiNqeTTUq56dJGpSphvEj00t9Dhw1q0";

const stripe = new Stripe(STRIPE_SECRET_KEY);

// placing user order form frontend
const placeOrder = async (req,res)=>{

    const frontend_url = 'https://green-grocery-backend.onrender.com';
    // const frontend_url = 'http://localhost:4000';
    try {   
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}}) 
 
        if(req.body.items){
            
            let line_items = req.body.items.map((item)=>({
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100*80
                },
                quantity:item.quantity
            }));

            line_items.push({
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:"Delivery Charges"
                    },
                    unit_amount:2*100*80
                },
                quantity:1
            })
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: line_items,
                mode: "payment",
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
              });
            res.json({success:true,session_url:session.url})

        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Place new Order"+error})
    }
}

const verifyOrder = async (req,res)=>{
    const {orderId ,success} = req.body;
    try {
        if(success == 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndUpdate(orderId)
            res.json({success:true,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Eroor while verifyOrder"+error})
    }
}

// user orders for frontend 

const userOrders  = async(req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Eroor while finding user order"+error})        
    }
}

// list  of all order for admin

const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Eroor while finding admin all order"+error})        
    }
}

// update the status of order
const updatestatus = async(req,res)=>{
    try {
        await  orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Eroor while update the status of order"+error}) 
    }
}


export {placeOrder ,verifyOrder, userOrders ,listOrders, updatestatus};
