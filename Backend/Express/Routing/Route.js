let express=require("express");
let func=require("../Controllers/Usercontroller");





let router=express.Router();

router.get("/",func.home);
router.post("/reg",func.register_user)
router.get("/user",func.get_user)
router.delete("/user/:id",func.delet_record)
router.put("/user/:id",func.update_record)

router.post("/login",func.Login_work)
router.post("/forgot",func.forgot_pswd)
router.post("/login",func.Login_work)
router.post("/reset/:token",func.reset_password)




module.exports=router;