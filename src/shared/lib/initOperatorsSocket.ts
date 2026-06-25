import { setQueueCallsCount, setOperators, updateOperator, deleteOperator, setCountActiveCalls } from "../model/operators/operatorsSlice";
import type { AppDispatch } from "@/app/store/store";


let socket: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

const FILTER = {
    type: "filter",
    data: {
        activeTab: "operators",
        userRole: "ROLE_ADMIN",
        userId: "80",
        userIds: [],
        queues: [],
        showActiveCallsByCampaign: false,
        showDialingContactsByCampaign: false
    }
};

export const initOperatorsSocket = (dispatch: AppDispatch) => {
    if (socket?.readyState === WebSocket.OPEN || socket?.readyState === WebSocket.CONNECTING) return;

    socket = new WebSocket('wss://crm48.sipspeak.ru/monitor');
    const ws = socket;

    ws.onopen = () => {
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
            reconnectTimeout = null;
        }

        ws.send(JSON.stringify(FILTER));
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data)

        switch (msg.type) {
            // кол-во звонков в очереди
            case 'count_queue_calls':
                dispatch(setQueueCallsCount(msg.data.count))
                break;
            // кол-во звонков в системе
            case 'count_active_calls':
                dispatch(setCountActiveCalls(msg.data.count))
                break;
            // все операторы
            case 'all_members':
                dispatch(setOperators(msg.data))
                break;
            // изменение оператора
            case 'update_member':
                dispatch(updateOperator(msg.data))
                break;
            // удаление оператора
            case 'delete_member':
                dispatch(deleteOperator(msg.data.id))
                break;
        };
    };

    ws.onerror = (err) => {
        console.log('WS Error', err);
    }

    ws.onclose = () => {
        console.log('WS Closed');
        socket = null;

        if (reconnectTimeout) return

        reconnectTimeout = setTimeout(() => {
            reconnectTimeout = null;
            initOperatorsSocket(dispatch)
        }, 3000)

    }
    return socket
}