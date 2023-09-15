import axios from 'axios'

const apiKeyService = {
    apiKey(success,error){
        // console.log(data)
        try{

            axios.get('api-key/generate-api-key')
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

export default apiKeyService