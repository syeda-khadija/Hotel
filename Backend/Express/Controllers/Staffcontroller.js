let user=require("../Models/Usermodel");
let staff = require("../Models/Staff")
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
    staff_register:async function(req,res){
        try {
            let {staff_name,staff_email,Age,Gender,Phone_no,Address,Role,Shift_Timing,password} =req.body;
            let check_mail=await staff.findOne({staff_email:staff_email})
            if(check_mail){
            return res.status(409).json({msg:"Email already exist"})
            }
            else{
                let getpassword=bcrypt.hashSync(password,12)
                let user_data= new staff({staff_name,staff_email,Age,Gender,Phone_no,Address,Role,Shift_Timing,password:getpassword})
                let create =await user_data.save();
                res.status(200).json({msg:"User Register sucessfully"})

            }
            } catch (error) {
                res.status(501).json({msg :error.message})
               }
            },
            get_staff: async function(req,res){
                try {
                    let getdata =await staff.find().select("-password").sort({"created_at":-1})
                    return res.status(202).json(getdata)
                } catch (error) {
                    res.status(501).json({msg:error.message})
                }
                },
                delet_record: async function(req, res) {
                    try {
                        let { id } = req.params;
                        let id_dhundo = await staff.findById(id);
                        if (id_dhundo) {
                            await staff.findByIdAndDelete(id); // Use id here, not id_dhundo
                            return res.status(200).json({ msg: "Record Deleted Successfully" });
                        } else {
                            return res.status(404).json({ msg: "Record Not Found" });
                        }
                    } catch (error) {
                        res.status(501).json({ msg: error.message });
                    }
                },
                

                    update_record:async function(req,res){
                        try {
                           let{id}=req.params
                           let{staff_name,staff_email,Age,Gender,Phone_no,Address,Role,Shift_Timing}=req.body;
                           let id_dhundo =await staff.findById(id);
                           if(id_dhundo){
                               await staff.findByIdAndUpdate(id,{
                                staff_name:staff_name,
                                staff_email:staff_email,
                                Age:Age,
                                Gender:Gender,
                                Phone_no:Phone_no,
                                Address:Address,
                                Role:Role,
                                Shift_Timing:Shift_Timing
                            })
                               res.status(200).json({msg:"Reord update successfully"})
                           }
                        } catch (error) {
                           res.status(501).json({msg:error.message})
                        }
                       },
    }
   module.exports=main_function