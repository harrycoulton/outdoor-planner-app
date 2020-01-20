export class GeneratedCoordinates{

    /**
     * This function returns a random number within the parameters
     * 
     * @param from lowest figure
     * @param to highest figure
     */

    getRandomInRanges(from:number, to:number):number{
        return (Math.random() * (to - from) + from) * 1;
    }

    /**
    * This function generates random coordinates
    * Longitude ranges from -180 to 180
     * Latitude ranges from -90 to 90
     */

    generateCoordinates(limit:number) {
        let longsLats:any = {}
        for (let i = 0; i< limit; i++){
            let temporaryObject = {
                "id" : 0,
                "latitude": 0,
                "longitude": 0 
            }
            temporaryObject.id = i
            temporaryObject.latitude = this.getRandomInRanges(-90, 90)
            temporaryObject.longitude = this.getRandomInRanges(-180, 180)
            longsLats.data = temporaryObject
        }
    return longsLats
    }
}
