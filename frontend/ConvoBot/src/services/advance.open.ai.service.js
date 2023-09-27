import axios from 'axios'

const advancedOpenApiService = {
    generateEmbedding(success,error,data){
        try{
            axios.post('/open-ai/generate-embedding',{
                chatbotId:data.id,
                inputText:data.text,
                embeddingName:data.name
            }).then(
                (res)=>{
                    // console.log(res)
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