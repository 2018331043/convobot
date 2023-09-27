import axios from 'axios'

const advancedOpenApiService = {
    generateEmbedding(success,error,data){
        try{
            axios.post('/open-ai/generate-embedding',data).then(
                (res)=>{
                    console.log(e)
                    success(res)
                }
            ).catch((e)=>{
                error(e)
            })
        }catch(e){
    
        }
    }
}

export default advancedOpenApiService