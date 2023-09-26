import axios from 'axios'



const authService = {
    signUp(success,error,data){
        // console.log(data)
        try{
            axios.post('auth/register',
              {
                userName:data.userName,
                email:data.email,
                password:data.password,
              })
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
    },
    signIn(success,error,data){
      try{
        axios.post('auth/login',
          {
            email:data.email,
            password:data.password,
          })
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
    getAllChatbots(success,error){
      try{
        axios.get('/chatbot/get-all-chatbots')
        .then((res)=>{
          success(res)
        }).catch((e)=>{
          error(e)
        })
      }catch(e){
        console.log(e)
      }
    },
    getAllChatbotReport(success,error){
        try{
            axios.get('/chatbot/get-chatbot-report')
                .then((res)=>{
                    success(res)
                }).catch((e)=>{
                error(e)
            })
        }catch(e){
            console.log(e)
        }
    },
    getAllApiKeyReport(success,error){
        try{
            axios.get('/api-key/get-apikey-report')
                .then((res)=>{
                    success(res)
                }).catch((e)=>{
                error(e)
            })
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
          description:data.description,
        }).then((res)=>{
          success(res)
        }).catch((err)=>{
          error(err)
        })
      }catch(e){

      }
    },
    generatePrompt(success,error,name){
      try{
        axios.post('/open-ai/generate-prompt-for-chatbot',{promptGenerationRequest:name}).then(
          (res)=>{
            // console.log()
            success(res.data.generatedPrompt)
          }
        ).catch((err)=>{
          error()
        })
      }catch(e){
        console.log(e)
      }
    }

}

export default authService