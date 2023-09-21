import axios from 'axios'

const apiKeyService = {
    generateApiKey(success,error){
        // console.log(data)
        try{
            axios.post('api-key/generate-api-key')
              .then((res)=>{
                // console.log(res)
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
    getApiKeys(success,error){
      axios.get('api-key/get-all-api-keys')
      .then( (res) =>{
        // console.log(res.data.apiKeyResponseList)
        let data = res.data.apiKeyResponseList
        success(data)
      } )
      .catch(
        (err) => {
          error(err)
        }
      )
    }
}

export default apiKeyService