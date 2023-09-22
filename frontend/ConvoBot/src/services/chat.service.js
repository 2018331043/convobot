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
    },
    createChatbot(success,error,data){
        try{
            axios.post('/chatbot/create-chatbot',{
                prompt:data.prompt,
                restriction:data.restriction,
                chatbotName:data.chatbotName,
                description:data.description
            }).then(
                (res)=>{
                    console.log(res)
                    success(res)
                }
            ).catch(
                (e)=>{
                    console.log(e)
                }
            )
        }catch(e){
            console.log(e)
        }
    },
    updateChatbot(success,error,data){
        try{
            console.log(data)
            axios.post('/chatbot/update-chatbot',{
                id:data.id,
                prompt:data.prompt,
                restriction:data.restriction,
                chatbotName:data.chatbotName,
                description:data.description
            }).then(
                (res)=>{
                    success(res)
                }
            ).catch(
                (e)=>{
                    console.log(e)
                    error(e)
                }
            )
        }catch(e){
            console.log(e)
        }
    },
    postMessage(success,error,data){
        try{
            axios.post('/chat/get-all-chats',{
                inputText : data.input,
                chatbotId: data.id
            },
            {
                params:{
                    apiKey:data.apiKey
                }
            }
            ).then(
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
    }
}

export default chatService

