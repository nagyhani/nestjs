export class OTPService{

    generateOTp(){

        return Math.floor(Math.random() * 100000 + 900000)
    }
}