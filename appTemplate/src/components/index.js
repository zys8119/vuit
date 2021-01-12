import iv from "import-vue"
const ivTo = (name)=>{
    return iv({
        fileUrl:"components/",
        name
    }).component;
};