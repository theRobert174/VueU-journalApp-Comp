import axios from "axios"

const MAX_FILE_SIZE_MB = 5
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

const uploadImage = async (file) => {

    if(!file) return

    if(!ALLOWED_TYPES.includes(file.type)){
        console.error('Tipo de archivo no permitido:', file.type)
        return null
    }

    if(file.size > MAX_FILE_SIZE_MB * 1024 * 1024){
        console.error(`La imagen supera el límite de ${MAX_FILE_SIZE_MB}MB`)
        return null
    }

    try {
        const formData = new FormData()
        formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET)
        formData.append('file', file)

        const url = `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
        const {data} = await axios.post(url, formData)

        return data.secure_url

    } catch(err){
        console.error('Error al cargar la imagen a Cloudinary', err)
        return null
    }
}

export default uploadImage