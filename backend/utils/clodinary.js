import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'do2d2pclb',
    api_key: '765617265967851',
    api_secret: 'AslyGDScICGteRfsS0Wiek85qpc'
});

export default async function UploadFileOnClodinary(filename) {
    const {uploader}=cloudinary
    try {
        const response =await uploader.upload(filename)
        return response
        console.log(response)
            
    } catch (error) {
        console.log(error)
    }
}