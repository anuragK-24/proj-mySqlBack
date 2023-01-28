const router = require("express").Router();
const db=require("./db")

//CREATE POST
router.post("/:user",async(req,res)=>{
    try{  
        const body = req.body
        const user = req.params.user
        console.log(body)
        console.log('1',user)

        let sql1 = `select * from user where u_name="${user}";`

        // let sql=  `insert into posts (title,descp,photo,username, categories) values ("${body.title}","${body.desc}","xyz","Anurag","enjoy");`
        db.query(sql1, (er, result) => {
        if(er)
        {
      console.log("11",result);
      res.status(400).end('No adaptations found!!')
    }
    else{
          // console.log("333",result);
          const id = result[0].U_ID
          let sql2=`INSERT INTO POSTS (U_ID, P_TITLE, P_DESCP) VALUES( "${id}" , "${body.title}", "${body.desc}");`
          db.query(sql2, (er, result1) => {
            if(er)
            {
          console.log("11",result1);
          res.status(400).end('No adaptations found!!')
        }
        else{
            // console.log(result1,"dfsd")
            let sql3 = `select * from posts where p_id="${result1.insertId}";`
      
            db.query(sql3, (er, result) => {
            if(er){
              console.log("11",result);
              res.status(400).end('No adaptations found!!')
            }
            else{
             res.send(result[0])
              // console.log(result)
             }
             
            })
      }
        
      })
      



    



      // return res.status(200).json(result[0])
    }
    })
    }
    catch(err){
        res.status(200).json(err);
    }
});








//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const data = req.params.id;
    console.log(data)
    if (post.username === req.body.username) {
      try {
        
        let sql5 = `UPDATE POSTS SET P_TITLE= 'Alfred Schmidt', P_DESCP= 'Frankfurt' WHERE P_ID = 68;`
        
        
        
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
        console.log(req.params.id)

          let sql4=`SELECT * FROM POSTS WHERE P_ID=${req.params.id};`
          db.query(sql4, (er, result1) => {
            if(er)
            {
          console.log("11",result1);
          res.status(400).end('No adaptations found!!')
        }
        else{
            console.log(result1)
            console.log(result1[0])
            res.send(result1[0]);
        }
      })
    // res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});







//GET ALL POSTS
router.get("/", async (req, res) => {
  try {
          let sql4=`SELECT * FROM POSTS ;`
          db.query(sql4, (er, result1) => {
            if(er)
            {
          console.log("11",result1);
          res.status(400).end('No adaptations found!!')
        }
        else{
            console.log(result1)
            res.send(result1);
        }
      })
    // res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
