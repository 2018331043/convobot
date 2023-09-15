import axios from 'axios'

const authService = {
    signUp(success,error,data){
        // console.log(data)
        try{
            axios.post('auth/register',
              {
                userName:data.userName,
                email:data.email,
                password:data.password,
              })
              .then((res)=>{
                success(res)
              })
              .catch(
                (e)=>{
                  error(e)
                }
              )
            }catch(err){
            console.log(err)
          }
    },
    signIn(success,error,data){
      try{
        axios.post('auth/login',
          {
            email:data.email,
            password:data.password,
          })
          .then((res)=>{
            success(res)
          })
          .catch(
            (e)=>{
              error(e)
            }
          )
        }catch(err){
        console.log(err)
      }
    }
}

export default authService