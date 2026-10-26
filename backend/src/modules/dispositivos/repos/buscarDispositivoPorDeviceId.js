import prisma from "../../../../prisma/prisma.js"

export const buscarDispositivoPorDeviceId = async(deviceId)=>{
    return await prisma.dispositivos.findUnique({
        where:{
            device_id: deviceId
        }
    })
}