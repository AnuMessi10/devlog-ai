import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to your dashboard</CardTitle>
                    <CardDescription>
                        Capture logs, track projects, and surface insights from your development
                        sessions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        The next step is to wire up project and log management. Stay tuned!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
