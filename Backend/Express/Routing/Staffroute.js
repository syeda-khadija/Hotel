let express=require("express");
let Staffcontroller=require("../Controllers/Staffcontroller");

let router=express.Router();
router.get("/",Staffcontroller.home);
router.post("/staff_reg",Staffcontroller.staff_register)
router.get("/staff",Staffcontroller.get_staff)
router.delete("/staff/:id",Staffcontroller.delet_record)
router.put("/staff/:id",Staffcontroller.update_record)

module.exports = router;