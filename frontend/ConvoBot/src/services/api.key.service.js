import axios from 'axios'

const apiKeyService = {
    generateApiKey(success,error,data){
        console.log(data.apikeyName)
        try{
            axios.post('api-key/generate-api-key',data.apikeyName)
              .then((res)=>{
                console.log(res)
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
        console.log(res.data.apiKeyResponseList)
        let data = res.data.apiKeyResponseList
        console.log(data)
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