let user=require("../Models/Usermodel");
let jwt=require("jsonwebtoken");
let bcrypt=require("bcrypt");
let crypto=require("crypto")
let nodemailer =require("nodemailer");

require("dotenv").config()

let email_info =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSKEY
    }
})

let main_function={
home:async function(req,res){
    res.send("Home Page")
    res.end();
},
// api
register_user: async function(req,res){
   try {
    let {user_name,user_email,password,Age,Gender,Address} =req.body;
    let check_mail=await user.findOne({user_name_email:user_email})
    if(check_mail){
    return res.status(409).json({msg:"Email already exist"})
    }
    else{
        let getpassword=bcrypt.hashSync(password,12)
        let user_data= new user({user_name,user_email,password:getpassword,Age,Gender,Address})
        let create =await user_data.save();
        res.status(200).json({msg:"User Register sucessfully"})

        let Email_body={
            to : user_email,
            from :process.env.EMAIL,
            subject : "Register successfully",
            html :`<h3>hi ${user_name}<br/><br/>Your Account has been register successfully, Congratulations. <br/>
            <a href='http://localhost:3007/Web/login'> continue to website<a/><h3/>`
        }
         email_info.sendMail(Email_body,function(error,info){
            if (error) {
                console.log(error.message)
            } else{
                console.log("Email has been sent successfully")
            }
         })
    }
    } catch (error) {
    res.status(501).json({msg :error.message})
   }
},

get_user: async function(req,res){
try {
    let getdata =await user.find().select("-password").sort({"created_at":-1})
    return res.status(202).json(getdata)
} catch (error) {
    res.status(501).json({msg:error.message})
}
},

delet_record:async function(req,res){
try {
let {id} =req.params
let id_dhundo = await user.findById(id)
if(id_dhundo){
    await user.findByIdAndDelete(id_dhundo)
    return res.status(200).json({msg:"Record Delete Successfully"})
}
} catch (error) {
    res.status(501).json({msg:error.message})
}
},

update_record:async function(req,res){
 try {
    let{id}=req.params
    let{user_name,user_email,Age,Gender,Address}=req.body;
    let id_dhundo =await user.findById(id);
    if(id_dhundo){
        await user.findByIdAndUpdate(id,{user_name:user_name,user_email:user_email,Age:Age,Gender:Gender,Address:Address})
        res.status(200).json({msg:"Reord update successfully"})
    }
 } catch (error) {
    res.status(501).json({msg:error.message})
 }
},
Login_work:async function(req,res){
    try {
        let{user_email,password}=req.body;
    let find_user_email =await user.findOne({user_email})
    if(!find_user_email){
        return res.status(404).json({msg:"email not found"})
    }
    let getpassword=bcrypt.compareSync(password,find_user_email.password)
    if(!getpassword){
        return res.status(404).json({msg:"password is incorrect"})
    }
    let user_record = jwt.sign({id : find_user_email._id},process.env.JWT_KEY,{expiresIn:"2d"})
    return res.status(201).json({
        msg:"Login successfully",
        user_record,
        user:{
            n:find_user_email.user_name,
            e:find_user_email.email
        }
    })
    } catch (error) {
        return res.status(501).json({msg:error.message})
    }
  

},

forgot_pswd: async function(req,res){
    try {
        let {email} =req.body
        let email_check =await user.findOne({email})

        if(!email_check){
            res.status(404).json({msg:"Email doesn't Exist"})
        }

        let random_set =jwt.sign({id:email_check.id},process.env.SECRET_KEY,{expiresIn:"10m"})
        let link =`http://localhost:3007/Web/resetpswd/${random_set}`

        let Email_body={
            to :email_check.email,
            from :process.env.EMAIL,
            subject :"Reset your password",
            html :`hi ${email_check.name} <br/> your passwpord link is given below, kindly click on the given link ${link}`
        }

        email_info.sendMail(Email_body,function(e,i){
            if(e){
                return res.status(501).json({msg:e.message})
            }else{
                return res.status(200).json({msg:"Password Reset Link has been Sent"})

            }
        })
    } catch (error) {
        return res.status(501).json({msg:e.message})
        
    }
},
reset_password:async function (req,res){
    try {
        let {password}=req.body;
        let {token}=req.params;
        let fetch=jwt.decode(token,process.env.SECRET_KEY)
        if(!fetch){
            res.status(404).json({msg:"invalid Token"})

        }
        let ecp=brcypt.hashSync(password,12);
        await exibitor.findByIdAndUpdate(fetch.id,{password:ecp})
        res.status(201).json({msg:"password Reset Successfully"})
        
    } catch (error) {
        res.status(501).json({msg:error.message})
    }

},
}
module.exports=main_function;