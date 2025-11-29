import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './MainLayout.css';

import ChatWidget from '../components/ChatWidget';
import NotificationFab from '../components/NotificationFab';
import EmergencyModal from '../components/EmergencyModal';

const MainLayout = () => {
    const [isEmergencyOpen, setIsEmergencyOpen] = React.useState(false);

    return (
        <div className="main-layout">
            <Sidebar onEmergencyClick={() => setIsEmergencyOpen(true)} />
            <main className="main-content">
                <Outlet />
            </main>
            <NotificationFab />
            <ChatWidget />
            <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
        </div>
    );
};

export default MainLayout;
