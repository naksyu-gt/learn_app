'use client';

import { useState } from 'react';

export default function UserForm() {
    const [name, setName] = useState('');
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const trimmed = name.trim();
        if (!trimmed) {
            setError('Name is required');
            return;
        }

        setPending(true);
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: trimmed }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            setName('');
            // 一覧更新のトリガーは page.tsx 側でやる（次ステップ）
            window.location.reload();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setPending(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="mt-6 flex gap-2">
            <input
                className="w-64 rounded border px-3 py-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={pending}
            />
            <button
                className="rounded border px-4 py-2"
                type="submit"
                disabled={pending}
            >
                {pending ? 'Adding...' : 'Add'}
            </button>

            {error && <p className="ml-2 text-sm text-red-600">{error}</p>}
        </form>
    );
}
