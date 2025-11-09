'use client';
import { useLogs } from '@/features/logs';

export default function LogsPage() {
    const { logs, loading, createLog } = useLogs();
    void createLog;

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-2">Logs</h1>
            {loading && <p>Loading...</p>}
            <ul className="space-y-2">
                {logs?.map(log => (
                    <li key={log.id} className="border p-2 rounded">
                        <strong>{log.title || 'Untitled log'}</strong>
                        <p className="text-sm opacity-70">{log.tasks}</p>
                    </li>
                ))}
            </ul>
            {/* TODO: Add form UI calling createLog */}
        </div>
    );
}
