'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createLeaveRequest(prevState: any, formData: FormData) {
  const type = formData.get('type') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const reason = formData.get('reason') as string;

  if (!type || !startDate || !endDate || !reason) {
    return { success: false, message: 'Please fill in all fields.' };
  }

  try {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'User not authenticated.' };
    }

    await db.leaveRequest.create({
      data: {
        userId: session.user.id,
        type: type as any,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
      },
    });

    return { success: true, message: 'Leave request submitted successfully!' };
  } catch (error) {
    console.error('Failed to create leave request:', error);
    return { success: false, message: 'Failed to submit leave request.' };
  }
}

export async function updateLeaveStatus(formData: FormData) {
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;

  try {
    const session = await auth();
    if (session?.user?.role !== 'MANAGER') {
        throw new Error('Unauthorized');
    }

    await db.leaveRequest.update({
      where: { id },
      data: { status: status as any },
    });

    // Update balance if approved (simplified logic)
    // In a real app, you'd calculate days and subtract from specific balance type
    
  } catch (error) {
    console.error('Failed to update leave status:', error);
  }
  
  revalidatePath('/admin/leaves');
  revalidatePath('/dashboard');
}
