export type RedirectEventDetailType = {
    to: string
}

export const RedirectEventType = 'redirect_event';

export class RedirectEvent {
    public event: CustomEvent<RedirectEventDetailType>
    constructor(detail: RedirectEventDetailType) {
        this.event = new CustomEvent(RedirectEventType, { detail })
    }
}