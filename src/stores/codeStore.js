import { defineStore } from "pinia";

export const useCodeStore = defineStore('codeStore',{
    state:()=>({
        code : "",
        details : {}
    }),
    actions:{
        setCode(code)
        {
            this.code = ""
            this.code = code
        },
        clearCode()
        {
            this.code = ""
        },
        getCodeStatus()
        {
            if(this.code !== "")
            {
                return true
            }
            else{
                return false
            }
        },
        getCode()
        {
            return this.code
        },
        setDetails(data)
        {
            this.details = {}
            this.details = data
        },
        getDetails()
        {
            return this.details
        }
    }
})