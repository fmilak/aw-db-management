import RestInit from '../model/api/RestInit';

class RestService {
    public static async fetch(restInit: RestInit, callback: Function): Promise<any> {
        const url = `http://www.fulek.com/nks/api/aw${restInit.url}`;
        const response: any = await fetch(url, {
            headers: restInit.header,
            body: restInit.body,
            method: restInit.method,
        });
        console.log(response);
        if (response.status !== 200) {
            alert('Pogreška prilikom REST poziva');
            return;
        }
        const responseJson: string = await response.json();
        callback(responseJson);
    }
}

export default RestService;
