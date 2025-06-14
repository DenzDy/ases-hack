'use client';

import React from 'react';
import { useSession } from '@/lib/SessionContext';

const DashboardPage: React.FC = () => {
    const session = useSession();
    const userEmail = session?.user?.email ?? 'Unknown';

    return (
        <div>
            <h1>You are authenticated as {userEmail}</h1>
            Welcome to filer
        </div>
    );
};

export default DashboardPage;
