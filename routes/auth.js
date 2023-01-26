const router = require("express").Router();
const db=require("./db")

router.post("/register",async(req,res)=>{
    try{
        const body = req.body
        let sql=  `insert into users values ("${body.username}","43 ","${body.email}", "${body.password}");`
        db.query(sql, (er, result) => {
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
    let sql = `select * from users where username="${body.username}";`

    db.query(sql, (err, resp) => {
        if (err) {
            return res.status(401).json({ error: "invalid login credentials" })
        }
         else {
                        // console.log(resp[0],"username matched")
                        
            if (resp[0].PASSWORD ===body.password) {
                // console.log("hello");
                console.log("password matched")
                return res.status(200).json({ message: "add successful" })
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