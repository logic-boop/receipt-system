'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect('/dashboard/receipts/new');
}

export async function signupAction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const companyName = formData.get('company_name') as string;

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };

  if (data.user) {
    // Generate the user's business profile record inside public schema matching your SQL table
    await supabase.from('business_profiles').insert([
      { id: data.user.id, company_name: companyName, email: email, role: 'user' }
    ]);
  }

  redirect('/dashboard/receipts/new');
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}