import UserForm from './UserForm';

type User = {
    id: number;
    name: string;
};

async function getUsers(): Promise<User[]> {
    const base = process.env.API_BASE_URL;
    if (!base) throw new Error('API_BASE_URL is not set');

    const res = await fetch(
        'http://localhost:3000/api/users',
        { cache: 'no-store' }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
    }

    return res.json();
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Users</h1>

            {/* 追加フォーム（Client Component） */}
            <UserForm />

            {/* 一覧 */}
            <ul className="mt-6 list-disc pl-6">
                {users.map((u) => (
                    <li key={u.id}>
                        {u.id}: {u.name}
                    </li>
                ))}
            </ul>
        </main>
    );
}
