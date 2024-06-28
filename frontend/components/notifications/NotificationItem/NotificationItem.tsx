import INotification from '@/lib/interfaces/INotification';
import React from 'react'

type Props = {
    notification: INotification;
}

const NotificationItem = (props: Props) => {
  return <div>
    <p className='text-sm'>{props.notification.message}</p>
  </div>;
};

export default NotificationItem;