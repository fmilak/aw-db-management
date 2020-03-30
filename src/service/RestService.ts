import RestInit from '../model/api/RestInit';

class RestService {
    public static async fetch(restInit: RestInit, callback: Function): Promise<any> {
        const url = `http://www.fulek.com/nks/api/aw${restInit.url}`;
        const response: any = await fetch(url, {
            headers: restInit.header,
            body: restInit.body !== '' ? restInit.body : null,
            method: restInit.method,
        });
        console.log(response);
        const responseJson: string = await response.json();
        console.log(responseJson);
        callback(responseJson);
    }
}

export default RestService;