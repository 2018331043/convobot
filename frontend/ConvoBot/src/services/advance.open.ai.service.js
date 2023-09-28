import axios from 'axios'

const advancedOpenApiService = {
    attachEmbedding(success,error,data){
        // console.log(data)
        try{
            axios.post('/open-ai/attach-embedding-to-chatbot',{
                chatbotId:data.id,
                inputText:data.textInput,
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
    },
    getAllEmbeddings(success,error,data){
        // data = parseInt(data)
        // console.log(typeof(data))
        try{
            axios.post('/open-ai/get-all-embedding',{},{
                params:{
                    chatbotId:data
                }
            }).then(
                (res)=>{
                    console.log(res.data)
                    success(res.data)
                }
            ).catch(
                (err)=>{
                    console.log(err)
                    error(err)
                }
            )
        }catch(e){

        }
    },
    deleteEmbedding(success,error,data){
        try{
            axios.post(`/open-ai/delete-embedding/${data}`).then(
                (res)=>{
                    console.log(res)
                    success(res)
                }
            ).catch(
                (err)=>{
                    console.log(err)
                    error(err)
                }
            )
        }catch(e){

        }
    }
}

export default advancedOpenApiService