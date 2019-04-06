export default class Utils {
    static round(value: number){
        return Math.round(value * 100) / 100;
    }

    static getCurrentTime(){
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        
        m = this.checkTime(m);
        h = this.checkTime(h);
        return h + ":" + m;
    }

    static checkTime(i: any) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }

    static timestampToDate(unixtimestamp: number, includeTime?: boolean){
        // Months array
        const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        // Convert timestamp to milliseconds
        const date = new Date(unixtimestamp*1000);
        const year = date.getFullYear();
        const month = months_arr[date.getMonth()];
        const day = date.getDate();
        
        let convdataTime = day+' '+month+' '+year;
        if(includeTime){
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            convdataTime += ' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        }
    
        return convdataTime;
    }

    static dateToTimestamp(dateString: string){
        return (new Date(dateString)).getTime() / 1000;
    }

    static todaysDate(){
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return yyyy + '/' + mm + '/' + dd;
    }

}