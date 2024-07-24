"use client";
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const notifications = [
    {
        index: 0,
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        index: 1,
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        index: 2,
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
];

interface StepContentProps {
    index: number;
    children: React.ReactNode;
}

const StepContent: React.FC<StepContentProps> = ({ index, children }) => {
    const notification = notifications.find(notif => notif.index === index);

    if (!notification) {
        return <div>Notification not found</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <CardHeader>
                <CardTitle className='flex justify-center my-2'>{notification.title}</CardTitle>
                <CardDescription>
                    <div>
                        <div
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <div className="flex flex-col gap-4 mt-4">
                {children}
            </div>
        </div>
    );
};

export default StepContent;
