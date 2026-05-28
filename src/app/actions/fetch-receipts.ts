// src/app/actions/fetch-receipts.ts
'use server';

import { createClient } from '@/utils/supabase/server';

export async function getUserReceipts() {
  const supabase = await createClient();

  // 1. Authenticate the active user session securely
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { receipts: [], error: "Unauthorized access profile." };
  }

  // 2. Query transactional data ordered by latest entries first
  const { data: receipts, error: dbError } = await supabase
    .from('receipts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (dbError) {
    console.error("Fetch failure:", dbError);
    return { receipts: [], error: "Failed to load receipt logs." };
  }

  return { receipts: receipts || [], error: null };
}