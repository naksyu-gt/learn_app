type User = { id: number; name: string };

async function getUsers(): Promise<User[]> {
    const base = process.env.API_BASE_URL;
    if (!base) throw new Error('API_BASE_URL is not set');

    const res = await fetch(`${base}/users`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return res.json();
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Users</h1>

            <ul className="mt-4 space-y-2">
                {users.map((u) => (
                    <li key={u.id} className="rounded border p-3">
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-gray-500">id: {u.id}</div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
