'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateReceiptSchema = z.object({
  customer_name: z.string().min(2, "Customer name is required"),
  customer_email: z.string().email("Invalid email address").optional().or(z.literal('')),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  payment_method: z.enum(['cash', 'card', 'bank_transfer', 'pos', 'online']),
  purpose: z.string().min(3, "Purpose description is required"),
  transaction_date: z.string().min(1, "Date is required"),
});

// Added prevState as the first parameter to satisfy useActionState
export async function createReceiptAction(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "Unauthorized. Please log in." };
  }

  const rawFields = Object.fromEntries(formData.entries());
  const validatedFields = CreateReceiptSchema.safeParse(rawFields);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const data = validatedFields.data;

  const { error: dbError } = await supabase
    .from('receipts')
    .insert([
      {
        user_id: user.id,
        customer_name: data.customer_name,
        customer_email: data.customer_email || null,
        amount: data.amount,
        payment_method: data.payment_method,
        purpose: data.purpose,
        transaction_date: data.transaction_date,
      }
    ]);

  if (dbError) {
    return { error: "Database error: Could not save the receipt." };
  }

  revalidatePath('/dashboard');
  return { success: true, error: null };
}