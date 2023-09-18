import axios from "axios";

const chatService = {
    sendText(success,error,data,api){
        try{
            axios.post('/chat/post-text',{
                inputText:data.text,
                chatboId:data.id,
            },{
                params:{
                    apiKey:api
                }
            }).then(
                (res)=>{
                    success(res)
                }
            ).catch(
                (err)=>{
                    error(err)
                }
            )
        }catch(e){

        }
    },
    getChat(success,error,data){
        try{
            axios.get('/chat/get-all-chats',{
                params:{
                    chatbotId:data
                }
            }).then(
                (res)=>{
                    success(res)
                }
            ).catch(
                (err)=>{
                    error(err)
                }
            )
        }catch(e){
            console.log(e)
        }
    }
}

export default chatService