import axios from "axios";

const chatService = {
    sendText(success,error,data){
        // console.log(data)
        try{
            axios.post('/chat/post-text',{
                inputText:data.text,
                chatbotId:data.id,
            },{
                params:{
                    apiKey:data.api
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
                    chatbotId:data.id
                }
            }).then(
                (res)=>{
                    // console.log(res.data.messages.length)
                    success(res.data.messages)
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
    deleteChatbot(success,error,id){
        try{
            axios.post(`/chatbot/delete-chatbot/${id}`).then(
                (res)=>{
                    success(res)
                }
            ).catch(
                (e)=>{
                    error(e)
                }
            )

        }catch(e){

        }
    }
}

export default chatService

