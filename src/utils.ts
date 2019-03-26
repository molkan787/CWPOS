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

}