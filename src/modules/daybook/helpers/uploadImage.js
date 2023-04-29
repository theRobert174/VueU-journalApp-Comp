import axios from "axios"

const uploadImage = async (file) => {
    
    if(!file) return

    try {
        const formData = new FormData()
        formData.append('upload_preset','curso-VueU-Journal')
        formData.append('file', file)

        const url = 'https://api.cloudinary.com/v1_1/docvea5nn/image/upload'
        const {data} = await axios.post(url, formData)
        
        return data.secure_url

    } catch(err){
        console.error('Error al cargar la imagen, revisar los logs')
        console.log(err)
        return null

    }
}

export default uploadImage