const router = require("express").Router();
const db=require("./db")

router.post("/register",async(req,res)=>{
    try{
        const body = req.body
        console.log(body)
        let sql=  `insert into user (U_NAME,A_ID, U_EMAIL, U_PASSWORD ) values ("${body.username}","","${body.email}", "${body.password}");`
        db.query(sql, (er, result) => {
            console.log(er)
        if(er)
        res.status(400).end('No adaptations found!!')
    })
    }
    catch(err){
        res.status(500).json(err);
    }
});


// for login 
router.post("/login", async(req,res) => {
    try {
        const body = req.body
        console.log(body)
    let sql = `select * from user where u_name="${body.username}";`
        console.log(body)
    db.query(sql, (err, resp) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ error: "invalid login credentials" })
        }
         else {
                        // console.log(resp[0],"username matched")
                        
            if (resp[0].U_PASSWORD === body.password) {
                console.log("password matched")
                return res.status(200).json(body.username)
            }
        }
    })
 
    } catch (err) {
        res.status(500).json(err);  
    }
});

module.exports = router;
// this error will be generated when u don't write above code
// throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))