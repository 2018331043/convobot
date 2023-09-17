import axios from 'axios'

const apiKeyService = {
    apiKey(success,error){
        // console.log(data)
        try{

            axios.post('api-key/generate-api-key')
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