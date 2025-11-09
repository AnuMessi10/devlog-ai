'use client';
import { useProjects } from '@/features/projects';

export default function ProjectsPage() {
    const { projects, loading, createProject } = useProjects();
    void createProject;

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-2">Projects</h1>
            {loading && <p>Loading...</p>}
            <ul className="space-y-2">
                {projects?.map(project => (
                    <li key={project.id} className="border p-2 rounded">
                        <strong>{project.name}</strong>
                        <p className="text-sm opacity-70">{project.description}</p>
                    </li>
                ))}
            </ul>
            {/* TODO: Add form UI calling createProject */}
        </div>
    );
}
