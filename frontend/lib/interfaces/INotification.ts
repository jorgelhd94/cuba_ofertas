interface INotification {
    id: number;
    message: string;
    created_at: string;
    was_read: boolean;
    notification_type: 'info' | 'success' | 'warning' | 'error' | 'new_in_ranking';
}

export default INotification;