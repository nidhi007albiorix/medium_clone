import { Router ,Request,Response} from "express";
import { createUser, loginUser } from "../controllers/users";


const route =Router()
route.post('/',async(req:Request,res:Response)=>{
   
    try {
        const user = await createUser({
          userName: req.body.userName,
          email: req.body.email,
          password:req.body.password
        });
        return res.status(201).json(user)
      } catch (error) {

        return res.status(422).send({
            errors:{
                body:"Could not create user"
            }
        })
      }
})
route.post('/login',async(req:Request,res:Response)=>{
  try {
    const user = await loginUser({
 
      email: req.body.email,
      password:req.body.password
    });
    console.log(user)
    return res.status(201).json(user)
  } catch (error) {

    return res.status(422).send({
        errors:{
            body:"Login Failed"
        }
    })
  }
})

export const usersRoute=route