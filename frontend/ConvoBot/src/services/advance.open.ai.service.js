import axios from 'axios'

const advancedOpenApiService = {
    generateEmbedding(success,error,data){
        // console.log(data)
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
    },
    attachWebInfoToChatbot(success,error,data){
        try{
            axios.post('/open-ai/attach-web-info-to-chatbot',
            {
                chatbotId:data.id,
                url:data.url
            }).then(
                (res)=>{
                    console.log(res)
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