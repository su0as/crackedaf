import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export async function setUserAsAdmin(email: string) {
  const sanitizedEmail = email.replace(/[.#$[\]]/g, '_');
  await set(ref(db, `admins/${sanitizedEmail}`), {
    email,
    role: 'admin',
    createdAt: Date.now()
  });
}