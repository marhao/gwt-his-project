import Serial from "../models/serial.js";

export default class SerialService{
    public static async getSerial(name: string) {
        try {
            const serial: any = await Serial.findBy({name: name})

            let seriallNo = 0;

            if(serial != null){
                seriallNo = serial.serialNo
                serial.serialNo = serial.serialNo+1;
                await serial.save();
                return seriallNo + 1
            }else{
                await Serial.create({name: name, serialNo: 1})
                return 1
            }
        } catch (error) {
            console.error(error)
            return 0
        }
    }
}