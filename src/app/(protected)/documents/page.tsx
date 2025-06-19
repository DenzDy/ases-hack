'use client';

import React from 'react';
import Content from './content'
// import { useSession } from '@/lib/SessionContext';

const DashboardPage: React.FC = () => {
    // const session = useSession();

    return (
        <div>
            <Content />
        </div>
    );
};

export default DashboardPage;
