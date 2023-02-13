import {createSignal} from 'solid-js'

class Api implements store.Api {
    private _status = createSignal<api.Status>('ok')
    /*useStatus() {
        return this._status
    }*/
    get status() {
        return this._status[0]()
    }
    protected set status(v) {
        this._status[1](v)
    }

    protected onJson(data: any) {

    }

    protected async call(url: string, body?: any, method = 'POST'): Promise<boolean> {
        if (this.status == 'wait')
            return false

        this.status = 'wait'
        let res = false
        const modify = method && body

        try {
            const resp = await fetch(url, {
                method: method ?? 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: modify ? JSON.stringify(body) : undefined
            })

            if (!modify) {
                if (resp.ok) {
                    const data = await resp.json()
                    this.onJson(data)
                }
            }

            this.status = (res = resp.ok) ? 'ok' : 'error'
        }
        catch (e) {
            this.status = 'net'
        }

        return res
    }

    listen(listener: store.StatusListener) {
        this._status.listen(listener)
    }
}


export default Api
