// @ts-ignore
// const edm = imp("electron-download-manager"); // $UNDO
import axios from 'axios';
import _url from '@/prs/api';
import utils from '@/utils';

const dailySales = 'daily-sales';
const dailySummary = 'daily-summary';
const weeklySummary = 'weekly-summary';

export default class ReportsDownloader{

    static async dailySales(date: any){
        try {
            const _date = utils.dateToTimestamp(date);
            const response = await axios.post(_url('reports'), {type: dailySales, day: _date});
            await this.downloadFile(response.data);
            return true;
        } catch (error) {
            throw new Error('Unknow error at ReportsDownloader.dailySales');
        }
    }

    static async dailySummary(date: any){
        try {
            const _date = utils.dateToTimestamp(date);
            const response = await axios.post(_url('reports'), {type: dailySummary, day: _date});
            await this.downloadFile(response.data);
            return true;
        } catch (error) {
            throw new Error('Unknow error at ReportsDownloader.dailySummary');
        }
    }
    
    static async weeklySummary(date_from: any, date_to: any){
        try {
            const _from = utils.dateToTimestamp(date_from);
            const _to = utils.dateToTimestamp(date_to);
            const response = await axios.post(_url('reports'), {type: weeklySummary, date_from: _from, date_to: _to});
            await this.downloadFile(response.data);
            return true;
        } catch (error) {
            throw new Error('Unknow error at ReportsDownloader.weeklySummary');
        }
    }

    // ==============================================

    static downloadFile(data: any){
        return new Promise((resolve, reject) => {
            const {filename, signature, params} = data;
            const returnFilename = this.getReturnFilename(params);
            const downloadUrl = this.getDownloadUrl(filename, signature, returnFilename);
            // edm.download({ // $UNDO
            //     url: downloadUrl,
            // }, (error: any, info: any) => {
            //     if (error) {
            //         reject(error);
            //         return;
            //     }
            //     resolve(true);
            // });
        });
    }

    private static getReturnFilename(params: any){
        switch (params.type) {
            case dailySales:
                const date = utils.timestampToDate(params.day);
                return `Daily Sales - ${date}.xlsx`;
            case dailySummary:
                const date2 = utils.timestampToDate(params.day);
                return `Daily Summary - ${date2}.xlsx`;
            case weeklySummary:
                const date_from = utils.timestampToDate(params.date_from);
                const date_to = utils.timestampToDate(params.date_to);
                return `Weekly Summary ${date_from} - ${date_to}.xlsx`;
            default:
                return 'Reports.xlsx';
        }
    }

    private static getDownloadUrl(filename: string, signature: string, returnFilename: string){
        return _url(`download/${filename}/${signature}/${returnFilename}`);
    }

}